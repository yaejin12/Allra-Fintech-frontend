'use client'
import {
  updateFavoriteList,
  useGetFavoriteQuotes,
} from '@/app/quotes/hooks/use-favorite-quotes'
import { QuoteCard } from '@/app/quotes/components/quote-card'
import { Quotes } from '@/schemas/quotes'
import { useState } from 'react'
import { isItemFavorite } from '../hooks/use-find-quotes-id'

/**
 *
 * @returns
 */
export default function FavoriteQuotesPage() {
  const favoriteQuotes = useGetFavoriteQuotes()
  const [getFavoritesData, setGetFavoriteData] = useState<Quotes[]>(
    useGetFavoriteQuotes()
  )

  // Favorite 페이지
  const isClickFavorite = (id: number) => {
    // localStorage에 삭제.
    updateFavoriteList(id)
    setGetFavoriteData(useGetFavoriteQuotes())
  }

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
              isFavorite={isItemFavorite(quote.id)}
              onFavorite={() => {
                isClickFavorite(quote.id)
              }}
            />
          ))}
      </ul>
    </div>
  )
}
