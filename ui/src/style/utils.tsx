import { SystemStyleObject } from '@chakra-ui/react'

export const onHoverStyle = (containerClassName: string): SystemStyleObject => ({
  visibility: 'hidden',
  [`.${containerClassName}:hover &`]: {
    visibility: 'visible',
  },
})
