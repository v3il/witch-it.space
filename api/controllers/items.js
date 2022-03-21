import { Item } from '../models'

const getItems = async (request, response) => {
    const items = await Item.findAll({
        order: [
            ['quality', 'DESC'],
            ['id', 'ASC']
        ]
    })

    // const itemMap = {}
    //
    // items.forEach((item) => {
    //     itemMap[item.id] = item.get({ raw: true })
    // })

    response.send({ items: items.map(item => item.get({ raw: true })) })
}

const itemsController = {
    getItems
}

export { itemsController }
