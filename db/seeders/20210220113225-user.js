'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'user',
      [
        {
          name: 'John Doe',
          email: 'john@doe.com',
          password:
            '$2b$10$EwINilx32/DiCvS6wbhfoeNddJ.j51L82qS5zMlxGZoBmSyp1hLv.', // helloworld,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
