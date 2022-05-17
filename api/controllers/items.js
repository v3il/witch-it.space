import { Item } from '../models'

const getItems = async (request, response) => {
    const items = await Item.query().select()
    response.send({ items })
}

const itemsController = {
    getItems
}

export { itemsController }
