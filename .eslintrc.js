module.exports = {
    env: {
        node: true,
        es6: true,
    },
    extends: ['eslint:recommended'],
    globals: {
        "document": true,
        "localStorage": true,
        "location": true,
        "window": true,
        "fetch": true,
        "db": true,
        "auth": true,
        "sessionStorage": true,
        "importScripts": true,
        "workbox": true
    },
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2018,
    },
    plugins: ['import'],
    ignorePatterns: ['node_modules/'],
    rules: {},
    settings: {
        react: {
            version: 'latest', // "detect" automatically picks the version you have installed.
        },
    },
}