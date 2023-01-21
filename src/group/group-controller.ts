import { Request, Response, NextFunction } from 'express';
import { ControllerLogger } from '../loggers/controller-logger';
import { GroupService } from './group-service';

export default class GroupController {
  @ControllerLogger()
  public static async getGroupById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const group = await GroupService.getGroupById(req.params.id);
      if (!group) {
        return res.status(404).json({ message: 'Group is not found' });
      }
      return res.status(200).json(group);
    } catch (err: any) {
      return next(err);
    }
  }

  @ControllerLogger()
  public static async addGroup(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const group = req.body;
    try {
      const [newGroup, isNewRecord] = await GroupService.addGroup(group);
      if (!isNewRecord) {
        return res.status(404).json({ message: 'Group already exist' });
      }
      return res.status(201).json(newGroup);
    } catch (err: any) {
      return next(err);
    }
  }

  @ControllerLogger()
  public static async updateGroup(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const updatedGroup = await GroupService.updateGroup(
        Number(req.params.id),
        req.body
      );
      if (!updatedGroup) {
        return res.status(404).json({ message: 'Group not found' });
      }
      return res.status(200).json(updatedGroup);
    } catch (err: any) {
      return next(err);
    }
  }

  @ControllerLogger()
  public static async getAllGroups(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const groups = await GroupService.getAllGroups();
      return res.status(200).json(groups);
    } catch (err: any) {
      return next(err);
    }
  }

  @ControllerLogger()
  public static async deleteGroup(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const deletedGroup = await GroupService.deleteGroup(req.params.id);
      if (!deletedGroup) {
        return res.status(404).json({ message: 'Group not found' });
      }
      return res.status(200).json({ message: 'The group was deleted' });
    } catch (err: any) {
      return next(err);
    }
  }

  @ControllerLogger()
  public static async addUsersToGroup(req: Request, res: Response) {
    try {
      await GroupService.addUsersToGroup(req.body.groupId, req.body.userIds);
      return res.status(200).json({ message: 'User(s) added to group' });
    } catch (err) {
      res.status(404).json({ message: 'Users not added to group' });
    }
  }
}
