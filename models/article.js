'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  Article.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "title required"}
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "description required"}
      }
    },
    status: DataTypes.BOOLEAN,
    views: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    tableName: 'Article',
    timestamps: true,
    sequelize,
    modelName: 'Article',
  });
  
  return Article
};