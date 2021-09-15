// // const express = require('express')
// // // const db = require('./db')
// //
// // // Create express instnace
// // const app = express()
// //
// // // Init body-parser options (inbuilt with express)
// // app.use(express.json())
// // app.use(express.urlencoded({ extended: true }))
// //
// // // Require & Import API routes
// // const users = require('./routes')
// // // const articles = require('./routes/articles')
// //
// // // Use API Routes
// // app.use(users)
// // // app.use(articles)
//
// const express = require('express')
// const passport = require('passport')
// const session = require('express-session')
// const axios = require('axios')
// const fetch = require('node-fetch')
// const btoa = require('btoa')
// // const passportSteam = require('passport-steam')
// // const SteamStrategy = passportSteam.Strategy
// const app = express()
//
// const port = 3000
//
// // app.post('/login', (req, res) => {
// //     console.log(req.body)
// //     res.send({})
// // })
// //
// // app.post('/user', (req, res) => {
// //     res.send({})
// // })
//
// // Required to get data from user for sessions
// // passport.serializeUser((user, done) => {
// //     done(null, user)
// // })
// //
// // passport.deserializeUser((user, done) => {
// //     done(null, user)
// // })
// //
// // // Initiate Strategy
// // passport.use(new SteamStrategy({
// //     returnURL: 'http://localhost:' + port + '/api/auth/steam/return',
// //     realm: 'http://localhost:' + port + '/',
// //     apiKey: '5DFEF97D4F1548B0303EB14E32375D31'
// // }, function (identifier, profile, done) {
// //     console.log(profile)
// //
// //     process.nextTick(function () {
// //         profile.identifier = identifier
// //         return done(null, profile)
// //     })
// // }
// // ))
// //
// // app.use(session({
// //     secret: 'Whatever_You_Want',
// //     saveUninitialized: true,
// //     resave: false,
// //     cookie: {
// //         maxAge: 3600000
// //     }
// // }))
// //
// // app.use(passport.initialize())
// //
// // app.use(passport.session())
//
// // Initiate app
// // app.listen(port, () => {
// //     console.log('Listening, port ' + port)
// // })
//
// const cookieParser = require('cookie-parser')
// app.use(cookieParser())
//
// app.get('/', (req, res) => {
//     // console.log(req.cookies.cookieName)
//
//     res.cookie('token', 1, { maxAge: 900000, httpOnly: true })
//     res.send(req.user || { test: 1 })
// })
//
// app.get('/ttt', (req, res) => {
//     console.log(req.cookies.token)
//
//     // res.cookie('token', 1, { maxAge: 900000, httpOnly: true })
//     res.send(req.user || { test: 1 })
// })
//
// // Routes
// // app.get('/auth/steam', passport.authenticate('steam', { failureRedirect: '/' }), function (req, res) {
// //     res.redirect('/')
// // })
// //
// // app.get('/auth/steam/return', passport.authenticate('steam', { failureRedirect: '/' }), function (req, res) {
// //     res.redirect('/')
// // })
//
// // const DiscordStrategy = require('passport-discord').Strategy
// //
// // const scopes = ['identify']
// //
// // passport.use(new DiscordStrategy({
// //     clientID: '886919625869250591',
// //     clientSecret: 'u9ZUnbdDB8w6ggupRMF7FEhkXAqrO0V3',
// //     callbackURL: 'http://localhost:' + port + '/api/auth/discord/callback',
// //     scope: scopes
// // },
// // function (accessToken, refreshToken, profile, cb) {
// //     console.log(profile)
// //
// //     // User.findOrCreate({ discordId: profile.id }, function(err, user) {
// //     return cb(null, profile)
// //     // });
// // }))
//
// const clientId = '886919625869250591'
// const clientSecret = 'u9ZUnbdDB8w6ggupRMF7FEhkXAqrO0V3'
//
// const redirect = String('http://localhost:3000/api/auth/discord/callback')
// const redirect2 = String('http://localhost:3000/api/auth/steam/callback')
// const qs = require('qs')
//
// app.get('/auth/discord', (req, res) => {
//     res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirect}&response_type=code&scope=identify`)
// })
// app.get('/auth/discord/callback', async function (req, res) {
//     if (!req.query.code) { throw new Error('NoCodeProvided') }
//     const code = req.query.code
//
//     try {
//         const response = await axios.post('https://discord.com/api/v8/oauth2/token',
//             qs.stringify({
//                 grant_type: 'authorization_code',
//                 code,
//                 redirect_uri: redirect,
//                 client_id: clientId,
//                 client_secret: clientSecret,
//                 scope: 'identify'
//             }), {
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded'
//                 }
//             })
//         const json = await response.data
//
//         console.log(json.access_token)
//
//         // const fetchUser = async (id) => {
//         const response2 = await axios.get('https://discord.com/api/v8/users/@me', {
//             headers: {
//                 Authorization: `Bearer ${json.access_token}`
//             }
//         })
//
//         console.log(response2.data)
//
//         // if (!response.ok) { throw new Error(`Error status code: ${response.status}`) }
//         // return JSON.parse(await response.json())
//         // }
//
//         // res.redirect(`/?token=${json.access_token}`);
//
//         res.redirect('/app') // Successful auth
//     } catch (e) {
//         console.log(e)
//     }
// })
//
// const sk = '5DFEF97D4F1548B0303EB14E32375D31'
// const SteamAuth = require('node-steam-openid')
//
// const steam = new SteamAuth({
//     // realm: 'http://localhost:5000', // Site name displayed to users on logon
//     // returnUrl: 'http://localhost:5000/auth/steam/authenticate', // Your return route
//     // apiKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXX' // Steam API key
//
//     returnUrl: 'http://localhost:' + port + '/api/auth/steam/callback',
//     realm: 'http://localhost:' + port + '/',
//     apiKey: '5DFEF97D4F1548B0303EB14E32375D31'
// })
//
// app.get('/auth/steam', async (req, res) => {
//     // https:// steamcommunity.com/oauth/login?response_type=&client_id=&state=
//
//     const redirectUrl = await steam.getRedirectUrl()
//     return res.redirect(redirectUrl)
//
//     // 'https://steamcommunity.com/openid/login?openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.mode=checkid_setup&openid.ns=http://specs.openid.net/auth/2.0&openid.realm=https://ru.dotabuff.com/&openid.return_to=https://ru.dotabuff.com/signin/callback'
//
//     // res.redirect(`https://steamcommunity.com/oauth/login?response_type=&client_id=${sk}&state=`)
// })
// app.get('/auth/steam/callback', async function (req, res) {
//     try {
//         const user = await steam.authenticate(req)
//
//         console.log(user)
//
//         // ...do something with the data
//     } catch (error) {
//         console.error(error)
//     }
//
//     // if (!req.query.code) { throw new Error('NoCodeProvided') }
//     // const code = req.query.code
//     //
//     // try {
//     //     const response = await axios.post('https://discord.com/api/v8/oauth2/token',
//     //         qs.stringify({
//     //             grant_type: 'authorization_code',
//     //             code,
//     //             redirect_uri: redirect,
//     //             client_id: clientId,
//     //             client_secret: clientSecret,
//     //             scope: 'identify'
//     //         }), {
//     //             headers: {
//     //                 'Content-Type': 'application/x-www-form-urlencoded'
//     //             }
//     //         })
//     //     const json = await response.data
//     //
//     //     console.log(json.access_token)
//     //
//     //     // const fetchUser = async (id) => {
//     //     const response2 = await axios.get('https://discord.com/api/v8/users/@me', {
//     //         headers: {
//     //             Authorization: `Bearer ${json.access_token}`
//     //         }
//     //     })
//     //
//     //     console.log(response2.data)
//     //
//     //     // if (!response.ok) { throw new Error(`Error status code: ${response.status}`) }
//     //     // return JSON.parse(await response.json())
//     //     // }
//     //
//     //     // res.redirect(`/?token=${json.access_token}`);
//     //
//     await res.redirect('/app') // Successful auth
//     // } catch (e) {
//     //     console.log(e)
//     // }
// })
