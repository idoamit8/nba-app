import { ColorMode, theme as chakraTheme, useColorMode, useToken } from '@chakra-ui/react'
import { useMemo } from 'react'

const gradientColorList = (start: ColorList, end: ColorList): ColorList => {
  return start.map((_, index) => `linear-gradient(90deg, ${start[index]} 0%, ${end[index]} 100%)`) as ColorList
}

export type ColorList = [
  string,
  string, // [color].1
  string, // [color].2
  string, // [color].3
  string, // [color].4
  string, // [color].5
  string, // [color].6
  string, // [color].7
  string, // [color].8
  string, // [color].9
  string, // [color].10
]

const gray: ColorList = [
  '',
  '#F6F8F9', // gray.1
  '#EDF2F7', // gray.2
  '#E2E8F0', // gray.3
  '#CBD5E0', // gray.4
  '#A0AEC0', // gray.5
  '#718096', // gray.6
  '#4A5568', // gray.7
  '#2D3748', // gray.8
  '#1A202C', // gray.9
  '#171923', // gray.10
]
const red: ColorList = [
  '',
  '#FFF6F6', // red.1
  '#FFEDED', // red.2
  '#FDD3D4', // red.3
  '#FCB9B9', // red.4
  '#FA8485', // red.5
  '#F95053', // red.6
  '#E0484B', // red.7
  '#972F2F', // red.8
  '#712323', // red.9
  '#4A1717', // red.10
]
const orange: ColorList = [
  '',
  '#FEF7F3', // orange.1
  '#FCEFE7', // orange.2
  '#F8D8C2', // orange.3
  '#F5C09F', // orange.4
  '#F0925B', // orange.5
  '#EC662C', // orange.6
  '#B74E1F', // orange.7
  '#7A300E', // orange.8
  '#53230B', // orange.9
  '#2C1003', // orange.10
]
const yellow: ColorList = [
  '',
  '#FFF9EC', // yellow.1
  '#FFF2D3', // yellow.2
  '#FFE1A5', // yellow.3
  '#FFCA6D', // yellow.4
  '#FFA630', // yellow.5
  '#FF8700', // yellow.6
  '#E06500', // yellow.7
  '#994004', // yellow.8
  '#4F230A', // yellow.9
  '#291004', // yellow.10
]
const green: ColorList = [
  '',
  '#F1FBF9', // green.1
  '#EAF8F5', // green.2
  '#C9EDE6', // green.3
  '#A9E3D6', // green.4
  '#6ACDB8', // green.5
  '#2FB799', // green.6
  '#20A68A', // green.7
  '#156E5C', // green.8
  '#105345', // green.9
  '#0B372E', // green.10
]
const teal: ColorList = [
  '',
  '#e6fffa', // teal.1
  '#b2f5ea', // teal.2
  '#81e6d9', // teal.3
  '#4fd1c5', // teal.4
  '#38b2ac', // teal.5
  '#319795', // teal.6
  '#2c7a7b', // teal.7
  '#285e61', // teal.8
  '#234e52', // teal.9
  '#234e52', // teal.10
]
const purple: ColorList = [
  '',
  '#F8F8FD', // purple.1
  '#EEEEFD', // purple.2
  '#D6D5FA', // purple.3
  '#BDBBF6', // purple.4
  '#8B89F0', // purple.5
  '#5956E9', // purple.6
  '#504DD2', // purple.7
  '#35348C', // purple.8
  '#282769', // purple.9
  '#1B1A46', // purple.10
]
const violet: ColorList = [
  '',
  '#F9F4FC', // violet.1
  '#F4E8FA', // violet.2
  '#E2C8F3', // violet.3
  '#D2A6EC', // violet.4
  '#B366E0', // violet.5
  '#A03BDE', // violet.6
  '#6E209E', // violet.7
  '#4D1074', // violet.8
  '#340A4C', // violet.9
  '#250538', // violet.10
]
const pink: ColorList = [
  '',
  '#fff5f7', // pink.1
  '#fed7e2', // pink.2
  '#fbb6ce', // pink.3
  '#f687b3', // pink.4
  '#ed64a6', // pink.5
  '#d53f8c', // pink.6
  '#b83280', // pink.7
  '#97266d', // pink.8
  '#702459', // pink.9
  '#702459', // pink.10
]
const blue: ColorList = [
  '',
  '#F6F9FD', // blue.1
  '#ECF4FC', // blue.2
  '#D0E2F7', // blue.3
  '#B3D1F2', // blue.4
  '#7AAEE9', // blue.5
  '#498DDF', // blue.6
  '#3B74B9', // blue.7
  '#1E4980', // blue.8
  '#173961', // blue.9
  '#091829', // blue.10
]
const hotPink: ColorList = [
  '',
  '#FDF3FA', // hotPink.1
  '#FBE7F6', // hotPink.2
  '#F7C4E8', // hotPink.3
  '#F1A3DA', // hotPink.4
  '#E663BF', // hotPink.5
  '#DB23A5', // hotPink.6
  '#C21F93', // hotPink.7
  '#961871', // hotPink.8
  '#66114D', // hotPink.9
  '#3C082C', // hotPink.10
]
const snot: ColorList = [
  '',
  '#FFFFED', // snot.1
  '#FFFBBF', // snot.2
  '#EEE889', // snot.3
  '#E8DF5C', // snot.4
  '#DAD657', // snot.5
  '#C5BE3B', // snot.6
  '#9B973E', // snot.7
  '#615F27', // snot.8
  '#43411A', // snot.9
  '#2E2C11', // snot.10
]
const cyan: ColorList = [
  '',
  '#F2FFFF', // cyan.1
  '#D2FFFF', // cyan.2
  '#C5FFFE', // cyan.3
  '#AAFFFD', // cyan.4
  '#4EF1EA', // cyan.5
  '#19C3BB', // cyan.6
  '#3B9994', // cyan.7
  '#2A736F', // cyan.8
  '#194845', // cyan.9
  '#0E2D2B', // cyan.10
]
const brown: ColorList = [
  '',
  '#F0EEED', // brown.1
  '#ECE5E2', // brown.2
  '#D3C4BD', // brown.3
  '#BCA495', // brown.4
  '#886958', // brown.5
  '#5F331C', // brown.6
  '#4D2917', // brown.7
  '#321B0E', // brown.8
  '#2B180F', // brown.9
  '#1E0E06', // brown.10
]
const tan: ColorList = [
  '',
  '#F6F3EB', // tan.1
  '#F2E9DB', // tan.2
  '#E8DDCE', // tan.3
  '#D4C4AD', // tan.4
  '#BEAB8E', // tan.5
  '#A38A66', // tan.6
  '#88714F', // tan.7
  '#655844', // tan.8
  '#494132', // tan.9
  '#221E16', // tan.10
]

