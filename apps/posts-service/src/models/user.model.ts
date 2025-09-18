import { DataTypes, Model, Sequelize, Association } from 'sequelize';
import bcrypt from 'bcrypt';
import { UserRole, UserAddress } from '../types/auth.types';

export interface UserAttributes {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  stripeCustomerId?: string;
  emailVerified: boolean;
  lastLogin?: Date;
  profileImage?: string;
  phone?: string;
  address?: UserAddress;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreationAttributes extends Omit<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {
  id?: string;
}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public role!: UserRole;
  public isActive!: boolean;
  public stripeCustomerId?: string;
  public emailVerified!: boolean;
  public lastLogin?: Date;
  public profileImage?: string;
  public phone?: string;
  public address?: UserAddress;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;


  // Associations
  public static override associations: {
    refreshTokens: Association<User, any>;
    posts: Association<User, any>;
  };

  public async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }


  // Added override modifier
  public override toJSON(): Omit<UserAttributes, 'password'> {
    const values = { ...this.get() } as UserAttributes;
    delete (values as any).password;
    return values;
  }

  public static initialize(sequelize: Sequelize): typeof User {
    User.init(
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: true }
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false
          },
          firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'first_name'
          },
          lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'last_name'
          },
          role: {
            type: DataTypes.ENUM('admin', 'creator', 'viewer'),
            defaultValue: 'viewer'
          },
          isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            field: 'is_active'
          },
          stripeCustomerId: {
            type: DataTypes.STRING,
            field: 'stripe_customer_id',
            unique: true
          },
          emailVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'email_verified'
          },
          lastLogin: {
            type: DataTypes.DATE,
            field: 'last_login'
          },
          profileImage: {
            type: DataTypes.STRING,
            field: 'profile_image'
          },
          phone: {
            type: DataTypes.STRING
          },
          address: {
            type: DataTypes.JSONB
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
          tableName: 'users',
          underscored: true,
          hooks: {
            beforeCreate: async (user: User) => {
              user.password = await bcrypt.hash(user.password, parseInt(process.env.BCRYPT_SALT_ROUNDS || '12'));
            },
            beforeUpdate: async (user: User) => {
              if (user.changed('password')) {
                user.password = await bcrypt.hash(user.password, parseInt(process.env.BCRYPT_SALT_ROUNDS || '12'));
              }
            }
          }
        }
    );

    return User;
  }

  public static associate(models: any): void {
    User.hasMany(models.RefreshToken, { foreignKey: 'userId', as: 'refreshTokens' });
    User.hasMany(models.Post, { foreignKey: 'authorId', as: 'posts' });
  }
}

export default (sequelize: Sequelize) => {
  return User.initialize(sequelize);
};
