const happyHuesTheme4 = {
  // dark bg
  section1: {
    elements: {
      background: "#16161a", // background
      headline: "#fffffe", // heading
      paragraph: "#94a1b2", // text
      button: "#7f5af0", // button-background
      buttonText: "#fffffe", // button-text
    },
    illustrations: {
      stroke: "#010101", // art-stroke
      main: "#fffffe", // art-primary
      highlight: "#7f5af0", // art-accent
      secondary: "#72757e", // art-secondary
      tertiary: "#2cb67d", // art-tertiary
    },
  },

  // light bg, dark bg card
  section2: {
    elements: {
      background: "#242629", // background
      headline: "#fffffe", // heading
      subHeadline: "#94a1b2", // subheading & text
      cardBackground: "#16161a", // card-background
      cardHeading: "#fffffe", // card-heading
      cardParagraph: "#94a1b2", // card-text
    },
    icons: {
      stroke: "#010101", // art-stroke
      main: "#fffffe", // art-primary
      highlight: "#7f5af0", // art-accent
      secondary: "#72757e", // art-secondary
      tertiary: "#2cb67d", // art-tertiary
    },
  },

  // dark bg, light bg card
  section3: {
    elements: {
      background: "#16161a", // background
      headline: "#fffffe", // heading
      paragraph: "#94a1b2", // text
      cardBackground: "#242629", // card-background
      cardHeadline: "#fffffe", // card-heading
      cardParagraph: "#94a1b2", // card-text
      cardTagBackground: "#7f5af0", // tag-background
      cardTagText: "#fffffe", // tag-text
      cardHighlight: "#fffffe", // card-accent
    },
  },

  // light bg, dark bg card
  section4: {
    elements: {
      background: "#242629", // background
      headline: "#fffffe", // heading
      paragraph: "#94a1b2", // text
      link: "#7f5af0", // link
      cardBackground: "#16161a", // card-background
      cardHeadline: "#fffffe", // card-heading
      cardParagraph: "#94a1b2", // card-text
    },
    newsletter: {
      background: "#fffffe", // unused??
      formInput: "#16161a", // form-input-background
      labelAndPlaceholder: "#fffffe", // form-input-text
      formButton: "#7f5af0", // form-button-background
      formButtonText: "#fffffe", // form-button-text
    },
  },

  // dark bg
  section5: {
    elements: {
      background: "#16161a", // background
      headline: "#fffffe", // heading
      paragraph: "#94a1b2", // text
      links: "#7f5af0", // link
    },
  },
};

const happyHuesTheme14 = {
  // light bg
  section1: {
    elements: {
      background: "#fffffe",
      headline: "#272343",
      paragraph: "#2d334a",
      button: "#ffd803",
      buttonText: "#272343",
    },
    illustrations: {
      stroke: "#272343",
      main: "#fffffe",
      highlight: "#ffd803",
      secondary: "#e3f6f5",
      tertiary: "#bae8e8",
    },
  },

  // light bg, dark bg card
  section3: {
    elements: {
      background: "#fffffe",
      headline: "#272343",
      paragraph: "#2d334a",
      cardBackground: "#272343",
      cardHeadline: "#fffffe",
      cardParagraph: "#fffffe",
      cardTagBackground: "#bae8e8",
      cardTagText: "#272343",
      cardHighlight: "#bae8e8",
    },
  },

  // light bg
  section5: {
    elements: {
      background: "#fffffe",
      headline: "#272343",
      paragraph: "#2d334a",
      links: "#ffd803",
    },
  },

  // dark bg
  section2: {
    elements: {
      background: "#e3f6f5",
      headline: "#272343",
      subHeadline: "#2d334a",
      cardBackground: "#fffffe",
      cardHeading: "#272343",
      cardParagraph: "#2d334a",
    },
    icons: {
      stroke: "#272343",
      main: "#fffffe",
      highlight: "#ffd803",
      secondary: "#e3f6f5",
      tertiary: "#bae8e8",
    },
  },

  // dark bg, light bg card
  section4: {
    elements: {
      background: "#e3f6f5",
      headline: "#272343",
      paragraph: "#2d334a",
      link: "#272343",
      cardBackground: "#fffffe",
      cardHeadline: "#272343",
      cardParagraph: "#2d334a",
    },
    newsletter: {
      background: "#bae8e8",
      formInput: "#fffffe",
      labelAndPlaceholder: "#272343",
      formButton: "#272343",
      formButtonText: "#fffffe",
    },
  },
};

