exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('prices', table => {
        table.increments();
        table.integer('item1Id');
        table.integer('item1Count');
        table.integer('item2Id');
        table.integer('item2Count');
        table.integer('priceValue');
        table.integer('offerId').references('id').inTable('offers').onDelete('CASCADE');
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(null);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('prices')
};
