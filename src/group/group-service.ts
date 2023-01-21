import { GroupDAO } from './group-dao';
import { IGroup } from '../models/group-model';

export class GroupService {
  public static async getAllGroups() {
    return await GroupDAO.getAllGroups();
  }

  public static async getGroupById(id: string) {
    return await GroupDAO.getGroupById(id);
  }

  public static async addGroup(group: IGroup) {
    return await GroupDAO.addGroup({ ...group });
  }

  public static async updateGroup(id: number, updatedGroup: IGroup) {
    return await GroupDAO.updateGroup(id, updatedGroup);
  }

  public static async deleteGroup(id: string) {
    return await GroupDAO.deleteGroup(id);
  }
  public static async addUsersToGroup(groupId: number, userIds: number[]) {
    return await GroupDAO.addUsersToGroup(groupId, userIds);
  }
}
