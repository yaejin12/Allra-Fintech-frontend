import { getQuotes } from '@/actions/get-quotes/GetQuotes'
import { useQuery } from '@tanstack/react-query'

export const getInfiniteQuotes = () => {
  return [
    {
      id: 1,
      quote:
        'Your heart is the size of an ocean. Go find yourself in its hidden depths.',
      author: 'Rumi',
    },
  ]
}

export const useInfiniteQuotes = () => {
  const props = {
    limit: 15,
    skip: 15,
  }

  return useQuery({
    queryKey: ['infiniteQuotes', { ...props }],
    queryFn: async () => {
      const res = await getQuotes(props)
      if (res.status === 'error') {
        throw new Error(res.error)
      }
      return {
        ...res.data,
      }
    },
  })
}
