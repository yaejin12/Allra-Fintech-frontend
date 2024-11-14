import { GetInfiniteQuotes, getInfiniteQuotesSchema } from '@/schemas/quotes'
import { ActionResult } from '../action-result'

export interface GetQuotesProps {
  limit: number
  skip: number
}

export const getQuotes = async ({
  limit,
  skip,
}: GetQuotesProps): Promise<ActionResult<GetInfiniteQuotes>> => {
  try {
    const params = new URLSearchParams({
      limit: limit.toString(),
      skip: skip.toString(),
      select: 'id,quote,author',
    })

    const response = await fetch(
      `https://dummyjson.com/quotes?${params.toString()}`
    )
    if (!response.ok) {
      return {
        status: 'error',
        error: '데이터를 가져오는데 실패했습니다.',
      }
    }

    const result = await response.json()

    const { success, data } = getInfiniteQuotesSchema.safeParse(result)

    if (success) {
      return {
        status: 'success',
        data: data,
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
