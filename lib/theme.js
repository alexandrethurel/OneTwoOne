export const colors = {
  primary: '#0057A0',
  secondary: '#FFC107',
  white: '#F5F5F5',
  black: '#212121',
  validation: '#6a994e',
  navbarBg: '#003E6B',
  refus: '#c1121f',
  gris: '#9E9E9E'
};

export const typography = {
  logo: {
    fontFamily: 'Squada One',
    fontSize: '80px',
    fontWeight: 'normal'
  },
  title: {
    fontFamily: 'Barlow',
    fontSize: '34px',
    fontWeight: '600'
  },
  text: {
    fontFamily: 'Roboto Condensed',
    fontSize: '14px',
    fontWeight: 'normal'
  },
  navbar: {
    fontFamily: 'Roboto Condensed',
    fontSize: '14px',
    fontWeight: 'normal'
  },
  button: {
    fontFamily: 'Roboto Condensed',
    fontSize: '20px',
    fontWeight: '900'
  }
};

export const gradients = {
  lightning: 'linear-gradient(45deg, #FFC107, #FFE082, #FFC107)',
  primaryGradient: 'linear-gradient(135deg, #0057A0, #003E6B)'
};

export const pages = {
  match: {
    page: {
      backgroundImage: 'url("/images/image.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center'
    },
    overlay: {
      backgroundColor: 'rgba(0, 57, 107, 0)',
      width: '100%',
      maxWidth: 430,
      padding: '10vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    header: {
      textAlign: 'center',
      color: colors.white
    },
    sloganTop: {
      fontFamily: typography.text.fontFamily,
      fontSize: typography.title.fontSize,
      marginBottom: 0
    },
    sloganBottom: {
      fontFamily: typography.text.fontFamily,
      fontSize: typography.title.fontSize,
      marginTop: 0
    },
    logo: {
      ...typography.logo,
      fontStyle: 'italic',
      color: colors.secondary,
      margin: '1px 0'
    },
    main: {
      flex: 1,
      overflow: 'hidden',
      
    },
    footer: {
      height: 48
    }
  },

  hallOfFame: {
    page: {
      backgroundColor: colors.white,
      height: '100vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center'
    },
    overlay: {
      width: '100%',
      maxWidth: 450,
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    header: {
      textAlign: 'center',
      color: colors.black
    },
    title: {
      ...typography.title,
      color: colors.black
    },
    main: {
      flex: 1
    },
    footer: {
      height: 48
    }
  },

  settings: {
    page: {
      backgroundColor: colors.white,
      height: '100vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center'
    },
    overlay: {
      width: '100%',
      maxWidth: 450,
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    header: {
      textAlign: 'center',
      color: colors.black
    },
    title: {
      ...typography.title,
      color: colors.black
    },
    main: {
      flex: 1,
      overflow: 'auto'
    },
    footer: {
      height: 48
    }
  }
};

export const components = {
  navbar: {
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 100,
      backgroundColor: colors.navbarBg,
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderTop: `2px solid ${colors.secondary}`,
      zIndex: 100
    },
    item: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: typography.navbar.fontFamily,
      color: colors.white,
      height: '100%',
      position: 'relative',
      textAlign: 'center'
    },
    emoji: {
      fontSize: 22,
      marginBottom: 4
    },
    label: {
      fontSize: 11,
      fontWeight: 'bold',
      lineHeight: 1.2
    },
    indicator: {
      position: 'absolute',
      bottom: -10,
      width: '30%',
      height: 3,
      backgroundColor: colors.secondary,
      borderRadius: 2
    },
    activeItem: {
      fontWeight: 'bold'
    }
  }
};

export const forms = {
  configForm: {
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      padding: 20,
      fontFamily: typography.text.fontFamily,
      maxWidth: 400,
      margin: '0 auto'
    },
    title: {
      textAlign: 'center',
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.black
    },
    label: {
      color: colors.black,
      fontSize: 14,
      fontWeight: 'bold'
    },
    input: {
      padding: 10,
      borderRadius: 8,
      border: '1px solid #ccc',
      fontSize: 14,
      fontFamily: typography.text.fontFamily,
      boxSizing: 'border-box'
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 12,
      color: colors.black
    },
    button: {
      marginTop: 12,
      backgroundColor: colors.primary,
      color: colors.white,
      padding: '12px 20px',
      border: 'none',
      borderRadius: 8,
      fontSize: 16,
      fontWeight: 'bold',
      cursor: 'pointer',
      fontFamily: typography.button.fontFamily
    },
    successMessage: {
      marginTop: 10,
      textAlign: 'center',
      color: colors.validation,
      fontWeight: 'bold',
      fontSize: 14
    }
  },

  matchForm: {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      width: '100%',
      maxWidth: 400,
      margin: '0 auto',
      paddingBottom: 8
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 8
    },
    label: {
      color: colors.white,
      fontSize: 13,
      fontFamily: typography.text.fontFamily,
      marginBottom: 4,
      fontWeight: 'bold'
    },
    roundRow: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 8
    },
    input: {
      flex: 1,
      padding: '10px 12px',
      fontSize: 16,
      fontFamily: typography.text.fontFamily,
      borderRadius: 12,
      border: 'none',
      textAlign: 'center',
      backgroundColor: colors.white
    },
    textInput: {
      width: '100%',
      padding: '10px 14px',
      fontSize: 16,
      fontFamily: typography.text.fontFamily,
      borderRadius: 12,
      border: 'none',
      textAlign: 'center',
      backgroundColor: colors.white,
      boxSizing: 'border-box'
    },
    button: {
      backgroundColor: colors.secondary,
      color: colors.black,
      fontFamily: typography.button.fontFamily,
      fontWeight: typography.button.fontWeight,
      fontSize: typography.button.fontSize,
      padding: '14px',
      border: 'none',
      borderRadius: 999,
      cursor: 'pointer',
      width: '100%',
      marginTop: 20
    },
    settingsText: {
      color: colors.white,
      textAlign: 'center',
      fontFamily: typography.text.fontFamily,
      fontSize: 10,
      marginTop: 0
    },
    message: {
      textAlign: 'center',
      fontSize: 14,
      color: colors.validation,
      fontWeight: 'bold',
      marginTop: 8
    }
  }
};

const theme = {
  colors,
  typography,
  gradients,
  pages,
  components,
  forms
};

export default theme;
