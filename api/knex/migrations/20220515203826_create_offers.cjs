exports.up = function(knex) {
    return knex.schema.createTable('offers', table => {
        table.increments();
        table.string('type');
        table.integer('itemId');
        table.integer('itemCount');
        table.integer('userId').references('id').inTable('users');
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(null);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('offers')
};
