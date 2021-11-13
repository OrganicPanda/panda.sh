const palette4 = {
  // dark bg
  section1: {
    elements: {
      background: '#16161a',
      headline: '#fffffe',
      paragraph: '#94a1b2',
      button: '#7f5af0',
      buttonText: '#fffffe'
    },
    illustrations: {
      stroke: '#010101',
      main: '#fffffe',
      highlight: '#7f5af0',
      secondary: '#72757e',
      tertiary: '#2cb67d'
    }
  },

  // light bg, dark bg card
  section2: {
    elements: {
      background: '#242629',
      headline: '#fffffe',
      subHeadline: '#94a1b2',
      cardBackground: '#16161a',
      cardHeading: '#fffffe',
      cardParagraph: '#94a1b2'
    },
    icons: {
      stroke: '#010101',
      main: '#fffffe',
      highlight: '#7f5af0',
      secondary: '#72757e',
      tertiary: '#2cb67d'
    }
  },

  // dark bg, light bg card
  section3: {
    elements: {
      background: '#16161a',
      headline: '#fffffe',
      paragraph: '#94a1b2',
      cardBackground: '#242629',
      cardHeadline: '#fffffe',
      cardParagraph: '#94a1b2',
      cardTagBackground: '#7f5af0',
      cardTagText: '#fffffe',
      cardHighlight: '#fffffe'
    }
  },

  // light bg, dark bg card
  section4: {
    elements: {
      background: '#242629',
      headline: '#fffffe',
      paragraph: '#94a1b2',
      link: '#7f5af0',
      cardBackground: '#16161a',
      cardHeadline: '#fffffe',
      cardParagraph: '#94a1b2'
    },
    newsletter: {
      background: '#fffffe',
      formInput: '#16161a',
      labelAndPlaceholder: '#fffffe',
      formButton: '#7f5af0',
      formButtonText: '#fffffe'
    }
  },

  // dark bg
  section5: {
    elements: {
      background: '#16161a',
      headline: '#fffffe',
      paragraph: '#94a1b2',
      links: '#7f5af0'
    }
  }
}

const palette14 = {
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
  },

  
}

const convertToStandardTheme = (palette) => {
  // Mix 1, 3 & 5  
  // - 1 has elements, illustrations/icons
  // - 3 has elements, card
  // - 5 has elements
  // - Missing newsletter/form 
  // Mix 2 & 4
  // - 2 has elements, card, illustrations/icons
  // - 4 has elements, card, newsletter/form
  // - Missing nothing
  return {
      section1: {
        // Each section 
        // - defines colour types
        positiveBackground, // background of this section
        negativeBackground, // an opposite thing like a card background in this secrion
        accentBackground, // More stylistic bits?
        accentForeground, // More stylistic bits?
        primary, secondary, tertiary, // room for expansion ?

        // Each component
        // - maps types to styles
        containerComponent: {
            background: positiveBackground,
            // "elements"
            
            tags: {
                background: negativeBackground,
            }
        },
        cardComponent: {
            background: negativeBackground,

            tags: {
                background: positiveBackground,
            }
        },


        // Or could be that any change of polarity is a "section"
        // A container "section1" contains a card which is a "section 4" 
        // The sections
        // - Set css custom props
        // - Apply a bg/fg/border
        // Component examples:
        // Header: color is foreground
        // tag: bg is accent, color is accentForeground
        // Allow very targeted overrides which fallback to more generic definitions
        // - color: var(--tag-foreground, --accent-foreground);

          // merged
          elements: {
            background,
            headline,
            paragraph,
            button,
            buttonText,
            subHeadline,
            link,
          },
          icons: {
            stroke,
            main,
            highlight,
            secondary,
            tertiary,
          },
          card: {
            background,
            headline,
            paragraph,
            tagBackground,
            tagText,
            highlight,
          },
          form: {
            background, // Not used, could be used for something else?
            input,
            labelAndPlaceholder,
            button,
            buttonText,
          }
      }
  }
}

export { palette4, palette14 }
