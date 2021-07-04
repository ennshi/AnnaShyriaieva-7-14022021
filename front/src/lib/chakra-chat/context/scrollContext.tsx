import React, { useContext, useEffect, useRef, useState } from 'react'

import { IMessage } from '../types'

type ScrollContextType = {
  onScrollToStart: ()=> void
  onScrollForFewPixels: (px: number)=> void
}

type ScrollProviderType = {
  messages: IMessage[] | undefined
  refContainer?: React.RefObject<HTMLDivElement>
  inverted?: boolean
}

// @ts-ignore
const ScrollContext = React.createContext<ScrollContextType>({})

export const ScrollContextProvider: React.FC<ScrollProviderType> = ({ messages, refContainer, inverted, children }) => {
  const [shouldScrollToStart, setShouldScrollToStart] = useState(true)
  const prevScrollToTop = useRef<number | undefined>()

  useEffect(() => {
    if (!shouldScrollToStart) return
    onScrollToStart()
  }, [messages, shouldScrollToStart])

  const stopAutoScrollToStart = () => {
    // no auto-scroll to start if scrolled to fetch more items (detect the direction of scroll in case of inverted caht or no)
    return (inverted
      ? (prevScrollToTop?.current! < refContainer?.current?.scrollTop!)
      : (prevScrollToTop?.current! > refContainer?.current?.scrollTop!)
    )
  }

  const startAutoScrollToStart = () => {
    return (inverted
      ? (refContainer?.current?.scrollTop === 0)
      : (refContainer?.current?.scrollTop! === refContainer?.current?.scrollHeight! - refContainer?.current?.offsetHeight!)
    )
  }

  const onScroll = () => {
    if (!refContainer?.current) return
    if (startAutoScrollToStart())
      return setShouldScrollToStart(true)
    if (prevScrollToTop.current) {
      if (stopAutoScrollToStart() && shouldScrollToStart)
        setShouldScrollToStart(false)
    } else {
      prevScrollToTop.current = refContainer.current.scrollTop
    }
  }

  useEffect(() => {
    if (!refContainer?.current) return
    refContainer.current.addEventListener('scroll', onScroll)
    return () => refContainer?.current?.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToBottom = () => {
    if ((refContainer?.current
      && (refContainer.current.scrollHeight > (refContainer.current.scrollTop + refContainer.current.offsetHeight))))
      refContainer.current.scrollTop = refContainer.current.scrollHeight - refContainer.current.offsetHeight
  }

  const scrollToTop = () => {
    if ((refContainer?.current && (refContainer.current.scrollTop !== 0)))
      refContainer.current.scrollTop = 0
  }

  const onScrollToStart = () => {
    setShouldScrollToStart(true)
    if (inverted)
      return scrollToTop()

    return scrollToBottom()
  }

  const onScrollForFewPixels = (px: number) => {
    // scroll on the resizing textarea
    if (refContainer?.current) {
      if (shouldScrollToStart)
        setTimeout(onScrollToStart, 50)

      refContainer.current.scrollTop += px
    }
  }

  return (
    <ScrollContext.Provider
      value={{ onScrollToStart, onScrollForFewPixels }}
    >
      {children}
    </ScrollContext.Provider>
  )
}

export const useScroll = () => {
  const { onScrollToStart, onScrollForFewPixels } = useContext<ScrollContextType>(ScrollContext)

  return { onScrollToStart, onScrollForFewPixels }
}
