import { questsController } from '../controllers'
import { authorized } from '../interceptors'
import { createAsyncRouter } from '../util'

const questsRouter = createAsyncRouter()

questsRouter.get('/', authorized, questsController.getUserQuests)
questsRouter.post('/update', authorized, questsController.updateUserQuests)
questsRouter.post('/replace', authorized, questsController.replaceUserQuest)

export { questsRouter }
