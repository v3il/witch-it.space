export const validateDiscordTag = (discordTag) => {
    const trimmedTag = discordTag.trim()

    if (!/^.{2,32}#[0-9]{4}$/.test(trimmedTag)) {
        return 'Error_WrongDiscordTag'
    }

    return null
}
