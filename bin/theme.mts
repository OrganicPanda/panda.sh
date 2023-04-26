import { writeFile, readFile } from 'fs/promises'
import { createRequire } from 'node:module'
import path from 'path'
import prettier from 'prettier'

interface HappyHuesTheme {
  section1: {
    elements: {
      background: string
      headline: string
      paragraph: string
      button: string
      buttonText: string
    }
    illustrations: {
      stroke: string
      main: string
      highlight: string
      secondary: string
      tertiary: string
    }
  }

  section2: {
    elements: {
      background: string
      headline: string
      subHeadline: string
      cardBackground: string
      cardHeading: string
      cardParagraph: string
    }
    icons: {
      stroke: string
      main: string
      highlight: string
      secondary: string
      tertiary: string
    }
  }

  section3: {
    elements: {
      background: string
      headline: string
      paragraph: string
      cardBackground: string
      cardHeadline: string
      cardParagraph: string
      cardTagBackground: string
      cardTagText: string
      cardHighlight: string
    }
  }

  section4: {
    elements: {
      background: string
      headline: string
      paragraph: string
      link: string
      cardBackground: string
      cardHeadline: string
      cardParagraph: string
    }
    newsletter: {
      background: string
      formInput: string
      labelAndPlaceholder: string
      formButton: string
      formButtonText: string
    }
  }

  section5: {
    elements: {
      background: string
      headline: string
      paragraph: string
      links: string
    }
  }
}

interface Section1 extends Record<string, string> {
  '--🎨-background': string
  '--🎨-heading': string
  '--🎨-subheading': string
  '--🎨-text': string
  '--🎨-button-background': string
  '--🎨-button-text': string

  '--🎨-art-stroke': string
  '--🎨-art-primary': string
  '--🎨-art-accent': string
  '--🎨-art-secondary': string
  '--🎨-art-tertiary ': string
}

interface Section2 extends Record<string, string> {
  '--🎨-background': string
  '--🎨-heading': string
  '--🎨-subheading': string
  '--🎨-text': string
  '--🎨-card-background': string
  '--🎨-card-heading': string
  '--🎨-card-text': string

  '--🎨-art-stroke': string
  '--🎨-art-primary': string
  '--🎨-art-accent': string
  '--🎨-art-secondary': string
  '--🎨-art-tertiary ': string
}

interface Section3 extends Record<string, string> {
  '--🎨-background': string
  '--🎨-heading': string
  '--🎨-text': string
  '--🎨-card-background': string
  '--🎨-card-heading': string
  '--🎨-card-text': string
  '--🎨-tag-background': string
  '--🎨-tag-text': string
  '--🎨-card-accent': string
}

interface Section4 extends Record<string, string> {
  '--🎨-background': string
  '--🎨-heading': string
  '--🎨-text': string
  '--🎨-link': string
  '--🎨-card-background': string
  '--🎨-card-heading': string
  '--🎨-card-text': string

  '--🎨-form-input-background': string
  '--🎨-form-input-text': string
  '--🎨-form-button-background': string
  '--🎨-form-button-text': string
}

interface Section5 extends Record<string, string> {
  '--🎨-background': string
  '--🎨-heading': string
  '--🎨-text': string
  '--🎨-link': string
}

// Stuff not explicitly covered by happyhues
interface NotCovered extends Record<string, string> {
  '--🎨-border': string
  '--🎨-code-background': string
  '--🎨-code-color': string
}

