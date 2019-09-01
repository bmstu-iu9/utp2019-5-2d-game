"use strict"

var cvs=document.getElementById('cvs');

var ctx=cvs.getContext("2d");

var cvswidth=window.innerWidth - 72 ;

var cvsheight=window.innerHeight - 135;

cvs.width=cvswidth;

cvs.height=cvsheight;

cvs.style.backgroundColor="darkgray";

var PI = Math.PI;

//!!!
//прописать получение обьектов
//!!

var rect = [],player,finish;//присвоить  обьекты

var move = {
  w:true,
  s:true,
  a:true,
  d:true
};


document.addEventListener("keydown",function(e){
  var i;
    for(i in rect){
    move.w = move.w && !playerinLine(rect[i], player.x, player.y - 5) && !playerINwall(rect[i],player.x, player.y - 5) && !playerinarc(rect[i], player.x, player.y - 5);
    move.s =move.s && !playerinLine(rect[i], player.x, player.y + 5) && !playerINwall(rect[i],player.x, player.y + 5) && !playerinarc(rect[i], player.x, player.y + 5);
    move.a =move.a && !playerinLine(rect[i], player.x - 5, player.y) && !playerINwall(rect[i],player.x - 5, player.y) && !playerinarc(rect[i], player.x - 5, player.y);
    move.d = move.d && !playerinLine(rect[i], player.x + 5, player.y) && !playerINwall(rect[i],player.x + 5, player.y) && !playerinarc(rect[i], player.x + 5, player.y);
    var key=e.key;
    var i;
    if(key == "w" && move.w){
      player.y -= 5;
    }
    if(key == "s" && move.s){
      player.y += 5;
    }
    if(key == "d" && move.d){
      player.x += 5;
    }
    if(key == "a" && move.a){
      player.x -= 5;
    }
      move.w = true;
      move.s = true;
      move.d = true;
      move.a = true;
  }
});
