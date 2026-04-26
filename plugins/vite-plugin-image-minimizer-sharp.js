const DEFAULT_IMAGE_TEST = /\.(?:avif|jpe?g|png|tiff?|webp)$/i

const DEFAULT_ENCODE_OPTIONS = {
  jpeg: { quality: 82 },
  png: { compressionLevel: 9 },
  webp: { quality: 82 },
  avif: { quality: 50 },
}

const DEFAULT_RULES = [
  {
    test: DEFAULT_IMAGE_TEST,
    minimizer: [
      {
        implementation: 'sharpMinify',
        options: { encodeOptions: DEFAULT_ENCODE_OPTIONS },
      },
    ],
  },
]

function normalizeMinimizerOptions(implementationName, options = {}) {
  if (implementationName !== 'svgoMinify') return options

  if (options.encodeOptions) return options

  return {
    encodeOptions: options,
  }
}

export function imageMinimizerSharpPlugin({ rules = DEFAULT_RULES } = {}) {
  let implementations = {}

  return {
    name: 'vite-plugin-image-minimizer-sharp',
    apply: 'build',
    async buildStart() {
      const mod = await import('image-minimizer-webpack-plugin')
      const plugin = mod.default ?? mod

      implementations = {
        sharpMinify: plugin?.sharpMinify,
        svgoMinify: plugin?.svgoMinify,
      }

      for (const rule of rules) {
        for (const minimizer of rule.minimizer ?? []) {
          const implementationName =
            typeof minimizer.implementation === 'string'
              ? minimizer.implementation
              : minimizer.implementation?.name
          const implementation =
            typeof minimizer.implementation === 'function'
              ? minimizer.implementation
              : implementations[implementationName]

          if (typeof implementation !== 'function') {
            throw new Error(
              `image-minimizer-webpack-plugin.${implementationName} is unavailable`,
            )
          }

          await implementation.setup?.()
        }
      }
    },
    async generateBundle(_, bundle) {
      for (const output of Object.values(bundle)) {
        if (output.type !== 'asset') continue

        const originalSource = Buffer.isBuffer(output.source)
          ? output.source
          : Buffer.from(output.source)

        for (const rule of rules) {
          if (!rule.test.test(output.fileName)) continue

          let currentSource = originalSource

          for (const minimizer of rule.minimizer ?? []) {
            const implementationName =
              typeof minimizer.implementation === 'string'
                ? minimizer.implementation
                : minimizer.implementation?.name
            const implementation =
              typeof minimizer.implementation === 'function'
                ? minimizer.implementation
                : implementations[implementationName]

            const result = await implementation(
              {
                filename: output.fileName,
                data: currentSource,
                warnings: [],
                errors: [],
                info: {},
              },
              normalizeMinimizerOptions(implementationName, minimizer.options),
            )

            if (!result) continue

            if (result.errors.length > 0) {
              for (const error of result.errors) this.error(error)
            }

            for (const warning of result.warnings) {
              this.warn(warning)
            }

            if (result.data && result.data.length < currentSource.length) {
              currentSource = result.data
            }
          }

          if (currentSource.length < originalSource.length) {
            output.source = currentSource
          }

          break
        }
      }
    },
    async closeBundle() {
      const teardownSet = new Set()

      for (const rule of rules) {
        for (const minimizer of rule.minimizer ?? []) {
          const implementationName =
            typeof minimizer.implementation === 'string'
              ? minimizer.implementation
              : minimizer.implementation?.name
          const implementation =
            typeof minimizer.implementation === 'function'
              ? minimizer.implementation
              : implementations[implementationName]

          if (!implementation?.teardown || teardownSet.has(implementation)) continue

          teardownSet.add(implementation)
          await implementation.teardown()
        }
      }
    },
  }
}
