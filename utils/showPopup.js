export const showPopup = (vm, options) => {
    vm.$buefy.dialog.confirm({
        ...options,
        animation: 'none'
        // onCancel: () => {
        //     const marginRight = getBodyMargin()
        //     document.body.style.marginRight = (marginRight - getScrollbarWidth()) + 'px'
        // }
    })

    // const marginRight = getBodyMargin()
    // document.body.style.marginRight = (marginRight + getScrollbarWidth()) + 'px'
}

function getBodyMargin () {
    const marginRight = window.getComputedStyle(document.body).marginRight
    return Number.parseInt(marginRight.match(/\d*/)[0])
}

function getScrollbarWidth () {
    const outer = document.createElement('div')
    outer.style.visibility = 'hidden'
    outer.style.position = 'absolute'
    outer.style.left = '-2000px'
    outer.style.overflow = 'scroll'
    document.body.appendChild(outer)

    const inner = document.createElement('div')
    outer.appendChild(inner)

    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth)

    outer.parentNode.removeChild(outer)

    return scrollbarWidth
}
