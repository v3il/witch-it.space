const loadGlobalData = (request, response) => {
    const { user } = request
    const parsedUser = user ? user.getPublicData() : null

    response.send({ user: parsedUser })
}

const globalController = { loadGlobalData }

export { globalController }
