module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      sequence_number: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      category: {
        type: Sequelize.ENUM('work', 'news', 'health', 'sports', 'entertainment'),
        allowNull: false,
        defaultValue: 'work'
      },
      author_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      is_published: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    await queryInterface.addIndex('posts', ['author_id']);
    await queryInterface.addIndex('posts', ['category']);
    await queryInterface.addIndex('posts', ['created_at']);
    await queryInterface.addIndex('posts', ['sequence_number']);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('posts');
  }
};
