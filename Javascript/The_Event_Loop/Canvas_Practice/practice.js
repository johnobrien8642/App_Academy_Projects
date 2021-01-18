document.addEventListener("DOMContentLoaded", function(){

  const canvas = document.getElementById('mycanvas');
  const ctx = canvas.getContext('2d');  

  ctx.fillStyle = '#ba1c1c';
  ctx.fillRect(20, 10, 200, 100);

  
  ctx.beginPath();
  ctx.arc(400, 200, 50, 0, 2*Math.PI);
  ctx.fillStyle = 'orange';
  ctx.fill();
  ctx.lineWidth = 5;
  // ctx.lineWidth(15)
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(400, 450);
  ctx.lineTo(350, 400)
  ctx.lineWith = 5;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(350, 400);
  ctx.lineTo(250, 400)
  ctx.lineWith = 5;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(400, 250);
  ctx.lineTo(350, 250);
  ctx.lineWith = 5;
  ctx.stroke();
});
