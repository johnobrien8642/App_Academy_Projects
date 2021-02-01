export const fetchSearchGiphys = searchTerm => (
  $.ajax({
    method: 'GET',
    url: `http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=Ynii0vpGwFnQNQzH4EIdtK7RRV3GqZn2&limit=2`
  })
)