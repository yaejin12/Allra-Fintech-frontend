export const useFavoriteQuotes = () => {
  const getItemFavoriteQuotes = localStorage.getItem('favoriteQuotes')
  if (getItemFavoriteQuotes) {
    return JSON.parse(getItemFavoriteQuotes)
  }

  return undefined
}
