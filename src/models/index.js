'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const clothesModel = require('./clothes/model.js');
const foodModel = require('./food/model.js');
const TodoModel = require('./to-do/model.js');
const Collection = require('./data-collection.js');
const userModel = require('../../src/auth/models/users.js');
const POSTGRESS_URI =
  process.env.NODE_ENV === "test"
    ? "sqlite::memory:"
    : process.env.DATABASE_URL;

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};

let sequelize = new Sequelize(POSTGRESS_URI, sequelizeOptions);


const food = foodModel(sequelize, DataTypes);
const clothes = clothesModel(sequelize, DataTypes);
const todo = TodoModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  food: new Collection(food),
  clothes: new Collection(clothes),
  todo: new Collection(todo),
  users: userModel(sequelize, DataTypes),
};
