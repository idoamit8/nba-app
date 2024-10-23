import { ColorMode, extendTheme, SystemStyleObject } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'
import { addAlpha, colors, darkColors, lightColors } from './colors'
import { corner, sizer, spacer, text } from './scales'

const breakpoints = createBreakpoints({
  sm: '1px',
  md: '1px',
  lg: '1px',
  xl: '1px',
})

const FONT_FAMILY_SANS =
  'Galano Grotesque,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'

export const theme = (colorMode: ColorMode): ReturnType<typeof extendTheme> =>
  extendTheme({
    components: {
      // chakra overrides
      CloseButton: {
        baseStyle: (): SystemStyleObject => ({
          borderRadius: corner.pill,
          transition: 'all 200ms',
          color: 'gray.6',
          cursor: 'pointer',
          _hover: {
            color: 'gray.8',
          },
        }),
        sizes: {
          md: {
            fontSize: text.t2,
            w: 'auto',
            h: 'auto',
          },
        },
      },
      Radio: {
        sizes: {
          md: {
            control: { w: sizer.sm, h: sizer.sm },
          },
          lg: {
            control: { w: sizer.md, h: sizer.md },
          },
          sm: {
            control: { width: sizer.xs, height: sizer.xs },
          },
        },
      },
      Progress: {
        baseStyle: {
          track: {
            bg: 'purple.3',
          },
          filledTrack: {
            bg: 'progressBackground',
          },
        },
        variants: {
          marketing: {
            track: {
              bg: 'progressBackgroundMarketing',
            },
            filledTrack: {
              bg: 'progressBackgroundMarketingFilled',
              transition: 'width 1.2s cubic-bezier(.22,0,.27,1.38)',
              backgroundClip: 'padding-box',
            },
          },
        },
      },
      Popover: {
        baseStyle: {
          content: {
            zIndex: 'popover',
            _focus: {
              outline: 'none',
              boxShadow: 'normal',
            },
            padding: spacer.tight,
            boxShadow: 'normal',
            border: '2px solid',
            borderColor: 'border',
            bg: 'background',
          },
          body: {
            padding: '0px',
            fontWeight: 'normal',
            color: 'gray.7',
            fontSize: text.t4,
          },
          arrow: {
            bg: 'background',
          },
        },
      },
      Tooltip: {
        baseStyle: {
          backgroundColor: 'gray.7',
          color: 'white',
          shadow: 'normal',
        },
      },
      Modal: {
        sizes: {
          sm: { dialog: { maxW: 'initial' } },
          md: { dialog: { maxW: 'initial' } },
          lg: { dialog: { maxW: 'initial' } },
        },
      },
    },
    borderWidths: {
      0: '0',
      1: '1px',
      px: '1px',
    },
    breakpoints,
    // @ts-ignore
    colors: colors(colorMode),
    fonts: {
      body: FONT_FAMILY_SANS,
      sans: FONT_FAMILY_SANS,
      heading: FONT_FAMILY_SANS,
      serif: 'Georgia,Cambria,"Times New Roman",Times,serif',
      mono: 'JetBrainsMono,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
    },
    fontWeights: {
      // Uncomment these for more weights
      // thin: '100',
      // extralight: '200',
      // light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      // bold: '700',
      // extrabold: '800',
      // heavy: '900',
    },
    letterSpacings: {
      normal: '0',
    },
    lineHeights: {
      equal: '1',
      base: '1.25',
      spacious: '1.5',
    },
    shadows: {
      tightest: colorMode === 'dark' ? '0px 1px 2px rgba(0, 0, 0, 0.5)' : '0px 1px 2px rgba(0, 0, 0, 0.12)',
      tight: colorMode === 'dark' ? '0px 2px 8px rgba(0, 0, 0, 0.5)' : '0px 2px 8px rgba(0, 0, 0, 0.12)',
      normal: colorMode === 'dark' ? '0px 4px 48px rgba(0, 0, 0, 0.5)' : '0px 4px 48px rgba(0, 0, 0, 0.12)',
      loosest: colorMode === 'dark' ? '0px 8px 88px rgba(0, 0, 0, 0.5)' : '0px 8px 88px rgba(0, 0, 0, 0.12)',
      activeGlow:
        colorMode === 'dark'
          ? `0 0 12px 0 ${addAlpha(darkColors.purple[6], 25)}`
          : `0 0 12px 0 ${addAlpha(lightColors.purple[6], 25)}`,
    },
    zIndices: {
      0: '0',
      10: '10',
      20: '20',
      30: '30',
      40: '40',
      50: '50',
      overlay: '10',
      modal: '20',
      popover: '30',
      skipLink: '40',
      toast: '50',
      tooltip: '60',
      auto: 'auto',
    },
    links: {
      noDecoration: {
        color: 'inherit',
        textDecoration: 'none',
        '&:hover': {
          color: 'inherit',
          textDecoration: 'none',
        },
      },
    },
    styles: {
      global: {
        'html, body': {
          fontFamily: 'body',
          fontWeight: 'normal',
          fontSize: text.t2,
          color: 'text',
        },
        '::-webkit-scrollbar-thumb': {
          bgColor: colorMode === 'light' ? addAlpha(lightColors.gray[7], 15) : addAlpha(darkColors.gray[7], 15),
          borderRadius: '3px',
        },
        '::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '.chakra-portal': {
          position: 'fixed',
        },
        // this hides popper elements whose reference (trigger) is hidden
        '[data-popper-reference-hidden]': {
          opacity: 0,
        },
        // This is a workaround for the Monaco editor hover content,
        // as the component is rendered outside the editor root
        '.monaco-hover-content': {
          fontFamily: 'body',
        },
      },
      a: {
        color: 'primary',
        textDecoration: 'none',
        ':hover': {
          textDecoration: 'underline',
        },
      },
      code: {},
      pre: {},
    },
    transforms: {
      transformOrigin: {
        center: 'center',
        top: 'top',
        'top-right': 'top right',
        right: 'right',
        'bottom-right': 'bottom right',
        bottom: 'bottom',
        'bottom-left': 'bottom left',
        left: 'left',
        'top-left': 'top left',
      },
      translate: {
        0: '0',
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        32: '8rem',
        40: '10rem',
        48: '12rem',
        56: '14rem',
        64: '16rem',
        px: '1px',
        '-full': '-100%',
        '-1/2': '-50%',
        '1/2': '50%',
        full: '100%',
      },
      scale: {
        0: '0',
        50: '.5',
        75: '.75',
        90: '.9',
        95: '.95',
        100: '1',
        105: '1.05',
        110: '1.1',
        125: '1.25',
        150: '1.5',
      },
      rotate: {
        0: '0',
        45: '45deg',
        90: '90deg',
        180: '180deg',
        '-180': '-180deg',
        '-90': '-90deg',
        '-45': '-45deg',
      },
      skew: {
        0: '0',
        3: '3deg',
        6: '6deg',
        12: '12deg',
        '-12': '-12deg',
        '-6': '-6deg',
        '-3': '-3deg',
      },
    },
    transitions: {
      property: {
        none: 'none',
        all: 'all',
        default: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
        colors: 'background-color, border-color, color, fill, stroke',
        opacity: 'opacity',
        shadow: 'box-shadow',
        transform: 'transform',
      },
      timingFunction: {
        linear: 'linear',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      duration: {
        75: '75ms',
        100: '100ms',
        150: '150ms',
        200: '200ms',
        300: '300ms',
        500: '500ms',
        700: '700ms',
        1000: '1000ms',
      },
    },
  })
