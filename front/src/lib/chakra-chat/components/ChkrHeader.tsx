import React from 'react'

import {HStack} from '@chakra-ui/layout'
import {Avatar, BoxProps, Text} from '@chakra-ui/react'

import {HEADER_AVATAR_STYLE, HEADER_CONTAINER_STYLE} from '../defaultStyles'
import {User} from '../types'

export type ChkrHeaderProps = {
  headerText?: string
  recipient?: User
  displayRecipientAvatar?: boolean
  headerStyle?: BoxProps
  leftButton?: React.ReactNode
  rightButton?: React.ReactNode
  headerBody?: React.ReactNode
}

const ChkrHeader: React.FC<ChkrHeaderProps> = ({
  headerText,
  leftButton,
  rightButton,
  recipient,
  headerStyle,
  displayRecipientAvatar = true,
  headerBody,
}) => {
  return (
    <HStack
      left="0"
      top="0"
      zIndex="1000"
      spacing={0}
      justifyContent="space-between"
      position="sticky"
      w="100%"
      alignItems="center"
      {...HEADER_CONTAINER_STYLE}
      {...headerStyle}
    >
      {leftButton}
      {headerBody || (
        <HStack flex="1" justifyContent="flex-start" alignItems="center" px="16px">
          {displayRecipientAvatar && <Avatar src={recipient?.avatar} {...HEADER_AVATAR_STYLE} />}
          <Text variant="paragraphBase" fontWeight="600">{headerText || recipient?.name || ''}</Text>
        </HStack>
      )}
      {rightButton}
    </HStack>
  )
}

export default ChkrHeader
