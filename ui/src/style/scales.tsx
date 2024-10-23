import { ContainerSize, PanelSize } from './types'

export const sub = (val1: string | string[], val2: string | string[]): string[] => {
  const values1 = (Array.isArray(val1) ? val1 : [val1]).map(d => parseInt(d, 10))
  const values2 = (Array.isArray(val2) ? val2 : [val2]).map(d => parseInt(d, 10))

  return values1.map((v1, idx) => `${v1 - values2[idx]}px`)
}
export const add = (...vals: (string[] | string)[]): string[] => {
  const values = vals.map(val => (Array.isArray(val) ? val : [val]).map(d => parseInt(d, 10)))

  // Flipping rows & columns
  const transposedValues = values[0].map((_, colIndex) => values.map(row => row[colIndex]))

  // Sums each row & formats to px
  return transposedValues.map(valuesToSum => `${valuesToSum.reduce((val1, val2) => val1 + val2)}px`)
}

export const spacer = {
  flush: '0px',
  tinier: '2px',
  tiny: '4px',
  tightest: '8px',
  tighter: '12px',
  tight: '16px',
  normal: '24px',
  loose: '32px',
  looser: '48px',
  loosest: '64px',
} as const

export const heading = {
  h4: '24px',
  h3: '32px',
  h2: '40px',
  h1: '48px',
} as const

export const text = {
  t4: '12px',
  t3: '14px',
  t2: '16px',
  t1: '20px',
} as const

export const corner = {
  edge: '0px',
  icon: '4px',
  smooth: '6px',
  smoother: '10px',
  smoothest: '16px',
  pill: '9999px',
} as const

export const sizer = {
  tiny: '8px',
  '3xs': '10px',
  '2xs': '12px',
  xs: '14px',
  sm: '16px',
  md: '20px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '96px',
  '5xl': '128px',
  '6xl': '192px',
  '7xl': '224px',
} as const

export const panelSize: Record<PanelSize, string> = {
  xs: '284px',
  sm: '304px',
  md: '320px',
} as const

export const buttonSize: Record<ContainerSize, string> = {
  xs: '20px',
  sm: '24px',
  md: '30px',
  lg: '34px',
  xl: '38px',
} as const

export const containers: Record<ContainerSize, string> & { xxl: string; max: string } = {
  xs: '320px',
  sm: '384px',
  md: '512px',
  lg: '640px',
  xl: '768px',
  xxl: '1024px',
  max: '1280px',
} as const
