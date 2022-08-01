import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequalize-config';

export interface IUser {
  id: string;
  login: string;
  password: string;
  age: number;
}

export const UserModel = sequelize.define(
  'user',
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.INTEGER,
  },
  {
    timestamps: false,
    underscored: true,
  }
);
