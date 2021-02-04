json.extract! poke, :id, :name, :attack, :defense, :poke_type
begin
  json.image_url asset_path("pokemon_snaps/#{poke.image_url}")
rescue
  json.image_url poke.image_url
end

