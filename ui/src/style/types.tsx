export type Size = 'md' | 'xl' | 'lg' | 'sm'
export type ContainerSize = Size | 'xs'
export type PanelSize = 'xs' | 'sm' | 'md'
export type Pattern = 'primary' | 'secondary' | 'tertiary'
export type Intent = 'action' | 'confirm' | 'danger' | 'warning'
export type ButtonIntent = Intent | 'marketing' | 'neutral' | 'ai' | 'edit'

export const smaller: Record<Size, Size> = {
  lg: 'md',
  md: 'sm',
  sm: 'sm',
  xl: 'lg',
}
