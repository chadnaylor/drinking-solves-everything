exports.up = function (knex) {
    return knex.schema.createTable('problems', table => {
        table.increments('id'); // adds an auto incrementing PK column
        table.string('name').notNullable();
        table.string('description');

    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('problems');
};