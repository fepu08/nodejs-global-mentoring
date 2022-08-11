import { IUser } from '../models/user-model';
import { UserDAO } from '../data-access/user-dao';

export class UserService {
  public static async getAllUsers(loginSubstring: string, limit?: number) {
    return await UserDAO.getAllUsers(loginSubstring, limit);
  }

  public static async getUserById(id: string) {
    return await UserDAO.getUserById(id);
  }

  public static async addUser(user: IUser) {
    return await UserDAO.addUser({ ...user });
  }

  public static async updateUser(updatedUser: IUser, id: string) {
    return await UserDAO.updateUser(updatedUser, id);
  }

  public static async deleteUser(id: string) {
    return await UserDAO.deleteUser(id);
  }
  public static async getUserByLogin(login: string, password: string) {
    return await UserDAO.getUserByLogin(login, password);
  }
}
