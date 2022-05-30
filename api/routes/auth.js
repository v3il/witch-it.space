import { discordAuthController, googleAuthController, steamAuthController, localAuthController, logoutController } from '../controllers'
import { createAsyncRouter } from '../util'
import { optionalAuthorized } from '../interceptors'

const authRouter = createAsyncRouter()

authRouter.get('/discord', discordAuthController.authUsingDiscord)
authRouter.get('/discord/callback', optionalAuthorized, discordAuthController.authUsingDiscordCallback)

authRouter.get('/google', googleAuthController.authUsingGoogle)
authRouter.get('/google/callback', optionalAuthorized, googleAuthController.authUsingGoogleCallback)

authRouter.get('/steam', steamAuthController.authUsingSteam)
authRouter.get('/steam/callback', optionalAuthorized, steamAuthController.authUsingSteamCallback)

authRouter.post('/login', localAuthController.login)
authRouter.post('/register', localAuthController.register)

authRouter.post('/logout', logoutController.logout)

export { authRouter }
