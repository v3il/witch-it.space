const getCurrentUser = (request, response) => {
    response.send({ user: request.user })
}

const userController = {
    getCurrentUser
}

export { userController }
