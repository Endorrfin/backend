import { Sequelize, DataTypes } from 'sequelize';
import { DatabaseConfig } from '../types';

// Import model classes
import { User } from './user.model';
import { RefreshToken } from './refresh-token.model';
import { NotesPage } from './notes-page.model';
import { Post } from './post.model';

const config: DatabaseConfig = require('../../shared/database/config')[process.env.NODE_ENV || 'development'];

interface DB {
  User: typeof User;
  RefreshToken: typeof RefreshToken;
  NotesPage: typeof NotesPage;
  Post: typeof Post;
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
}

const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Initialize models with the sequelize instance
const UserModel = User.initialize(sequelize);
const RefreshTokenModel = RefreshToken.initialize(sequelize);
const NotesPageModel = NotesPage.initialize(sequelize);
const PostModel = Post.initialize(sequelize);

// Create db object
const db: DB = {
  User: UserModel,
  RefreshToken: RefreshTokenModel,
  NotesPage: NotesPageModel,
  Post: PostModel,
  sequelize,
  Sequelize
};

// Set up associations
UserModel.associate(db);
RefreshTokenModel.associate(db);
NotesPageModel.associate(db);
PostModel.associate(db);

export default db;
