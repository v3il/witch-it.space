export const formatDate = (date, addTime = true) => {
    const dateString = date.toLocaleDateString()
    const timeString = date.toLocaleTimeString()

    return addTime ? dateString + ' ' + timeString : dateString
}
