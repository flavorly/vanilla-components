module.exports = {
    extends: [
        // add more generic rulesets here, such as:
        // 'eslint:recommended',
        'plugin:vue/vue3-recommended',
        'plugin:vue/vue3-essential',
    ],
    rules: {
        // override/add rules settings here, such as:
        'vue/no-unused-vars': 'error',
        'vue/no-mutating-props' : 'error',
        'vue/require-prop-types' : 'off',
        'vue/no-v-html' : 'off',
    }
}
