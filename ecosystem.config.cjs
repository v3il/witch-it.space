module.exports = {
    apps : [
        {
            name: "nuxt-dev",
            script: "./node_modules/nuxt/bin/nuxt.js",
            args: "dev"
        },
        {
            name: "nuxt-prod",
            script: "./node_modules/nuxt/bin/nuxt.js",
            args: "start"
        }
    ]
}
