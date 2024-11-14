'use client'

import {
  getInfiniteQuotes,
  useInfiniteQuotes,
} from '@/app/quotes/hooks/use-infinite-quotes'
import { QuoteCard } from '@/app/quotes/components/quote-card'
import { error } from 'console'

//list 페이지
export default function QuotesPage() {
  const quotes = getInfiniteQuotes()
  const { data, isLoading, isError, error } = useInfiniteQuotes()
  console.log('data', data)

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
      {data?.quotes.map((quote) => (
        <QuoteCard
          key={quote.id}
          quote={quote.quote}
          author={quote.author}
          isFavorite={false}
          onFavorite={() => {
            console.log('Clicked on favorite')
          }}
        />
      ))}
    </>
  )
}
