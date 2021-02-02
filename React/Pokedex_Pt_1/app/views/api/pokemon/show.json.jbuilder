json.pokemon do 
  json.set! @poke.id do
    json.partial! 'api/pokemon/poke', poke: @poke
  end

  json.moves do
    @poke.moves.each do |move|
      json.set! move.id do
        json.extract! move, :id, :name
      end
    end
  end

  json.items do 
    @poke.items.each do |item|
      json.set! item.id do
        json.extract! item, :id, :pokemon_id, :name, :price, :happiness
        begin
          json.image_url asset_path("/images/pokemon_snaps/#{item.image_url}")
        rescue
          json.image_url item.image_url
        end
      end
    end

  end
end
