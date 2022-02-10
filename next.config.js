const fs = require('fs');
const theme = fs.readFileSync(__dirname + '/public/pandastyle.css', { encoding: 'utf-8' })
const matches = [...theme.matchAll(/--🎨-background:\s*([^$;]+)/gm)]

module.exports = {
  generateBuildId: () => "build",
  env: {
    THEME_BACKGROUND: matches[0][1],
    THEME_BACKGROUND_DARK: matches[1][1],
  }
}