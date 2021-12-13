export const validateAvatarId = (avatarId) => {
    if (avatarId < 1 && avatarId > 11) {
        return 'Error_WrongAvatarId'
    }

    return null
}
