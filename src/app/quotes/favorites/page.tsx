'use client'
import {
  updateFavoriteList,
  useGetFavoriteQuotes,
} from '@/app/quotes/hooks/use-favorite-quotes'
import { QuoteCard } from '@/app/quotes/components/quote-card'
import { Quotes } from '@/schemas/quotes'
import { useEffect, useState } from 'react'
import { isFavorite } from '../hooks/use-find-quotes-id'

/**
 *
 * @returns
 */
export default function FavoriteQuotesPage() {
  const favoriteQuotes = useGetFavoriteQuotes()
  const [getFavoritesData, setGetFavoriteData] = useState<Quotes[]>([])

  // Favorite 페이지 즐겨찾기 클릭 이벤트
  const isClickFavoriteHandler = (id: number) => {
    // localStorage에 삭제.
    updateFavoriteList(id, getFavoritesData)
    setGetFavoriteData(useGetFavoriteQuotes())
  }

  // 초기 FavoriteData 담기
  useEffect(() => {
    setGetFavoriteData(useGetFavoriteQuotes())
  }, [])

  return (
    <div>
      <h1
        className={'mb-4 text-3xl font-bold italic text-secondary-foreground'}
      >
        My Favorite
      </h1>
      <ul>
        {favoriteQuotes &&
          favoriteQuotes.map((quote: Quotes) => (
            <QuoteCard
              key={quote.id}
              quote={quote.quote}
              author={quote.author}
              isFavorite={isFavorite(quote.id, getFavoritesData)}
              onFavorite={() => {
                isClickFavoriteHandler(quote.id)
              }}
            />
          ))}
      </ul>
    </div>
  )
}
