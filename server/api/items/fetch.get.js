import { itemsService } from '~/server/services'

export default defineEventHandler(async () => {
    const items = await itemsService.getAll()

    return { items }
})
