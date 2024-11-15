import { Quotes } from '@/schemas/quotes'
import { useFavoriteQuotes } from './use-favorite-quotes'

/**
 * 특정 ID를 가진 데이터를 찾아주는 함수입니다.
 * @param data 검색할 대상이 되는 Quotes 배열
 * @param id 찾고자 하는 아이디 값
 * @returns
 * isFindQuotesId: 아이디가 있는지 여부를 나타내는 Boolean 값
 * findData: 아이디에 해당하는 Quotes 객체 (없으면 undefined)
 */
export function useFindQuotesId(data: Quotes[], id: number) {
  const findData = data?.find((quote) => quote.id === id)
  const isFindQuotesId = Boolean(findData)

  return { isFindQuotesId, findData }
}

/**
 * 클릭한 아이디를 기준으로 favorite 리스트를 localStorage에 저장 삭제.
 * @param id : 클릭한 아이디 값
 * @param quotesData : 현재 렌더링된 quotes 리스트
 * @returns
 */

export function updateFavoriteList(id: number, quotesData?: Quotes[]) {
  const favoriteQuotes = useFavoriteQuotes()

  // 1. 클릭한 아이디가 `favoriteQuotes`에 있는지 확인
  const { isFindQuotesId, findData } = useFindQuotesId(favoriteQuotes, id)

  // 2. 동일한 아이디가 존재하면 `favoriteQuotes`에서 제거
  if (isFindQuotesId) {
    const removeFavoriteQuotes = favoriteQuotes.filter(
      (quote: Quotes) => quote.id !== findData!.id
    )

    localStorage.setItem('favoriteQuotes', JSON.stringify(removeFavoriteQuotes))
  } else {
    // 3. 아이디가 존재하지 않는 경우 처리

    if (quotesData) {
      // 클릭한 아이디의 데이터를 검색
      const { findData } = useFindQuotesId(quotesData, id)

      // 기존 favoriteQuotes가 있을 경우
      if (favoriteQuotes) {
        localStorage.setItem(
          'favoriteQuotes',
          JSON.stringify([...favoriteQuotes, findData])
        )
      } else {
        // favoriteQuotes가 없을 경우
        localStorage.setItem('favoriteQuotes', JSON.stringify([findData]))
      }
    }
  }
}
