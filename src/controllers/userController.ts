import { Request, Response, NextFunction } from 'express';
import { User } from '../models/userModel';
import { v4 as uuidv4 } from 'uuid';

const users: User[] = [];

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (users.length === 0) {
      return res.status(404).json({ message: 'No user found' });
    }
    const loginSubstring = req.query.loginSubstring as string;
    const limit = Number(req.query.limit as string);

    if (loginSubstring) {
      const filteredUsers = users.filter((user) =>
        user.login.toLowerCase().includes(loginSubstring.toLowerCase())
      );

      if (filteredUsers.length === 0) {
        return res.status(404).json({ message: 'No user found' });
      }
      return limit
        ? res.json(filteredUsers.slice(0, limit))
        : res.json(filteredUsers);
    }
    return limit ? res.json(users.slice(0, limit)) : res.json(users);
  } catch (err) {
    return next(err);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = users.find((user) => user.id === req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'No user found' });
    }
    return res.json({ payload: { user } });
  } catch (err) {
    return next(err);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { login, password, age } = req.body;
    const user: User = {
      id: uuidv4(),
      login,
      password,
      age,
      isDeleted: false,
    };
    users.push(user);
    return res.json({ msg: 'User created', payload: { users } });
  } catch (err) {
    return next(err);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { login, password, age } = req.body;

    const userIndex = users.findIndex((user) => {
      return user.id === req.params.id;
    });

    if (userIndex === -1) {
      return res.status(404).json({ message: 'No user found' });
    }

    users[userIndex].login = login;
    users[userIndex].password = password;
    users[userIndex].age = age;
    return res.json({ msg: 'User updated', payload: { users } });
  } catch (err) {
    return next(err);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userIndex = users.findIndex((user) => user.id === req.params.id);
    if (userIndex === -1) {
      return res.status(404).json({ message: 'No user found' });
    }
    users[userIndex].isDeleted = true;
    return res.json({ msg: 'User deleted', payload: { users } });
  } catch (err) {
    return next(err);
  }
};
