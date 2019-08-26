"use strict"
var canvaswidth=500;
var canvasheight=500;
var cvs=document.getElementById('cvs');
var ctx=cvs.getContext("2d");
cvs.width=canvaswidth;
cvs.height=canvasheight;
cvs.style.backgroundColor="gray";
ctx.fillStyle="black";
var pi = Math.PI;
var mouse ={
  x: 0,
  y: 0,
  click: false
};
var playerxstartpoint=10;
var playerystartpoint=10;
var player = {
  x:playerxstartpoint,
  y:playerystartpoint
};

document.addEventListener("keydown",function(e){
  var key=e.key;
  var i;
  /*if(kode="space")
  {
    for(i=0;i<del[indexD-1];i++)
    {
      ctx.fillRect(rect[i].x,rect[i].y,5,5);
    }
  }*/
  if(key=="w")
  {
    player.y-=10;
  }
  if(key=="s")
  {
    player.y+=10;
  }
  if(key=="d")
  {
    player.x+=10;
  }
  if(key=="a")
  {
    player.x-=10;
  }
  if(key=="r")
  {
    player.x=playerxstartpoint
    player.y=playerystartpoint
  }
  if(key=="m")
  {
    var newx = prompt("New X start position:","x");
    var newy = prompt("New Y start position:","y");
    playerxstartpoint = newx;
    playerystartpoint = newy;
    alert("New starting position is:  " + newx + " ; " + newy);
  }
  if(key=="c")
  {
    rect = [] , index=0;
  }
});

var Wall =function (x,y){
  this.x=x;
  this.y=y;
};

var playerINwall = function(rect)
{
  return player.x > rect.x && player.x < rect.x+5 && player.y > rect.y && player.y < rect.y+5;
};


var rect = [] , index=0;
var del = [],indexD = 0, i;
setInterval(function() {
  ctx.clearRect(0,0,500,500);
  for(i in rect){
    ctx.beginPath();
    ctx.arc(rect[i].x,rect[i].y,3,0,2*pi,false);
    ctx.fill();
    if(playerINwall(rect[i]))
    {
      alert("You Lost");
      player.x=playerxstartpoint;
      player.y=playerystartpoint;
    }
  };
  ctx.beginPath();
  ctx.arc(player.x+5,player.y+5,5,0,2*pi,false);
  ctx.fill();
},0.001);



window.onmousemove = function(e){
  mouse.x=e.pageX-5;
  mouse.y=e.pageY-5;
  if(mouse.click)
  {
   ctx.arc(mouse.x,mouse.y,5,0,2* pi);
    rect.push(new Wall(mouse.x,mouse.y));
    index++;
  }
};

window.onmousedown = function(){
  ctx.arc(mouse.x, mouse.y , 5, 0, 2*pi,false);
  mouse.click=true;
};

window.onmouseup = function(){
  mouse.click=false;
};
