import express from 'express'
import { discordAuthController, googleAuthController, steamAuthController, localAuthController } from '../controllers'

const authRouter = express.Router()

authRouter.get('/discord', discordAuthController.authUsingDiscord)
authRouter.get('/discord/callback', discordAuthController.authUsingDiscordCallback)

authRouter.get('/google', googleAuthController.authUsingGoogle)
authRouter.get('/google/callback', googleAuthController.authUsingGoogleCallback)

authRouter.get('/steam', steamAuthController.authUsingSteam)
authRouter.get('/steam/callback', steamAuthController.authUsingSteamCallback)

authRouter.post('/login', localAuthController.login)
authRouter.post('/register', localAuthController.register)

export { authRouter }
