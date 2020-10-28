export default async function ({ store }) {
    await store.dispatch('theme/getThemeFromCookie')
}
