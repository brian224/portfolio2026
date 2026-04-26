import postcssImport from 'postcss-import'
import postcssPxtorem from 'postcss-pxtorem'
import postcssNesting from 'postcss-nesting'
import tailwindcss from 'tailwindcss'
import postcssFunctions from 'postcss-functions'
import postcssCalc from 'postcss-calc'
import postcssHexrgba from 'postcss-hexrgba'
import autoprefixer from 'autoprefixer'
import FUNCTION from './postcss.function.js'

export default {
  plugins: [
    postcssImport(),
    postcssPxtorem({
      propList: ['*', '!box-shadow', '!z-index', '!border-width'],
      minPixelValue: 2,
    }),
    postcssNesting(),
    tailwindcss(),
    postcssFunctions({
      functions: FUNCTION,
    }),
    postcssCalc(),
    postcssHexrgba(),
    autoprefixer(),
  ],
}
