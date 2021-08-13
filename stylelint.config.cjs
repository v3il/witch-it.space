module.exports = {
    extends: [
        'stylelint-config-standard'
    ],

    ignoreFiles: [
        'node_modules'
    ],

    rules: {
        indentation: 4,
        'block-no-empty': null,
        'comment-empty-line-before': null,
        'comment-whitespace-inside': null,
        'no-empty-source': null,
        'at-rule-no-unknown': null
    }
}
