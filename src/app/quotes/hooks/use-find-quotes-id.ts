import { Quotes } from '@/schemas/quotes'

function useFindQuotesId(data: Quotes[], id: number) {
  return data.find((quote) => quote.id === id)
}

export default useFindQuotesId
