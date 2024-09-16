'use client'

import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'

export interface InfiniteScrollProps {
  offset?: number
  children: ReactNode
  action: () => void
  disable?: boolean
}

const isElementVisible = <Element extends HTMLElement>(element: Element | null) => {
  if (element) {
    const rect = element.getBoundingClientRect()
    const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight)
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0)
  }
}

export const InfiniteScroll = ({ offset = -50, children, action, disable }: InfiniteScrollProps) => {
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const checkElementVisible = useCallback(() => {
    if (isElementVisible(ref.current)) {
      action()
    }
  }, [action])

  useEffect(() => {
    if (!disable) {
      window.addEventListener('resize', checkElementVisible)
      window.addEventListener('scroll', checkElementVisible)
    }
    return () => {
      window.removeEventListener('resize', checkElementVisible)
      window.removeEventListener('scroll', checkElementVisible)
    }
  }, [checkElementVisible, disable])

  useEffect(() => {
    if (!mounted && !disable) {
      checkElementVisible()
      setMounted(true)
    }
  }, [checkElementVisible, disable, mounted])

  return (
    <>
      {children}
      <div ref={ref} style={{ position: 'relative', top: offset, zIndex: -1 }} data-testid="InfiniteScroll:Detector" />
    </>
  )
}