interface Sizing {
  base: {
    '--📏-spacing-1': string
    '--📏-spacing-2': string
    '--📏-spacing-3': string
    '--📏-spacing-4': string
    '--📏-spacing-5': string
    '--📏-spacing-6': string
    '--📏-spacing-7': string
    '--📏-spacing-8': string
    '--📏-container-padding': string
    '--📏-text-container-padding': string
    '--📏-page-max-width': string
    '--📏-art-stroke-1': string
    '--📏-art-stroke-2': string
    '--📏-art-stroke-3': string
    '--📏-border-radius-1': string
    '--📏-border-radius-2': string
    '--📏-border-radius-3': string
    '--📏-font-size-1': string
    '--📏-font-size-2': string
    '--📏-font-size-3': string
    '--📏-line-height-1': string
    '--📏-line-height-2': string
    '--📏-line-height-3': string
    '--📏-line-height-4': string
  }
  size1: {
    '--📏-spacing-1': string
    '--📏-spacing-2': string
    '--📏-spacing-3': string
    '--📏-spacing-4': string
    '--📏-spacing-5': string
    '--📏-spacing-6': string
    '--📏-spacing-7': string
    '--📏-spacing-8': string
    '--📏-container-padding': string
    '--📏-text-container-padding': string
  }
  size2: {
    '--📏-spacing-1': string
    '--📏-spacing-2': string
    '--📏-spacing-3': string
    '--📏-spacing-4': string
    '--📏-spacing-5': string
    '--📏-spacing-6': string
    '--📏-spacing-7': string
    '--📏-spacing-8': string
    '--📏-container-padding': string
    '--📏-text-container-padding': string
  }
}

interface StandardTheme {
  palettes: {
    base: Section4 & Section5 & Section3 & Section1 & NotCovered
    palette1: Section5 & Section3 & Section1
    palette2: Section4 & Section2
  }
  sizing: Sizing
}

const happyHuesTheme4: HappyHuesTheme = {
  // dark bg
  section1: {
    elements: {
      background: '#16161a', // background
      headline: '#fffffe', // heading
      paragraph: '#94a1b2', // text
      button: '#7f5af0', // button-background
      buttonText: '#fffffe' // button-text
    },
    illustrations: {
      stroke: '#010101', // art-stroke
      main: '#fffffe', // art-primary
      highlight: '#7f5af0', // art-accent
      secondary: '#72757e', // art-secondary
      tertiary: '#2cb67d' // art-tertiary
    }
  },

  // light bg, dark bg card
  section2: {
    elements: {
      background: '#242629', // background
      headline: '#fffffe', // heading
      subHeadline: '#94a1b2', // subheading & text
      cardBackground: '#16161a', // card-background
      cardHeading: '#fffffe', // card-heading
      cardParagraph: '#94a1b2' // card-text
    },
    icons: {
      stroke: '#010101', // art-stroke
      main: '#fffffe', // art-primary
      highlight: '#7f5af0', // art-accent
      secondary: '#72757e', // art-secondary
      tertiary: '#2cb67d' // art-tertiary
    }
  },

  // dark bg, light bg card
  section3: {
    elements: {
      background: '#16161a', // background
      headline: '#fffffe', // heading
      paragraph: '#94a1b2', // text
      cardBackground: '#242629', // card-background
      cardHeadline: '#fffffe', // card-heading
      cardParagraph: '#94a1b2', // card-text
      cardTagBackground: '#7f5af0', // tag-background
      cardTagText: '#fffffe', // tag-text
      cardHighlight: '#fffffe' // card-accent
    }
  },

  // light bg, dark bg card
  section4: {
    elements: {
      background: '#242629', // background
      headline: '#fffffe', // heading
      paragraph: '#94a1b2', // text
      link: '#7f5af0', // link
      cardBackground: '#16161a', // card-background
      cardHeadline: '#fffffe', // card-heading
      cardParagraph: '#94a1b2' // card-text
    },
    newsletter: {
      background: '#fffffe', // unused??
      formInput: '#16161a', // form-input-background
      labelAndPlaceholder: '#fffffe', // form-input-text
      formButton: '#7f5af0', // form-button-background
      formButtonText: '#fffffe' // form-button-text
    }
  },

  // dark bg
  section5: {
    elements: {
      background: '#16161a', // background
      headline: '#fffffe', // heading
      paragraph: '#94a1b2', // text
      links: '#7f5af0' // link
    }
  }
}

