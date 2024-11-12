'use server'

import {
  GetProductsResponse,
  getProductsResponseSchema,
} from '@/schemas/product'
import { ActionResult } from '@/actions/action-result'

export interface GetProductsProps {
  skip: number
  limit: number
  q?: string
}

export const getProducts = async ({
  skip,
  limit,
  q,
}: GetProductsProps): Promise<ActionResult<GetProductsResponse>> => {
  try {
    const params = new URLSearchParams({
      limit: limit.toString(),
      skip: skip.toString(),
      select: 'id,title,price,rating,stock,tags,discountPercentage,thumbnail',
    })

    if (q) {
      params.append('q', q)
    }
    // 검색어가 있으면 검색 API로, 없으면 일반 상품 목록 API로 요청 URL 설정
    const baseUrl = q
      ? 'https://dummyjson.com/products/search'
      : 'https://dummyjson.com/products'

    const url = `${baseUrl}?${params.toString()}`

    const response = await fetch(url)

    if (!response.ok) {
      return {
        status: 'error',
        error: '데이터를 가져오는데 실패했습니다.',
      }
    }

    const result = await response.json()

    const { success, data } = getProductsResponseSchema.safeParse(result)

    if (success) {
      // 타이틀 기준으로 검색 필터링
      let newData = data
      if (q && data?.products) {
        const filterData = data?.products.filter((product) => {
          return product.title.toLowerCase().includes(q.toLowerCase())
        })
        newData = { ...newData, products: filterData }
      }
      return {
        status: 'success',
        data: newData,
      }
    } else {
      return {
        status: 'error',
        error: '데이터 형식이 올바르지 않습니다.',
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      return {
        status: 'error',
        error: err.message,
      }
    }
    return {
      status: 'error',
      error: '알 수 없는 오류가 발생했습니다.',
    }
  }
}
