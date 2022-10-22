import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional
} from 'sequelize';
import { TransactionType } from 'interfaces/transactionInterface';

export default (sequelize: any): any => {
  class Transaction extends Model<
    InferAttributes<Transaction>,
    InferCreationAttributes<Transaction>
  > {
    declare id: CreationOptional<number>;
    declare type: TransactionType;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
  }

  Transaction.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      type: {
        type: DataTypes.ENUM,
        values: ['purchase', 'sale'],
        allowNull: false
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      modelName: 'Transaction',
      sequelize
    }
  );
  return Transaction;
};
