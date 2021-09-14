export const user = {
    user (request, response) {
        console.log('User controller!!', request)

        response.send({
            test: 1
        })
    }
}