const happyHuesTheme14: HappyHuesTheme = {
  // light bg
  section1: {
    elements: {
      background: '#fffffe',
      headline: '#272343',
      paragraph: '#2d334a',
      button: '#ffd803',
      buttonText: '#272343'
    },
    illustrations: {
      stroke: '#272343',
      main: '#fffffe',
      highlight: '#ffd803',
      secondary: '#e3f6f5',
      tertiary: '#bae8e8'
    }
  },

  // light bg, dark bg card
  section3: {
    elements: {
      background: '#fffffe',
      headline: '#272343',
      paragraph: '#2d334a',
      cardBackground: '#272343',
      cardHeadline: '#fffffe',
      cardParagraph: '#fffffe',
      cardTagBackground: '#bae8e8',
      cardTagText: '#272343',
      cardHighlight: '#bae8e8'
    }
  },

  // light bg
  section5: {
    elements: {
      background: '#fffffe',
      headline: '#272343',
      paragraph: '#2d334a',
      links: '#ffd803'
    }
  },

  // dark bg
  section2: {
    elements: {
      background: '#e3f6f5',
      headline: '#272343',
      subHeadline: '#2d334a',
      cardBackground: '#fffffe',
      cardHeading: '#272343',
      cardParagraph: '#2d334a'
    },
    icons: {
      stroke: '#272343',
      main: '#fffffe',
      highlight: '#ffd803',
      secondary: '#e3f6f5',
      tertiary: '#bae8e8'
    }
  },

  // dark bg, light bg card
  section4: {
    elements: {
      background: '#e3f6f5',
      headline: '#272343',
      paragraph: '#2d334a',
      link: '#272343',
      cardBackground: '#fffffe',
      cardHeadline: '#272343',
      cardParagraph: '#2d334a'
    },
    newsletter: {
      background: '#bae8e8',
      formInput: '#fffffe',
      labelAndPlaceholder: '#272343',
      formButton: '#272343',
      formButtonText: '#fffffe'
    }
  }
}

// Content defines height
// Margins are only added when composing items

const defaultSizing = {
  base: {
    '--📏-spacing-1': '0.1em',
    '--📏-spacing-2': '0.2em',
    '--📏-spacing-3': '0.4em',
    '--📏-spacing-4': '0.6em',
    '--📏-spacing-5': '0.8em',
    '--📏-spacing-6': '1em',
    '--📏-spacing-7': '1.5em',
    '--📏-spacing-8': '2em',
    '--📏-container-padding': 'var(--📏-spacing-6)',
    '--📏-text-container-padding': 'var(--📏-container-padding)',
    '--📏-page-max-width': '50em',
    '--📏-art-stroke-1': '0.1em',
    '--📏-art-stroke-2': '0.5em',
    '--📏-art-stroke-3': '0.75em',
    '--📏-border-radius-1': '0.25em',
    '--📏-border-radius-2': '0.5em',
    '--📏-border-radius-3': '0.75em',
    '--📏-font-size-1': '1em',
    '--📏-font-size-2': '1.5em',
    '--📏-font-size-3': '2.5em',
    '--📏-line-height-1': '1',
    '--📏-line-height-2': '1.3',
    '--📏-line-height-3': '1.6',
    '--📏-line-height-4': '1.8'
  },
  size1: {
    '--📏-spacing-1': '0.1em',
    '--📏-spacing-2': '0.2em',
    '--📏-spacing-3': '0.3em',
    '--📏-spacing-4': '0.4em',
    '--📏-spacing-5': '0.5em',
    '--📏-spacing-6': '0.75em',
    '--📏-spacing-7': '1em',
    '--📏-spacing-8': '1.5em',
    '--📏-container-padding': 'var(--📏-spacing-6)',
    '--📏-text-container-padding': 'var(--📏-container-padding)'
  },
  size2: {
    '--📏-spacing-1': '0.25em',
    '--📏-spacing-2': '0.5em',
    '--📏-spacing-3': '0.75em',
    '--📏-spacing-4': '1em',
    '--📏-spacing-5': '1.5em',
    '--📏-spacing-6': '2em',
    '--📏-spacing-7': '3em',
    '--📏-spacing-8': '4em',
    '--📏-container-padding': 'var(--📏-spacing-6)',
    '--📏-text-container-padding': 'var(--📏-container-padding)'
  }
}

