export const showPopup = (vm, options) => {
    vm.$buefy.dialog.confirm({
        ...options,
        animation: 'none'
    })
}