// Content defines height
// Margins are only added when composing items

const defaultSizing = {
  base: {
    "--📏-spacing-1": "0.5em",
    "--📏-spacing-2": "1em",
    "--📏-spacing-3": "1.5em",
    "--📏-container-padding": "var(--📏-spacing-2)",
    "--📏-text-container-padding": "var(--📏-container-padding)",
    "--📏-page-max-width": "70em",
    "--📏-art-stroke-1": "0.1em",
    "--📏-art-stroke-2": "0.5em",
    "--📏-art-stroke-3": "0.75em",
    "--📏-border-radius-1": "0.25em",
    "--📏-border-radius-2": "0.5em",
    "--📏-border-radius-3": "0.75em",
    "--📏-font-size-1": "1em",
    "--📏-font-size-2": "1.5em",
    "--📏-font-size-3": "2.5em",
  },
  size1: {
    "--📏-spacing-1": "0.25em",
    "--📏-spacing-2": "0.5em",
    "--📏-spacing-3": "0.75em",
    "--📏-container-padding": "var(--📏-spacing-2)",
    "--📏-text-container-padding": "var(--📏-container-padding)",
  },
  size2: {
    "--📏-spacing-1": "1em",
    "--📏-spacing-2": "1.5em",
    "--📏-spacing-3": "2em",
    "--📏-container-padding": "var(--📏-spacing-2)",
    "--📏-text-container-padding": "var(--📏-container-padding)",
  },
};

const happyHuesToStandardTheme = (happyHuesTheme) => {
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
    "--🎨-background": happyHuesTheme.section1.elements.background,
    "--🎨-heading": happyHuesTheme.section1.elements.headline,
    "--🎨-subheading": happyHuesTheme.section1.elements.paragraph,
    "--🎨-text": happyHuesTheme.section1.elements.paragraph,
    "--🎨-button-background": happyHuesTheme.section1.elements.button,
    "--🎨-button-text": happyHuesTheme.section1.elements.buttonText,

    "--🎨-art-stroke": happyHuesTheme.section1.illustrations.stroke,
    "--🎨-art-primary": happyHuesTheme.section1.illustrations.main,
    "--🎨-art-accent": happyHuesTheme.section1.illustrations.highlight,
    "--🎨-art-secondary": happyHuesTheme.section1.illustrations.secondary,
    "--🎨-art-tertiary ": happyHuesTheme.section1.illustrations.tertiary,
  };

  const section2 = {
    "--🎨-background": happyHuesTheme.section2.elements.background,
    "--🎨-heading": happyHuesTheme.section2.elements.headline,
    "--🎨-subheading": happyHuesTheme.section2.elements.subHeadline,
    "--🎨-text": happyHuesTheme.section2.elements.subHeadline,
    "--🎨-card-background": happyHuesTheme.section2.elements.cardBackground,
    "--🎨-card-heading": happyHuesTheme.section2.elements.cardHeading,
    "--🎨-card-text": happyHuesTheme.section2.elements.cardParagraph,

    "--🎨-art-stroke": happyHuesTheme.section2.icons.stroke,
    "--🎨-art-primary": happyHuesTheme.section2.icons.main,
    "--🎨-art-accent": happyHuesTheme.section2.icons.highlight,
    "--🎨-art-secondary": happyHuesTheme.section2.icons.secondary,
    "--🎨-art-tertiary ": happyHuesTheme.section2.icons.tertiary,
  };

  const section3 = {
    "--🎨-background": happyHuesTheme.section3.elements.background,
    "--🎨-heading": happyHuesTheme.section3.elements.headline,
    "--🎨-text": happyHuesTheme.section3.elements.paragraph,
    "--🎨-card-background": happyHuesTheme.section3.elements.cardBackground,
    "--🎨-card-heading": happyHuesTheme.section3.elements.cardHeadline,
    "--🎨-card-text": happyHuesTheme.section3.elements.cardParagraph,
    "--🎨-tag-background": happyHuesTheme.section3.elements.cardTagBackground,
    "--🎨-tag-text": happyHuesTheme.section3.elements.cardTagText,
    "--🎨-card-accent": happyHuesTheme.section3.elements.cardHighlight,
  };

  const section4Form = {
    "--🎨-form-input-background": happyHuesTheme.section4.newsletter.formInput,
    "--🎨-form-input-text":
      happyHuesTheme.section4.newsletter.labelAndPlaceholder,
    "--🎨-form-button-background":
      happyHuesTheme.section4.newsletter.formButton,
    "--🎨-form-button-text": happyHuesTheme.section4.newsletter.formButtonText,
  };

  const section4 = {
    "--🎨-background": happyHuesTheme.section4.elements.background,
    "--🎨-heading": happyHuesTheme.section4.elements.headline,
    "--🎨-text": happyHuesTheme.section4.elements.paragraph,
    "--🎨-link": happyHuesTheme.section4.elements.link,
    "--🎨-card-background": happyHuesTheme.section4.elements.cardBackground,
    "--🎨-card-heading": happyHuesTheme.section4.elements.cardHeadline,
    "--🎨-card-text": happyHuesTheme.section4.elements.cardParagraph,

    ...section4Form,
  };

  const section5 = {
    "--🎨-background": happyHuesTheme.section5.elements.background,
    "--🎨-heading": happyHuesTheme.section5.elements.headline,
    "--🎨-text": happyHuesTheme.section5.elements.paragraph,
    "--🎨-link": happyHuesTheme.section5.elements.links,
  };
  
  // Stuff not explicitly covered by happyhues 
  const notCovered = {
    "--🎨-border": happyHuesTheme.section1.elements.headline,
  };

  return {
    palettes: {
      base: {
        ...section4,
        ...section5,
        ...section3,
        ...section1,
        ...notCovered,
      },
      palette1: {
        ...section5,
        ...section3,
        ...section1,
      },
      palette2: {
        ...section4,
        ...section2,
      },
    },
    sizing: defaultSizing,
  };
};

