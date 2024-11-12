import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'

// 상품 검색 및 페이지 상태 관리
export const useProductsSearchParams = () => {
  // 페이지 상태 관리
  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions({
      history: 'push',
    })
  )

  // 검색어 상태관리
  const [q, setQ] = useQueryState(
    'q',
    parseAsString.withDefault('').withOptions({
      history: 'push',
    })
  )

  const handleTermChange = async (term: string) => {
    if (q === term) return
    await setPage(1)
    await setQ(term)
  }

  return {
    page,
    setPage,
    term: q,
    handleTermChange,
  }
}
