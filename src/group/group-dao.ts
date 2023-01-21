import { IGroup, GroupModel } from '../models/group-model';
import { sequelize } from '../config/sequalize-config';
import { UserGroupModel } from '../models/user-group-model';

export class GroupDAO {
  public static async getAllGroups() {
    const groups = await GroupModel.findAll({
      attributes: { exclude: ['password'] },
    });
    return groups;
  }

  public static async getGroupById(id: string) {
    const group = await GroupModel.findOne({
      where: {
        id,
      },
    });
    return group;
  }

  public static async addGroup(group: IGroup) {
    const { name } = group;
    const [data, isNewRecord] = await GroupModel.findOrCreate({
      where: { name },
      defaults: { ...group },
    });
    return [data, isNewRecord];
  }

  public static async updateGroup(id: number, updatedGroup: IGroup) {
    const { name, permissions } = updatedGroup;
    const [, data] = await GroupModel.update(
      {
        name,
        permissions,
      },
      {
        where: {
          id,
        },
        returning: true,
      }
    );
    return data[0];
  }

  public static async deleteGroup(id: string) {
    try {
      const data = await GroupModel.destroy({
        where: {
          id,
        },
      });
      return data;
    } catch (err) {
      throw err;
    }
  }
  public static async addUsersToGroup(groupId: number, userIds: number[]) {
    const transaction = await sequelize.transaction();
    try {
      await Promise.all(
        userIds.map((userId) =>
          UserGroupModel.create(
            {
              userId,
              groupId,
            },
            { transaction }
          )
        )
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
