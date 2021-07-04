import moment from 'moment'
import React, {useEffect, useRef, useState} from 'react'

import {BoxProps, Button, Icon, IconButton, Text, TextProps} from '@chakra-ui/react'

import ChkrBubble, {ChkrBubbleProps} from '../components/ChkrBubble'
import ChkrChat from '../components/ChkrChat'
import ChkrHeader, {ChkrHeaderProps} from '../components/ChkrHeader'
import {IMessage} from '../types'
import DEFAULT_MESSAGES from './messages'
import {RiSendPlaneFill} from 'react-icons/ri'

type CustomMessage = IMessage & {isCustom?: boolean}

const TestChat: React.FC<BoxProps> = props => {
  const [messages, setMessages] = useState<CustomMessage[]>([])
  const [newMessage, setNewMessage] = useState<CustomMessage>()

  const [hasNextPage, setHasNextPage] = useState(true)
  const [loading, setLoading] = useState(false)
  const cancelFetch = useRef(false)
  const page = useRef(0)
  const limitItems = 5

  useEffect(() => {
    if (newMessage?.text)
      setMessages(prevState => (prevState.length ? [...prevState, newMessage] : [newMessage]))
  }, [newMessage?.createdAt])

  const getItems = async () => {
    return new Promise<CustomMessage[]>(res => {
      setTimeout(() => {
        const newMessages = [...DEFAULT_MESSAGES].sort((a, b) => b._id - a._id).slice(page.current * limitItems, (page.current + 1) * limitItems)
        console.log(page.current, newMessages, messages)
        res(newMessages)
      }, 2000)
    })
  }

  const handleLoadMoreItems = async () => {
    setLoading(true)
    const loadedMessages: CustomMessage[] = await getItems()
    if (!cancelFetch.current) {
      setLoading(false)
      page.current += 1
      if (loadedMessages.length < limitItems)
        setHasNextPage(false)
      if (messages) {
        return setMessages(prevState => (prevState?.length
          ? [...loadedMessages.sort((a: any, b: any) => a._id - b._id), ...prevState]
          : [...loadedMessages.sort((a: any, b: any) => a._id - b._id)]))
      }
    }
    setHasNextPage(false)
  }

  const onSend = (message: string) => {
    const newMessage: CustomMessage = {
      _id: Math.random() * 10000,
      createdAt: moment().toISOString(),
      text: message,
      user: {
        _id: 1,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    }
    setNewMessage(newMessage)
  }

  const renderHeader = (props: ChkrHeaderProps) => {
    return (
      <ChkrHeader
        recipient={{
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        }}
        leftButton={(
          <IconButton
            aria-label="back button"
            bg="transparent"
            iconColor="blue"
            onClick={() => console.log('GO BACK')}
          ><Icon icon="arrow-back" />
          </IconButton>
        )}
        rightButton={(
          <Button
            size="small"
            bg="transparent"
            text="Annuler la mission"
            onClick={() => console.log('CANCEL MISSION')}
          />
        )}
      />
    )
  }

  const renderBubble = (props: ChkrBubbleProps<CustomMessage>) => {
    const {currentMessage} = props

    const {isCustom} = currentMessage!

    if (isCustom) {
      const renderInnerText = (text: string): React.ReactNode => {
        const innerText = JSON.parse(text)
        return innerText.map((part: [text: string, style: TextProps], i: number) => (
          <Text key={i} {...part[1]}>{part[0]}</Text>
        ))
      }
      return <ChkrBubble renderInnerText={renderInnerText} {...props} />
    }

    return <ChkrBubble {...props} />
  }

  return (
    <ChkrChat
      dateFormat='ddd D MMMM, HH:mm'
      user={{
        _id: 1,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      }}
      messages={messages}
      onSend={onSend}
      onLoadEarlier={handleLoadMoreItems}
      hasNextPage={hasNextPage}
      loading={loading}
      sendButton={(
        <IconButton
          aria-label="send"
          bg="blue"
          borderRadius="none"
          width={30}
          icon={<RiSendPlaneFill />}
        />
      )}
      renderHeader={renderHeader}
      renderBubble={renderBubble}
      // renderAvatar={props => <Avatar name="A A"/>}
      {...props}
    />
  )
}

export default TestChat
