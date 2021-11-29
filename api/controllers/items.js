import { Item } from '../models'

const getItems = async (request, response) => {
    const items = await Item.findAll({
        order: [
            ['quality', 'DESC'],
            ['id', 'ASC']
        ]
    })

    const itemMap = {}

    items.forEach((item) => {
        itemMap[item.id] = item
    })

    response.send({ items: itemMap })
}

const itemsController = {
    getItems
}

export { itemsController }
