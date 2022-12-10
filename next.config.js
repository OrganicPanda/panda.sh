const fs = require('fs')
const theme = fs.readFileSync(
  __dirname + '/src/styles/pandastyle/pandastyle-theme-happyhues.css',
  { encoding: 'utf-8' }
)
const matches = [...theme.matchAll(/--🎨-background:\s*([^$;]+)/gm)]

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    THEME_BACKGROUND: matches[0][1],
    THEME_BACKGROUND_DARK: matches[1][1],
  },
}

module.exports = nextConfig
