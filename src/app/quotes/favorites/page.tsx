'use client'
import { useFavoriteQuotes } from '@/app/quotes/hooks/use-favorite-quotes'
import { QuoteCard } from '@/app/quotes/components/quote-card'
import { Quotes } from '@/schemas/quotes'

export default function FavoriteQuotesPage() {
  const favoriteQuotes = useFavoriteQuotes()
  // Favorite 페이지
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
              isFavorite={true}
              onFavorite={() => {
                console.log('Clicked on favorite')
              }}
            />
          ))}
      </ul>
    </div>
  )
}
