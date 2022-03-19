import { Item } from '../models'

const getItems = async (request, response) => {
    const itemModels = await Item.findOne({
        order: [
            ['quality', 'DESC'],
            ['id', 'ASC']
        ],
        logging: console.log
    })

    const items = [itemModels].map(item => item.get({ raw: true }))

    console.log(items)

    // const itemMap = {}
    //
    // items.forEach((item) => {
    //     itemMap[item.id] = item.get({ raw: true })
    // })

    response.send({
        items // .map(item => item.get({ raw: true }))
    })
}

const itemsController = {
    getItems
}

export { itemsController }
