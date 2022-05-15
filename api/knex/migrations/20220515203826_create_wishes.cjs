exports.up = function(knex) {
    return knex.schema.createTable('wishes', table => {
        table.increments();
        table.integer('itemId');
        table.integer('userId').references('id').inTable('users');
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('wishes')
};
