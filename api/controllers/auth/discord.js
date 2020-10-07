import { axiosInstance } from '../../axios'

const redirect = String('http://localhost:3000/api/auth/discord/callback')

const qs = require('qs')

async function authUsingDiscord (request, response) {

}

app.get('/auth/discord', (req, res) => {
    res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirect}&response_type=code&scope=identify`)
})
app.get('/auth/discord/callback', async function (req, res) {
    if (!req.query.code) { throw new Error('NoCodeProvided') }
    const code = req.query.code

    try {
        const response = await axios.post('https://discord.com/api/v8/oauth2/token',
            qs.stringify({
                grant_type: 'authorization_code',
                code,
                redirect_uri: redirect,
                client_id: clientId,
                client_secret: clientSecret,
                scope: 'identify'
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        const json = await response.data

        console.log(json.access_token)

        // const fetchUser = async (id) => {
        const response2 = await axios.get('https://discord.com/api/v8/users/@me', {
            headers: {
                Authorization: `Bearer ${json.access_token}`
            }
        })

        console.log(response2.data)

        // if (!response.ok) { throw new Error(`Error status code: ${response.status}`) }
        // return JSON.parse(await response.json())
        // }

        // res.redirect(`/?token=${json.access_token}`);

        res.redirect('/app') // Successful auth
    } catch (e) {
        console.log(e)
    }
})
