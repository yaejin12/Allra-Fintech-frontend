import { getQuotes } from '@/actions/get-quotes/GetQuotes'
import { useInfiniteQuery } from '@tanstack/react-query'

export interface propsProps {
  limit: number
  skip: number
}

/**
 *
 * @returns useInfiniteQuery 훅을 통해 무한 스크롤로 quotes 데이터 get
 */
export const useInfiniteQuotes = () => {
  return useInfiniteQuery({
    queryKey: ['infiniteQuotes'],
    queryFn: async ({ pageParam }) => {
      const res = await getQuotes({
        limit: 20,
        skip: 20 * (pageParam - 1),
      })
      if (res.status === 'error') {
        throw new Error(res.error)
      }
      return {
        ...res.data,
      }
    },

    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const last =
        lastPage.total - lastPage.limit === lastPage.skip ||
        lastPage.quotes.length === 0

      return last ? undefined : allPages.length + 1
    },
  })
}
