import { DataTypes, Model, Sequelize, Association } from 'sequelize';
import { User } from './user.model';

export interface NotesPageAttributes {
  id: string;
  userId: string;
  title: string;
  slug: string;
  content?: string;
  template?: string;
  customCss?: string;
  customJs?: string;
  isPublished: boolean;
  publishedAt?: Date;
  viewCount: number;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotesPageCreationAttributes extends Omit<NotesPageAttributes, 'id' | 'createdAt' | 'updatedAt'> {
  id?: string;
}

export class NotesPage extends Model<NotesPageAttributes, NotesPageCreationAttributes> implements NotesPageAttributes {
  public id!: string;
  public userId!: string;
  public title!: string;
  public slug!: string;
  public content?: string;
  public template?: string;
  public customCss?: string;
  public customJs?: string;
  public isPublished!: boolean;
  public publishedAt?: Date;
  public viewCount!: number;
  public metadata!: Record<string, any>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  public static override associations: {
    user: Association<NotesPage, User>;
  };

  public static initialize(sequelize: Sequelize): typeof NotesPage {
    NotesPage.init(
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
          },
          userId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'user_id'
          },
          title: {
            type: DataTypes.STRING,
            allowNull: false
          },
          slug: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
          },
          content: {
            type: DataTypes.TEXT
          },
          template: {
            type: DataTypes.STRING
          },
          customCss: {
            type: DataTypes.TEXT,
            field: 'custom_css'
          },
          customJs: {
            type: DataTypes.TEXT,
            field: 'custom_js'
          },
          isPublished: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'is_published'
          },
          publishedAt: {
            type: DataTypes.DATE,
            field: 'published_at'
          },
          viewCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field: 'view_count'
          },
          metadata: {
            type: DataTypes.JSONB,
            defaultValue: {}
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
          tableName: 'notes_pages',
          underscored: true
        }
    );

    return NotesPage;
  }

  public static associate(models: any): void {
    NotesPage.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }
}

export default (sequelize: Sequelize) => {
  return NotesPage.initialize(sequelize);
};
