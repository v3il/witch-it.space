export const openWindow = (url, options) => {
    const width = Math.min(options.width ?? 800, window.innerWidth)
    const height = Math.min(options.height ?? 800, window.innerHeight)

    return window.open(url, options.tagName, `width=${width}, height=${height}`)
}