const ai = gradientColorList(hotPink, purple)

const reverseScale = (scale: ColorList): ColorList => {
  const [ignore, ...colors] = scale
  colors.reverse()
  return [ignore, ...colors]
}

export const addAlpha = (color: string, alpha: number): string =>
  `${color}${Math.round(alpha * 2.56)
    .toString(16)
    .padStart(2, '0')}`

const appConnectionsColorsLight: ColorList[] = [pink, snot, cyan, purple, blue, orange, brown]
const appConnectionsColorsDark: ColorList[] = appConnectionsColorsLight.map(reverseScale)

export const lightColors = {
  gray,
  red,
  orange,
  yellow,
  green,
  teal,
  purple,
  pink,
  blue,
  hotPink,
  cyan,
  snot,
  brown,
  tan,
  violet,
  ai,
  appConnectionsColors: appConnectionsColorsLight,
  background: '#fff',
  backdrop: gray[3],
  black: '#000000',
  blackAlpha: chakraTheme.colors.blackAlpha,
  border: gray[2],
  danger: red[3],
  error: red[6],
  muted: gray[6],
  overlay: `${gray[6]}B3`, // 70% opacity
  workspaceOverlay: `${gray[1]}B3`, // 70% opacity
  placeholder: gray[5],
  primary: purple[6],
  textHighlight: purple[2],
  success: green[6],
  text: gray[9],
  textMuted: gray[5],
  tile: gray[1],
  transparent: 'transparent',
  warning: yellow[6],
  white: '#ffffff',
  whiteAlpha: chakraTheme.colors.whiteAlpha,
  sidebar: gray[8],
  filetree: '#FAFBFC',
  activeSearchHighlight: yellow[5],
  searchHighlight: yellow[3],
  sidebarFilter: '#39465A',
  editor: gray[1],
  marketingFrameLogoBackground: gray[8],
  marketingFrameLogoForeground: 'white',
  upgrade: '#dB23a5',
  upgradeHover: '#9E1C78',
  semiTransparentPurple: '#8b89f080',
  transparentRGBA: 'rgba(0, 0, 0, 0)',
  progressBackground: `linear-gradient(270deg, ${purple[6]} 30.79%, ${purple[4]} 85.32%)`,
  progressBackgroundMarketing: gray[2],
  progressBackgroundMarketingFilled: `linear-gradient(90deg, ${hotPink[8]} 5.04%, ${hotPink[6]} 88.23%)`,
  trialEntryPointBackground: gray[9],
  trialEntryPointBorder: gray[7],
  trialEntryPointText: gray[2],
  trialEntryPointDescriptionText: gray[5],
}

