import { Quotes } from '@/schemas/quotes'
import { updateFavoriteList, useGetFavoriteQuotes } from './use-favorite-quotes'

/**
 * 특정 ID를 가진 데이터를 찾아주는 함수입니다.
 * @param data 검색할 대상이 되는 Quotes 배열
 * @param id 찾고자 하는 아이디 값
 * @returns
 * isFindQuotesId: 아이디가 있는지 여부를 나타내는 Boolean 값
 * findData: 아이디에 해당하는 Quotes 객체 (없으면 undefined)
 *
 */
export function useFindQuotesId(data: Quotes[], id: number) {
  const findData = data?.find((quote) => quote.id === id)
  const isFindQuotesId = Boolean(findData)

  return { isFindQuotesId, findData }
}

/**
 * 특정 ID가 localStorage에 저장 되어있는지 유무 확인
 * @param id 찾고자 하는 아이디 값
 * @returns 
 */
export const isItemFavorite = (id: number) => {
  const getFavoritesData = useGetFavoriteQuotes()
  return (
    getFavoritesData &&
    getFavoritesData.map((favorite: Quotes) => favorite.id).includes(id)
  )
}
