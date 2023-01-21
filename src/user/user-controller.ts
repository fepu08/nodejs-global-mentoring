import { Request, Response, NextFunction } from 'express';
import { ControllerLogger } from '../loggers/controller-logger';
import { UserService } from './user-service';
import * as jwt from 'jsonwebtoken';
import { logger } from '../loggers/logger';

export default class UserController {
  @ControllerLogger()
  public static async getUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const loginSubstring = req.query.loginSubstring as string;
      const limit = Number(req.query.limit as string);
      const users = await UserService.getAllUsers(loginSubstring, limit);
      if (users.length > 0) {
        return res.status(200).json(users);
      }
      return res.status(404).json({ message: 'Users not found' });
    } catch (err) {
      return next(err);
    }
  }

  @ControllerLogger()
  public static async getUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User is not found' });
      }
      return res.status(200).json(user);
    } catch (err) {
      return next(err);
    }
  }

  @ControllerLogger()
  public static async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const user = req.body;
    try {
      const [newUser, isNewRecord] = await UserService.addUser(user);
      if (!isNewRecord) {
        return res.status(409).json({ message: 'User already exist' });
      }
      return res.status(201).json(newUser);
    } catch (err) {
      return next(err);
    }
  }

  @ControllerLogger()
  public static async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const updateUser = await UserService.updateUser(req.body, req.params.id);
      if (!updateUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(updateUser);
    } catch (err) {
      return next(err);
    }
  }

  @ControllerLogger()
  public static async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const deletedUser = await UserService.deleteUser(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json({ message: 'User deleted' });
    } catch (err) {
      return next(err);
    }
  }

  @ControllerLogger()
  public static async login(req: Request, res: Response, next: NextFunction) {
    const { login, password } = req.body;

    try {
      const user = await UserService.getUserByLogin(login, password);

      if (!user) {
        return res.status(400).json({ message: 'Incorrect login or password' });
      }

      jwt.sign(
        { login },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES },
        (err: Error, token: string) => {
          if (err) {
            return next(err);
          }
          return res.status(200).json({ token });
        }
      );
    } catch (err) {
      return next(err);
    }
  }
}
