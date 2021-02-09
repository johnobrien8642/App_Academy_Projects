@benches.each do |bench|
  json.set! bench.id do 
    json.id bench.id
    json.description bench.description
    json.lat bench.lat
    json.lng bench.lng
    json.seating bench.seating
    json.picture_url bench.picture_url || url_for(bench.photo) || null
  end
end