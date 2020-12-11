'use strict';

const faker = require('faker');
const { Sequelize } = require('../models');

const articles = [...Array(50)].map(article => ({
  title: faker.name.title(),
  description: faker.lorem.paragraphs()
  })
)
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Article' , articles, {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Article' , null, {})

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