export const darkColors = {
  gray: reverseScale(gray),
  red: reverseScale(red),
  orange: reverseScale(orange),
  yellow: reverseScale(yellow),
  green: reverseScale(green),
  teal: reverseScale(teal),
  purple: reverseScale(purple),
  pink: reverseScale(pink),
  blue: reverseScale(blue),
  hotPink: reverseScale(hotPink),
  cyan: reverseScale(cyan),
  snot: reverseScale(snot),
  brown: reverseScale(brown),
  tan: reverseScale(tan),
  violet: reverseScale(violet),
  ai: reverseScale(ai),
  appConnectionsColors: appConnectionsColorsDark,
  background: gray[9],
  backdrop: '#2F3746',
  black: 'white',
  blackAlpha: chakraTheme.colors.blackAlpha,
  border: gray[8],
  danger: red[8],
  error: red[5],
  muted: gray[5],
  overlay: '#07070acc',
  workspaceOverlay: `${gray[10]}B3`, // 70% opacity
  placeholder: gray[6],
  primary: purple[5],
  textHighlight: purple[9],
  success: green[5],
  text: gray[1],
  textMuted: gray[6],
  tile: gray[1],
  transparent: 'transparent',
  warning: yellow[5],
  white: gray[9],
  whiteAlpha: chakraTheme.colors.whiteAlpha,
  sidebar: gray[10],
  filetree: '#212836',
  activeSearchHighlight: yellow[6],
  searchHighlight: yellow[8],
  sidebarFilter: '#212836',
  editor: gray[8],
  marketingFrameLogoBackground: gray[8],
  marketingFrameLogoForeground: 'white',
  upgrade: '#dB23a5',
  upgradeHover: '#9E1C78',
  semiTransparentPurple: 'rgba(139, 137, 240, 0.5)',
  transparentRGBA: 'rgba(0, 0, 0, 0)',
  progressBackground: `linear-gradient(270deg, ${purple[5]} 30.79%, ${purple[7]} 85.32%)`,
  progressBackgroundMarketing: gray[8],
  progressBackgroundMarketingFilled: `linear-gradient(90deg, ${hotPink[6]} 5.04%, ${hotPink[5]} 88.23%)`,
  trialEntryPointBackground: gray[9],
  trialEntryPointBorder: gray[7],
  trialEntryPointText: gray[3],
  trialEntryPointDescriptionText: gray[5],
}

const isColorList = (value: unknown): value is ColorList =>
  Array.isArray(value) && value.every(item => typeof item === 'string')

export const colors = (colorMode: ColorMode): typeof lightColors => {
  const isDark = colorMode === 'dark'
  const result = isDark ? darkColors : lightColors
  // make chakra happy by providing colors in the form of `red.100`
  Object.entries(result).forEach(([colorName, value]) => {
    if (isColorList(value)) {
      // @ts-ignore
      result[colorName] = Object.fromEntries(
        value.map((color, index) => [index, color]).concat(value.map((color, index) => [index * 100, color])),
      )
    }
  })

  return result
}

export type ThemeColors = ReturnType<typeof colors>
export const useColor = (color: string, alpha?: number): string => {
  const colorToken = useToken('colors', color)
  return alpha != null ? addAlpha(colorToken, alpha) : colorToken
}
export const useColors = (): ThemeColors => {
  const { colorMode } = useColorMode()
  return useMemo(() => colors(colorMode), [colorMode])
}
