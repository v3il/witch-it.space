export const openWindow = (url, options) => {
    const width = Math.min(options.width ?? 800, window.innerWidth)
    const height = Math.min(options.height ?? 800, window.innerHeight)
    const x = (window.innerWidth - width) / 2
    const y = (window.innerHeight - height) / 2

    return window.open(url, options.tagName, `width=${width}, height=${height}, left=${x}, top=${y}`)
}
