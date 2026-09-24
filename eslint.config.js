import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import plugPrettier from '@vue/eslint-config-prettier'

export default [
  // 忽略範圍
  {
    // 忽略編譯後的檔案、覆蓋率報告和型別定義檔
    ignores: ['dist/**', 'build/**', 'coverage/**', 'types/**'],
  },

  // JS 基礎規則
  pluginJs.configs.recommended,

  // Vue 只使用基本規則
  ...pluginVue.configs['flat/essential'],

  // 前端框架環境定義
  {
    files: ['src/**/*.vue', 'src/**/*.js', 'public/**/*.js'],
    languageOptions: {
      globals: {
        // 加入瀏覽器物件
        ...globals.browser,
        // VITE 設定 SVG SPRITEMAP 的 URL
        __SPRITEMAP_URL__: 'readonly',
      },
    },
    rules: {
      // 元件不需要使用兩個以上單字命名
      'vue/multi-word-component-names': 'off',
      // SFC 區塊順序：spec（元件說明）一律排最前，再 script / template / style
      'vue/block-order': ['error', { order: ['spec', 'script', 'template', 'style'] }],
    },
  },

  // 本地 Node.js 環境
  {
    // 讓 ESLint 能判斷 Node.js 全域變數
    files: ['config.js', '**/*.config.js', '**/*.function.js', 'plugins/**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
  },

  // Prettier 必定在最後一行
  // 確保規則不會被覆蓋
  plugPrettier,
  {
    rules: {
      // 關閉 @vue/eslint-config-prettier 錯誤提示
      // Prettier 單純處理程式碼格式化
      // 這樣就不會出現 ESLint 報錯
      'prettier/prettier': 'off',
    },
  },
]
