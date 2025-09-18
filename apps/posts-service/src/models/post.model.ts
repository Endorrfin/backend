import { DataTypes, Model, Sequelize, Association } from 'sequelize';
import { User } from './user.model';

export type PostCategory = 'work' | 'news' | 'health' | 'sports' | 'entertainment';

export interface PostAttributes {
  id: string;
  sequenceNumber: number;
  title: string;
  content: string;
  category: PostCategory;
  authorId: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostCreationAttributes extends Omit<PostAttributes, 'id' | 'sequenceNumber' | 'createdAt' | 'updatedAt' | 'isPublished'> {
  id?: string;
  sequenceNumber?: number;
  isPublished?: boolean;
}

export class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
  public id!: string;
  public sequenceNumber!: number;
  public title!: string;
  public content!: string;
  public category!: PostCategory;
  public authorId!: string;
  public isPublished!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  public author?: User;

  public static override associations: {
    author: Association<Post, User>;
  };

  public static initialize(sequelize: Sequelize): typeof Post {
    Post.init(
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
          },
          sequenceNumber: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            field: 'sequence_number'
          },
          title: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
              notEmpty: true,
              len: [1, 255]
            }
          },
          content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
              notEmpty: true
            }
          },
          category: {
            type: DataTypes.ENUM('work', 'news', 'health', 'sports', 'entertainment'),
            allowNull: false,
            defaultValue: 'work'
          },
          authorId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'author_id',
            references: {
              model: 'users',
              key: 'id'
            }
          },
          isPublished: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            field: 'is_published'
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
          tableName: 'posts',
          underscored: true
        }
    );

    return Post;
  }

  public static associate(models: any): void {
    Post.belongsTo(models.User, {
      foreignKey: 'authorId',
      as: 'author'
    });
  }
}

export default (sequelize: Sequelize) => {
  return Post.initialize(sequelize);
};
