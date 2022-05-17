exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('users', table => {
        table.increments();
        table.string('displayName');
        table.string('login');
        table.string('password');
        table.string('steamId');
        table.string('steamTradeLink');
        table.string('discordId');
        table.string('googleId');
        table.string('theme').defaultTo('dark');
        table.string('locale').defaultTo('en');
        table.string('marketNote').defaultTo('');
        table.string('wishlistNote').defaultTo('');
        table.integer('questsUpdateTimestamp');
        table.integer('avatarId').defaultTo(1);
        table.integer('marketSize').defaultTo(0);
        table.integer('wishlistSize').defaultTo(0);
        table.boolean('canReplaceDailyQuests').defaultTo(false);
        table.boolean('canReplaceWeeklyQuests').defaultTo(false);
        table.boolean('isGuardProtected').defaultTo(false);
        table.boolean('isPublic').defaultTo(false);
        table.boolean('switchRarities').defaultTo(false);
        table.boolean('tradeWithGuardedOnly').defaultTo(false);
        table.boolean('discountAvailable').defaultTo(false);
        table.boolean('tradeDuplicatesOnly').defaultTo(true);
        table.timestamp('inventorySyncTime').defaultTo(null);
        table.timestamp('wishlistUpdateTime').defaultTo(null);
        table.timestamp('marketUpdateTime').defaultTo(null);
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(null);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
