import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequalize-config';

enum Permission {
    Read = 'READ',
    Write = 'WRITE',
    Delete = 'DELETE',
    Share = 'SHARE',
    UploadFiles = 'UPLOAD_FILES'
}

export const ALLOWED_PERMISSIONS: Permission[] = [
  Permission.Read,
  Permission.Write,
  Permission.Delete,
  Permission.Share,
  Permission.UploadFiles,
];

export interface IGroup {
    id: number;
    name: string;
    permissions: Array<Permission>;
  }


export const GroupModel = sequelize.define('group', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  permissions: DataTypes.ARRAY(DataTypes.STRING),
}, {
  timestamps: false,
});

