import { Quotes } from '@/schemas/quotes'
import { useFindQuotesId } from './use-find-quotes-id'


/**
 * 
 * @returns localStorage에 저장된 정보 불러오기
 */
export const useGetFavoriteQuotes = () => {
  const getItemFavoriteQuotes = localStorage.getItem('favoriteQuotes')
  if (getItemFavoriteQuotes) {
    return JSON.parse(getItemFavoriteQuotes)
  }

  return undefined
}

/**
 * 클릭한 아이디를 기준으로 favorite 리스트를 localStorage에 저장 삭제.
 * @param id : 클릭한 아이디 값
 * @param quotesData : 현재 렌더링된 quotes 리스트
 * @returns
 */

export function updateFavoriteList(id: number, quotesData?: Quotes[]) {
  const favoriteQuotes = useGetFavoriteQuotes()

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
