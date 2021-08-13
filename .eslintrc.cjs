module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false
    },
    extends: [
        '@nuxtjs',
        'plugin:nuxt/recommended'
    ],
    plugins: [
    ],
    // add your custom rules here
    rules: {
        indent: ['error', 4],
        'no-return-assign': 'off',
        'no-unused-vars': 'off',
        'prefer-promise-reject-errors': 'off',
        'import/named': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/no-v-html': 'off',
    }
}
