export const validateAvatarId = (avatarId) => {
    if (!Number.isInteger(avatarId) || avatarId < 1 || avatarId > 11) {
        return 'Error_WrongAvatarId'
    }

    return null
}
