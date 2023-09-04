'use strict';

const TodoModel = (sequelize, DataTypes) => sequelize.define('Todo', {
  item: { type: DataTypes.STRING, required: true },
  assignedTo: { type: DataTypes.STRING, required: true },
  difficulty: { type: DataTypes.INTEGER, required: true },
  complete:{ type: DataTypes.BOOLEAN, required: true }
});

module.exports = TodoModel;
