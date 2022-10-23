import { DataTypes, Model, CreationOptional } from 'sequelize';
import { TransactionStatus } from 'interfaces/transactionInterface';
import { sequelize } from '../db/connection';

export default class TransactionProduct extends Model {
  declare id: CreationOptional<number>;
  declare quantity: number;
  declare unitPrice: number;
  declare status: TransactionStatus;
}

TransactionProduct.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    status: {
      type: DataTypes.ENUM,
      values: ['pending', 'reversed', 'closed'],
      allowNull: false
    },

    quantity: {
      type: DataTypes.INTEGER
    },
    unitPrice: {
      type: DataTypes.INTEGER
    }
  },
  {
    modelName: 'transactionProduct',
    sequelize
  }
);
