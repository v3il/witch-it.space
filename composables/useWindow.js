export const useWindow = (url, windowName) => {
    return new Promise((resolve, reject) => {
        const windowInstance = openWindow(url, {
            tagName: windowName
        })

        const intervalId = setInterval(() => {
            if (windowInstance.closed) {
                clearInterval(intervalId)
                // eslint-disable-next-line prefer-promise-reject-errors
                reject(null)
            }
        }, 500)

        const handler = ({ data }) => {
            if (!data.result) {
                return
            }

            const { error } = data.result

            windowInstance?.close()
            window.removeEventListener('message', handler, false)
            error ? reject(new Error(error)) : resolve()
        }

        window.addEventListener('message', handler, false)
    })
}
