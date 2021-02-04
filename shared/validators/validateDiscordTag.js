export const validateDiscordTag = (discordTag) => {
    const trimmedTag = discordTag.trim()

    if (!trimmedTag.test(/^.{2,32}#[0-9]{4}$/)) {
        return 'Error_WrongDiscordTag'
    }

    return null
}
