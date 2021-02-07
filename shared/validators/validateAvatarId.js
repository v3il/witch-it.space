export const validateAvatarId = (avatarId) => {
    if (avatarId < 1 && avatarId > 5) {
        return 'Error_WrongAvatarId'
    }

    return null
}
