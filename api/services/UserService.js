import { User, sequelize, Wish, Sequelize } from '../models'

export class UserService {
    getById (id, { withStat } = { withStat: true }) {
        let params = {
            where: { id }
        }

        if (withStat) {
            params = {
                ...params,
                attributes: {
                    include: [
                        [Sequelize.fn('COUNT', Sequelize.col('Wishes.id')), 'wishlistSize'],
                        [sequelize.literal('(SELECT COUNT(*) FROM wishes WHERE item_rarity = \'whimsical\')'), 'wishlistSizeWhimsical'],
                        [sequelize.literal('(SELECT COUNT(*) FROM wishes WHERE item_rarity = \'veryrare\')'), 'wishlistSizeVeryRare'],
                        [sequelize.literal('(SELECT COUNT(*) FROM wishes WHERE item_rarity = \'rare\')'), 'wishlistSizeRare'],
                        [sequelize.literal('(SELECT COUNT(*) FROM wishes WHERE item_rarity = \'uncommon\')'), 'wishlistSizeUncommon'],
                        [sequelize.literal('(SELECT COUNT(*) FROM wishes WHERE item_rarity = \'common\')'), 'wishlistSizeCommon']
                    ]
                },
                include: [{
                    model: Wish, attributes: []
                }],
                group: ['User.id'],
                logging: console.log,
                benchmark: true
            }

            // attributes: [
            //     'User.username',
            //     [sequelize.literal('(SELECT COUNT(*) FROM Posts WHERE Posts.userId = User.id)'), 'PostCount']
            // ],
            //     order: [[sequelize.literal('PostCount'), 'DESC']]

            // params.attributes = ['id', [sequelize.literal('(SELECT COUNT(*) FROM wishes WHERE user_id = User.id)'), 'PostCount']]
            //
            // params.include = [Wish]

            // params.group = ['wishes.userId']

            // attributes: [
            //     'id', 'title', 'is_enabled',
            //     [sequelize.fn('count', sequelize.col('company_users.id')) ,'user_count'] // <---- Here you will get the total count of user
            // ],
            //     include: [
            //     {
            //         model: sqConn.CompanyUser,
            //         attributes: [] // <----- Make sure , this should be empty
            //     }
            // ],
            //     group: ['companies.id'] // <---- You might require this one also
        }

        // console.log(params)

        return User.findOne(params)
    }
}
