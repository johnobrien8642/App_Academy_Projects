export const fetchAllPokemon = () => {
  return $.ajax({
    method: "GET",
    url: "/api/pokemon"
  })
}

export const fetchSinglePokemon = (id) => {
  return $.ajax({
    method: 'GET',
    url: `/api/pokemon/${id}`
  })
}

export const createPokemon = (pokemon) => {
  return $.ajax({
    method: "POST",
    url: "/api/pokemon/",
    data: { pokemon }
  })
}

export const updatePokemon = (pokemon) => {
  return $.ajax({
    method: "PATCH",
    url: `/api/pokemon/${pokemon.id}`,
    data: { pokemon }
  })
}