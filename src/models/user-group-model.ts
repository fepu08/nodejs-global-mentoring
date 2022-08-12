import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequalize-config';


export const UserGroupModel = sequelize.define('usergroup', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id',
    },
    primaryKey: true,
  },
  groupId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'group',
      key: 'id',
    },
    primaryKey: true,
  },
}, {
  timestamps: false,
  underscored: true,
  freezeTableName: true,
});