const happyHuesToStandardTheme = (
  happyHuesTheme: HappyHuesTheme
): StandardTheme => {
  // Mix 1, 3 & 5
  // - 1 has elements, illustrations/icons
  // - 3 has elements, card
  // - 5 has elements
  // - Missing newsletter/form
  // Mix 2 & 4
  // - 2 has elements, card, illustrations/icons
  // - 4 has elements, card, newsletter/form
  // - Missing nothing
  const section1 = {
    '--🎨-background': happyHuesTheme.section1.elements.background,
    '--🎨-heading': happyHuesTheme.section1.elements.headline,
    '--🎨-subheading': happyHuesTheme.section1.elements.paragraph,
    '--🎨-text': happyHuesTheme.section1.elements.paragraph,
    '--🎨-button-background': happyHuesTheme.section1.elements.button,
    '--🎨-button-text': happyHuesTheme.section1.elements.buttonText,

    '--🎨-art-stroke': happyHuesTheme.section1.illustrations.stroke,
    '--🎨-art-primary': happyHuesTheme.section1.illustrations.main,
    '--🎨-art-accent': happyHuesTheme.section1.illustrations.highlight,
    '--🎨-art-secondary': happyHuesTheme.section1.illustrations.secondary,
    '--🎨-art-tertiary ': happyHuesTheme.section1.illustrations.tertiary
  }

  const section2 = {
    '--🎨-background': happyHuesTheme.section2.elements.background,
    '--🎨-heading': happyHuesTheme.section2.elements.headline,
    '--🎨-subheading': happyHuesTheme.section2.elements.subHeadline,
    '--🎨-text': happyHuesTheme.section2.elements.subHeadline,
    '--🎨-card-background': happyHuesTheme.section2.elements.cardBackground,
    '--🎨-card-heading': happyHuesTheme.section2.elements.cardHeading,
    '--🎨-card-text': happyHuesTheme.section2.elements.cardParagraph,

    '--🎨-art-stroke': happyHuesTheme.section2.icons.stroke,
    '--🎨-art-primary': happyHuesTheme.section2.icons.main,
    '--🎨-art-accent': happyHuesTheme.section2.icons.highlight,
    '--🎨-art-secondary': happyHuesTheme.section2.icons.secondary,
    '--🎨-art-tertiary ': happyHuesTheme.section2.icons.tertiary
  }

  const section3 = {
    '--🎨-background': happyHuesTheme.section3.elements.background,
    '--🎨-heading': happyHuesTheme.section3.elements.headline,
    '--🎨-text': happyHuesTheme.section3.elements.paragraph,
    '--🎨-card-background': happyHuesTheme.section3.elements.cardBackground,
    '--🎨-card-heading': happyHuesTheme.section3.elements.cardHeadline,
    '--🎨-card-text': happyHuesTheme.section3.elements.cardParagraph,
    '--🎨-tag-background': happyHuesTheme.section3.elements.cardTagBackground,
    '--🎨-tag-text': happyHuesTheme.section3.elements.cardTagText,
    '--🎨-card-accent': happyHuesTheme.section3.elements.cardHighlight
  }

  const section4Form = {
    '--🎨-form-input-background': happyHuesTheme.section4.newsletter.formInput,
    '--🎨-form-input-text':
      happyHuesTheme.section4.newsletter.labelAndPlaceholder,
    '--🎨-form-button-background':
      happyHuesTheme.section4.newsletter.formButton,
    '--🎨-form-button-text': happyHuesTheme.section4.newsletter.formButtonText
  }

  const section4 = {
    '--🎨-background': happyHuesTheme.section4.elements.background,
    '--🎨-heading': happyHuesTheme.section4.elements.headline,
    '--🎨-text': happyHuesTheme.section4.elements.paragraph,
    '--🎨-link': happyHuesTheme.section4.elements.link,
    '--🎨-card-background': happyHuesTheme.section4.elements.cardBackground,
    '--🎨-card-heading': happyHuesTheme.section4.elements.cardHeadline,
    '--🎨-card-text': happyHuesTheme.section4.elements.cardParagraph,

    ...section4Form
  }

  const section5 = {
    '--🎨-background': happyHuesTheme.section5.elements.background,
    '--🎨-heading': happyHuesTheme.section5.elements.headline,
    '--🎨-text': happyHuesTheme.section5.elements.paragraph,
    '--🎨-link': happyHuesTheme.section5.elements.links
  }

  // Stuff not explicitly covered by happyhues
  const notCovered = {
    '--🎨-border': happyHuesTheme.section1.elements.headline,
    '--🎨-code-background': section2['--🎨-background'],
    '--🎨-code-color': section2['--🎨-text']
  }

  return {
    palettes: {
      base: {
        ...section4,
        ...section5,
        ...section3,
        ...section1,
        ...notCovered
      },
      palette1: {
        ...section5,
        ...section3,
        ...section1
      },
      palette2: {
        ...section4,
        ...section2
      }
    },
    sizing: defaultSizing
  }
}

