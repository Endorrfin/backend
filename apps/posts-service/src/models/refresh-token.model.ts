import { DataTypes, Model, Sequelize, Association } from 'sequelize';
import { User } from './user.model';

export interface RefreshTokenAttributes {
  id: string;
  token: string;
  userId: string;
  expiresAt: Date;
  revoked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RefreshTokenCreationAttributes extends Omit<RefreshTokenAttributes, 'id' | 'createdAt' | 'updatedAt'> {
  id?: string;
}

export class RefreshToken extends Model<RefreshTokenAttributes, RefreshTokenCreationAttributes> implements RefreshTokenAttributes {
  public id!: string;
  public token!: string;
  public userId!: string;
  public expiresAt!: Date;
  public revoked!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  public static override associations: {
    user: Association<RefreshToken, User>;
  };

  public static initialize(sequelize: Sequelize): typeof RefreshToken {
    RefreshToken.init(
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
          },
          token: {
            type: DataTypes.STRING(500),
            allowNull: false,
            unique: true
          },
          userId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'user_id'
          },
          expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'expires_at'
          },
          revoked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'created_at'
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'updated_at'
          }
        },
        {
          sequelize,
          tableName: 'refresh_tokens',
          underscored: true
        }
    );

    return RefreshToken;
  }

  public static associate(models: any): void {
    RefreshToken.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }
}

export default (sequelize: Sequelize) => {
  return RefreshToken.initialize(sequelize);
};
