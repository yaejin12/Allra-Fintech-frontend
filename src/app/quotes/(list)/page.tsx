'use client'

import { useInfiniteQuotes } from '@/app/quotes/hooks/use-infinite-quotes'
import { QuoteCard } from '@/app/quotes/components/quote-card'
import { useInView } from 'react-intersection-observer'
import { use, useEffect, useState } from 'react'
import useThrottle from '../hooks/use-throttle'
import { Quotes } from '@/schemas/quotes'
import { updateFavoriteList } from '../hooks/use-favorite-quotes'
import { useGetFavoriteQuotes } from '../hooks/use-favorite-quotes'

/**
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

  // Quotes fetch 상태 관리 : 구조가 복잡해서 가독성과 재사용성이 용의하게 상태관리
  const [quotesData, setQuotesData] = useState<Quotes[]>([])

  const [getFavoritesData, setGetFavoriteData] = useState<Quotes[]>(
    useGetFavoriteQuotes()
  )

  // // Intersection Observer 훅을 사용
  const { ref, inView } = useInView({
    threshold: 0.9,
  })

  // fetch Throttle로 중복 호출 제한
  const fetchNextPageThrottle = useThrottle(fetchNextPage, 500)

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPageThrottle()
    }
  }, [inView])

  // data가 변경될때 quotesData 상태에 저장
  useEffect(() => {
    data && setQuotesData(data?.pages.map((page) => page.quotes).flat())
  }, [data])

  // ===== Favorite 클릭 이벤트 =====
  const isClickFavorite = (id: number) => {
    // localStorage에 저장 삭제.
    updateFavoriteList(id, quotesData)
    setGetFavoriteData(useGetFavoriteQuotes())
  }

  const isItemFavorite = (id: number) => {
    return (
      getFavoritesData &&
      getFavoritesData.map((favorite: Quotes) => favorite.id).includes(id)
    )
  }

  // ===== 화면 랜더링 =====
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
      {quotesData.map((quote) => {
        return (
          <QuoteCard
            key={quote.id}
            quote={quote.quote}
            author={quote.author}
            isFavorite={isItemFavorite(quote.id)}
            onFavorite={() => {
              isClickFavorite(quote.id)
            }}
          />
        )
      })}
      <div ref={ref} style={{ width: '100%', height: '80px' }}></div>
    </>
  )
}