const stringifyCSS = (css: Record<string, string>) => {
  return Object.entries(css)
    .map(([key, value]) => `${key}: ${value};`)
    .join('\n')
}

const standardThemeToCSS = (
  name: string,
  standardThemeLight: StandardTheme,
  standardThemeDark: StandardTheme
) => {
  return `
  .🐼-theme-${name}-palettes-base {
    ${stringifyCSS(standardThemeLight.palettes.base)}
  }

  @media (prefers-color-scheme: dark) {
    .🐼-theme-${name}-palettes-base {
      ${stringifyCSS(standardThemeDark.palettes.base)}
    }  
  }

  .🐼-theme-${name}-palettes-palette1 {
    ${stringifyCSS(standardThemeLight.palettes.palette1)}
  }

  @media (prefers-color-scheme: dark) {
    .🐼-theme-${name}-palettes-palette1 {
      ${stringifyCSS(standardThemeDark.palettes.palette1)}
    }  
  }

  .🐼-theme-${name}-palettes-palette2 {
    ${stringifyCSS(standardThemeLight.palettes.palette2)}
  }

  @media (prefers-color-scheme: dark) {
    .🐼-theme-${name}-palettes-palette2 {
      ${stringifyCSS(standardThemeDark.palettes.palette2)}
    }  
  }
  
  .🐼-theme-${name}-sizing-base {
    ${stringifyCSS(standardThemeLight.sizing.base)}
  }

  @media (prefers-color-scheme: dark) {
    .🐼-theme-${name}-sizing-base {
      ${stringifyCSS(standardThemeDark.sizing.base)}
    }  
  }

  .🐼-theme-${name}-sizing-size1 {
    ${stringifyCSS(standardThemeLight.sizing.size1)}
  }

  @media (prefers-color-scheme: dark) {
    .🐼-theme-${name}-sizing-size1 {
      ${stringifyCSS(standardThemeDark.sizing.size1)}
    }  
  }

  .🐼-theme-${name}-sizing-size2 {
    ${stringifyCSS(standardThemeLight.sizing.size2)}
  }

  @media (prefers-color-scheme: dark) {
    .🐼-theme-${name}-sizing-size2 {
      ${stringifyCSS(standardThemeDark.sizing.size2)}
    }  
  }
  `
}

const theme = standardThemeToCSS(
  'happyhues',
  happyHuesToStandardTheme(happyHuesTheme14),
  happyHuesToStandardTheme(happyHuesTheme4)
)

const prettyTheme = prettier.format(theme, { parser: 'css' })

await writeFile(
  path.join(
    process.cwd(),
    'src',
    'styles',
    'pandastyle',
    'pandastyle-theme-happyhues.css'
  ),
  prettyTheme
)

const require = createRequire(import.meta.url)
const highlightJsRootDir = path.dirname(
  require.resolve('highlight.js/package.json')
)

const darkThemeCss = await readFile(
  path.join(highlightJsRootDir, 'styles', 'kimbie-dark.css'),
  {
    encoding: 'utf-8'
  }
)

const lightThemeCss = await readFile(
  path.join(highlightJsRootDir, 'styles', 'kimbie-light.css'),
  {
    encoding: 'utf-8'
  }
)

const syntaxHighlightCss = `
${lightThemeCss}

@media (prefers-color-scheme: dark) {
  ${darkThemeCss}
}`
  .replace(/(padding|margin|overflow-x|display):[^;]+;/gim, '')
  .replace(/pre code.hljs/gim, '.🐼-code > code')
  .replace(/(.hljs-)/gim, '.🐼-code .hljs-')

const syntaxHighlightCssPretty = prettier.format(syntaxHighlightCss, {
  parser: 'css'
})

await writeFile(
  path.join(
    process.cwd(),
    'src',
    'styles',
    'pandastyle',
    'pandastyle-theme-syntax-highlight.css'
  ),
  syntaxHighlightCssPretty
)
