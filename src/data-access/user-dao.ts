import { Op } from 'sequelize';
import { IUser, UserModel } from '../models/user-model';

export class UserDAO {
  public static async getAllUsers(loginSubstring: string, limit?: number) {
    const users = await UserModel.findAll({
      where: {
        login: { [Op.iLike]: `%${loginSubstring}%` },
      },
      limit,
    });
    return users;
  }

  public static async getUserById(id: string) {
    const data = await UserModel.findOne({
      where: {
        id,
      },
    });
    return data;
  }

  public static async addUser(user: IUser) {
    const { login } = user;
    const [data, isNewRecord] = await UserModel.findOrCreate({
      where: { login },
      defaults: { ...user },
    });
    return [data, isNewRecord];
  }

  public static async getUserByLogin(login: string, password: string) {
    const data = await UserModel.findOne({
      where: {
        login,
        password,
      },
    });
    return data;
  }

  public static async updateUser(updatedUser: IUser, id: string) {
    const { login, password, age } = updatedUser;
    const [, data] = await UserModel.update(
      {
        password,
        age,
      },
      {
        where: {
          id,
          login,
        },
        returning: true,
      }
    );
    return data[0];
  }

  public static async deleteUser(id: string) {
    const data = await UserModel.destroy({
      where: {
        id,
      },
    });
    return data;
  }
}
