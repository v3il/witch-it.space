exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('items', table => {
        table.increments();
        table.integer('itemId');
        table.integer('quality');
        table.string('name');
        table.string('description');
        table.string('rarity');
        table.string('character');
        table.string('slot');
        table.string('type');
        table.string('event');
        table.date('createdDate');
        table.boolean('isTradable');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('items')
};
