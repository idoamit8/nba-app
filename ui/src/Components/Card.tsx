import { Box, BoxProps as ChakraBoxProps } from '@chakra-ui/react'
import React, { forwardRef } from 'react'
import { corner, spacer } from '../style/scales'
import { Intent } from '../style/types'

type CardIntent = Intent | 'neutral'

export type CardProps = {
  intent?: CardIntent
  disabled?: boolean
} & ChakraBoxProps

const intentColor: Record<CardIntent, string> = {
  neutral: 'transparent',
  action: 'purple',
  confirm: 'green',
  warning: 'yellow',
  danger: 'red',
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, intent = 'neutral', disabled = false, ...props }, ref) => {
    const baseColor = disabled ? 'gray' : intentColor[intent]
    let borderColor: string
    if (disabled) {
      borderColor = `${baseColor}.3`
    } else {
      borderColor = intent === 'neutral' ? (borderColor = 'gray.3') : `${baseColor}.6`
    }
    const patternStyles = {
      bg: `${baseColor}.1`,
      color: intent === 'neutral' ? undefined : `${baseColor}.6`,
      borderColor,
    }

    return (
      <Box
        ref={ref}
        borderRadius={corner.smooth}
        border="1px solid"
        bgColor="white"
        p={spacer.tight}
        sx={{
          '&:not(:last-of-type)': {
            mb: spacer.tighter,
          },
        }}
        {...patternStyles}
        {...props}
      >
        {children}
      </Box>
    )
  },
)
