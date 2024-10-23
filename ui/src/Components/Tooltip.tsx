import { Tooltip as ChakraTooltip, TooltipProps as ChakraTooltipProps } from '@chakra-ui/react'
import React, { FC, ReactNode } from 'react'
import { containers, corner, spacer, text } from '../style/scales'

const stripNewLineFromTooltip = (node: ReactNode): ReactNode => {
  if (typeof node === 'string') {
    return node.replace(/\n+/g, ' ')
  }
  return node
}

type TooltipPurpose = 'info' | 'ellipsis' | 'why-disabled'

const OPEN_DELAY_BY_PURPOSE: Record<TooltipPurpose, number> = {
  info: 500,
  ellipsis: 1200,
  'why-disabled': 100,
}

type TooltipProps = ChakraTooltipProps & {
  purpose?: TooltipPurpose
}

export const Tooltip: FC<TooltipProps> = ({ children, purpose = 'info', label, ...props }) => (
  <ChakraTooltip
    zIndex="tooltip"
    placement="top"
    borderRadius={corner.smooth}
    maxW={containers.xxl}
    p={spacer.tightest}
    fontSize={text.t3}
    whiteSpace="break-spaces"
    portalProps={{
      appendToParentPortal: false,
    }}
    openDelay={OPEN_DELAY_BY_PURPOSE[purpose]}
    closeDelay={300}
    label={stripNewLineFromTooltip(label)}
    {...props}
  >
    {children}
  </ChakraTooltip>
)