const stringifyCss = css => {
  return Object.entries(css).map(([key, value]) => `${key}: ${value};`).join('\n')
}

const standardThemeToCSS = (name, standardThemeLight, standardThemeDark) => {
  return `
  .🐼-theme-${name}-palettes-base {
    ${stringifyCss(standardThemeLight.palettes.base)}
  }

  @media (prefers-color-scheme: dark) {
    .🐼-theme-${name}-palettes-base {
      ${stringifyCss(standardThemeDark.palettes.base)}
    }  
  }

  .🐼-theme-${name}-palettes-palette1 {
    ${stringifyCss(standardThemeLight.palettes.palette1)}
  }

  @media (prefers-color-scheme: dark) {
    .🐼-theme-${name}-palettes-palette1 {
      ${stringifyCss(standardThemeDark.palettes.palette1)}
    }  
  }

  .🐼-theme-${name}-palettes-palette2 {
    ${stringifyCss(standardThemeLight.palettes.palette2)}
  }

  @media (prefers-color-scheme: dark) {
    .🐼-theme-${name}-palettes-palette2 {
      ${stringifyCss(standardThemeDark.palettes.palette2)}
    }  
  }
  
  .🐼-theme-${name}-sizing-base {
    ${stringifyCss(standardThemeLight.sizing.base)}
  }

  @media (prefers-color-scheme: dark) {
    .🐼-theme-${name}-sizing-base {
      ${stringifyCss(standardThemeDark.sizing.base)}
    }  
  }

  .🐼-theme-${name}-sizing-size1 {
    ${stringifyCss(standardThemeLight.sizing.size1)}
  }

  @media (prefers-color-scheme: dark) {
    .🐼-theme-${name}-sizing-size1 {
      ${stringifyCss(standardThemeDark.sizing.size1)}
    }  
  }

  .🐼-theme-${name}-sizing-size2 {
    ${stringifyCss(standardThemeLight.sizing.size2)}
  }

  @media (prefers-color-scheme: dark) {
    .🐼-theme-${name}-sizing-size2 {
      ${stringifyCss(standardThemeDark.sizing.size2)}
    }  
  }
  `
}

console.log(standardThemeToCSS('happyhues', happyHuesToStandardTheme(happyHuesTheme14), happyHuesToStandardTheme(happyHuesTheme4)));
