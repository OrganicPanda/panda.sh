const WebWorkerPlugin = require('@shopify/web-worker/webpack');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

const fs = require('fs');
const theme = fs.readFileSync(
  __dirname + '/public/pandastyle-theme-happyhues.css',
  { encoding: 'utf-8' }
)
const matches = [...theme.matchAll(/--🎨-background:\s*([^$;]+)/gm)]

module.exports = withBundleAnalyzer({
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(new WebWorkerPlugin.WebWorkerPlugin({globalObject: 'self' }))

    return config
  },
  generateBuildId: () => 'build',
  env: {
    THEME_BACKGROUND: matches[0][1],
    THEME_BACKGROUND_DARK: matches[1][1]
  },
  eslint: {
    dirs: []
  },
  experimental: {
    concurrentFeatures: true
  }
})
