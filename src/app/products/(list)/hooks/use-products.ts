import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/actions/get-products'
import { useProductsSearchParams } from '@/app/products/(list)/hooks/use-products-search-params'

export const useProducts = () => {
  const { page, term } = useProductsSearchParams()

  // API 요청에 필요한 파라미터들을 설정
  const props = {
    limit: 24,
    skip: 24 * (page - 1),
    q: term ?? '', // 검색어, 없으면 빈 문자열로 설정
  }

  // useQuery 훅을 사용해서 데이터를 가져옴
  return useQuery({
    queryKey: ['products', { ...props }],
    queryFn: async () => {
      const res = await getProducts(props)
      if (res.status === 'error') {
        throw new Error(res.error)
      }
      return {
        ...res.data,
        totalPage: Math.floor(res.data.total / 24) + 1,
      }
    },
  })
}
