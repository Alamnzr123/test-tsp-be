'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    // const dataJabatan = require('../../../data/dataJabatan.json');
    // dataJabatan.forEach(el => {
    //   el.createdAt = new Date();
    //   el.updatedAt = new Date();
    // })
    // await queryInterface.bulkInsert('table_jabatans', dataJabatan, {});
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
