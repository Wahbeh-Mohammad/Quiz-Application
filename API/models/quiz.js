'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey:"user_id" }); // Many Quizzes belong to one user
      this.hasMany(models.Question, { foreignKey:"quiz_id" }); // A Quiz has many Questions

      this.belongsToMany(models.User, { through:models.Attempt, foreignKey:"quiz_id" }); // A Quiz has many attempts
    }
  };
  Quiz.init({
    quiz_id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    quiz_name:{
      type: DataTypes.STRING,
      allowNull:false,    
    },
    category: {
      type: DataTypes.ENUM(["MATH", "PHYSICS", "GEOGRAPHY","MISC"]),
      allowNull:false,
      defaultValue:"MISC"
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue:1
    },
    num_questions: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    marks: {
      type:DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Quiz',
    tableName: "quizzes"
  });
  return Quiz;
};