exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('quests', table => {
        table.increments();
        table.string('questTask');
        table.string('questType');
        table.integer('globalId');
        table.integer('localId');
        table.integer('rewardId');
        table.integer('rewardCount');
        table.integer('objective');
        table.integer('progress');
        table.integer('userId').references('id').inTable('users');
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(null);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('quests')
};
