console.log("Hello from the JavaScript console!");

// Your AJAX request here

// Add another console log here, outside your AJAX request

$.ajax({
  method: "POST",
  url: "http://api.openweathermap.org/data/2.5/weather?q=new%20york,US&appid=bcb83c4b54aee8418983c2aff3073b3b",
  success: function(weather){
    console.log(weather)
  }
});

console.log('Outside of the Ajax request')
