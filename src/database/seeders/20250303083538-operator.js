'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
      await queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    // const dataOperator = require('../../../data/dataOperator.json');
    // dataOperator.forEach(el => {
    //   el.createdAt = new Date();
    //   el.updatedAt = new Date();
    // })
    // await queryInterface.bulkInsert('table_operators', dataOperator, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
