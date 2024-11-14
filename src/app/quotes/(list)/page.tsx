'use client'

import { useInfiniteQuotes } from '@/app/quotes/hooks/use-infinite-quotes'
import { QuoteCard } from '@/app/quotes/components/quote-card'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'

import { useRef } from 'react'
import useThrottle from '../hooks/use-throttle'

/**
 *
 * @returns 무한 스크롤로 Quotes 목록을 보여주는 페이지 컴포넌트
 */
export default function QuotesPage() {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useInfiniteQuotes()

  // // Intersection Observer 훅을 사용
  const { ref, inView } = useInView({
    threshold: 0.9,
  })

  const fetchNextPageThrottle = useThrottle(fetchNextPage, 1000)

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPageThrottle()
      console.log('inView', inView)
    }
  }, [inView])

  if (isLoading) {
    return <div>loading</div>
  }
  if (isError) {
    throw new Error(error.message)
  }
  if (!data) {
    return <div>Not found</div>
  }

  return (
    <>
      {data?.pages
        ?.map((page) => page.quotes)
        .flat()
        .map((quote) => {
          return (
            <QuoteCard
              key={quote.id}
              quote={quote.quote}
              author={quote.author}
              isFavorite={false}
              onFavorite={() => {
                console.log('Clicked on favorite')
              }}
            />
          )
        })}
      <div ref={ref} style={{ width: '100%', height: '80px' }}></div>
    </>
  )
}
