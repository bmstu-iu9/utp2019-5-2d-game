"use strict"
var cvs=document.getElementById('cvs');
var ctx=cvs.getContext("2d");
var cvswidth=window.innerWidth - 72 ;
var cvsheight=window.innerHeight - 135;
cvs.width=cvswidth;
cvs.height=cvsheight;
cvs.style.backgroundColor="darkgray";

var PI = Math.PI;
var grid = [];
var Mycolor="black";
document.getElementById("color").oninput= function(){
  Mycolor = this.value
};

var res = (screen.width/1920);

var Wall = function(x0,y0,x1,y1,R,color,type){
  this.x0 = x0,
  this.y0 = y0,
  this.x1 = x1,
  this.y1 = y1,
  this.R=R,
  this.type=type,
  this.color=color
};


var move = {
  w:true,
  s:true,
  a:true,
  d:true
};


var Grid = function(x0,y0,x1,y1){
  this.x0 = x0,
  this.y0 = y0,
  this.x1 = x1,
  this.y1 = y1
};

//var fs = require('fs');


document.addEventListener("keydown",function(e){
  var i;
  for(i in rect){
    move.w = move.w && !playerinLine(rect[i], player.x, player.y - 5) && !playerINwall(rect[i],player.x, player.y - 5) && !playerinarc(rect[i], player.x, player.y - 5);
    move.s =move.s && !playerinLine(rect[i], player.x, player.y + 5) && !playerINwall(rect[i],player.x, player.y + 5) && !playerinarc(rect[i], player.x, player.y + 5);
    move.a =move.a && !playerinLine(rect[i], player.x - 5, player.y) && !playerINwall(rect[i],player.x - 5, player.y) && !playerinarc(rect[i], player.x - 5, player.y);
    move.d = move.d && !playerinLine(rect[i], player.x + 5, player.y) && !playerINwall(rect[i],player.x + 5, player.y) && !playerinarc(rect[i], player.x + 5, player.y);
  };
  var key=e.key;
  var i;
  if(key == "w" && move.w)
  {
    player.y -= 5;
  }
  if(key == "s" && move.s)
  {
    player.y += 5;
  }
  if(key == "d" && move.d)
  {
    player.x += 5;
  }
  if(key == "a" && move.a)
  {
    player.x -= 5;
  }
    move.w = true;
    move.s = true;
    move.d = true;
    move.a = true;
});





document.getElementById("draw").onclick = function(){
  cursor.draw=true;
  cursor.rect=false;
  cursor.line=false;
  cursor.arc=false;
  cursor.reset=false;
  cursor.load=false;
};

document.getElementById("line").onclick = function(){
  cursor.draw=false;
  cursor.rect=false;
  cursor.line=true;
  cursor.arc=false;
  cursor.reset=false;
  cursor.load=false;
};

document.getElementById("rect").onclick = function(){
  cursor.draw=false;
  cursor.rect=true;
  cursor.line=false;
  cursor.arc=false;
  cursor.reset=false;
  cursor.load=false;
};

document.getElementById("arc").onclick = function(){
  cursor.draw=false;
  cursor.rect=false;
  cursor.line=false;
  cursor.arc=true;
  cursor.reset=false;
  cursor.load=false;
};

document.getElementById("back").onclick = function(){
if(rect.length){
    var a =rect[rect.length-1];
    var i,j;
    if(a.type==1 || a.type == 2){
      i=count.pop();
      for(j=0;j<i;j++){
        rect.pop();
      };
    }
    else {
      rect.pop();
    };
  };
};

/*document.getElementById("save").onclick = function(){

  var save = {
    json_rect:rect,
    json_player:player,
    json_finish:finish
  };

  var json = JSON.stringify(save);

  fs.writeFile('A:/js/save_maps/test.json',json,'utf8',(err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
};*/

var c = 0;//для сеточки жирной и не очень(5:55 утра,помогите)

document.getElementById("grid").onclick = function(){
  var i;
  c++;
  var a=cvswidth/50;// внизу смотри
  var b = cvsheight/50;//!!!!!!!!!!!!!!!!!!!!понять пропорции
  for(i=0;i<cvswidth;i+=b){
    grid.push( new Grid(i,0,i,cvsheight) );
  };

  for(i=0;i<cvsheight;i+=a){
    grid.push( new Grid(0,i,cvswidth,i) );
  };
  if(c == 3){
    grid = [];
    c = 0;
  };

};//по просьбе вероники добавляем сетку


var mouse = {
  x: 0,
  y: 0,
  click: false,
};

var cursor = {
  draw:false,
  line:false,
  rect:false,
  arc:false,
  reset:false,
  confrim:false,
  eraser:false
};



var player = {
  x:12*res,
  y:12*res
};



var finish = {
  x:cvswidth-12*res,
  y:cvsheight-12*res
};



var rect = [], i,j,radius = 3,index=0,start=true,fin=false;

var cursorinplayer = function(){
  return Math.sqrt(Math.pow(mouse.x-player.x,2) + Math.pow(mouse.y-player.y,2))<10;
};

var cursorinfinish = function(){
  return Math.sqrt(Math.pow(mouse.x-finish.x,2) + Math.pow(mouse.y-finish.y,2))<10;
};

var player_in_start = function(){
   return player.x>=0 && player.x<=25 && player.y>=0 && player.y<=25;
 };//!!!!!!!!!!!! переделать!!!

var player_in_finish = function(){
    return finish.x>=cvswidth-25 && finish.x<=cvswidth && finish.y>=cvsheight - 25 && finish.y<=cvsheight;
  };//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! переделать потом

var playerinLine = function(r,x,y){
  if(r.type == 3 || r.type == 2){
   return  (Math.abs((r.y1-r.y0)*x - (r.x1-r.x0) * y + (r.x1 * r.y0) - (r.y1 * r.x0))/(Math.sqrt(( Math.pow(r.y1 - r.y0,2)) + (Math.pow((r.x1 - r.x0),2)))))<=5 && playerXline(r) && playerYline(r);
  };
};

var playerinarc = function(r,x,y){
  if(r.type == 1 || r.type == 5){
    return Math.sqrt(Math.pow(x-r.x0,2) + Math.pow(y-r.y0,2))<(5 + r.R);
  };
};

var playerXline = function(r){
  return  ( ( player.x >= r.x0 && player.x <= r.x1 ) || ( player.x <= r.x0 && player.x >= r.x1 ) );
};

var playerYline = function(r){
  return ((player.y <= r.y0 && player.y >= r.y1 ) || (player.y >= r.y0 && player.y <= r.y1 ) );
}

var playerINwall = function (r,x,y) {
  if(r.type==4){
    return x >= r.x0 && x <= r.x0 + r.x1 && y >= r.y0 && y <= r.y0+r.y1;
  };
};

var r = player.x + 10;
var l = player.x - 10;
var st = player.y - 10;
var back = player.y + 10;


setInterval(function(){
  ctx.clearRect(0, 0, cvswidth, cvsheight);
  ctx.closePath();


  ctx.fillStyle="blue";
  ctx.strokeStyle="red";
  ctx.beginPath();
  ctx.arc(player.x,player.y,5*res,0,2 * PI,true);
  ctx.fill();
  if(cursorinplayer()){ctx.stroke();};
  ctx.closePath();
  ctx.strokeStyle="green";
  if(player_in_start() && start){ctx.strokeRect(0,0,res*25,res*25);};





  ctx.fillStyle="orange";
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.arc(finish.x,finish.y,5*res,0,2 * PI,true);
  ctx.fill();
  if(cursorinfinish()){ctx.stroke();};
  ctx.closePath();
  ctx.strokeStyle = "green";
  if(player_in_finish()){ctx.strokeRect(cvswidth-(res*25),cvsheight - (res*25),res*25,res*25);};


// if(mouse.x==550){mouse.x=550}    // ????????????????????????

  if(mouse.click && cursor.line){
    ctx.strokeStyle = Mycolor;    // не работает
    ctx.beginPath();
    ctx.moveTo(mousex, mousey);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
    ctx.closePath();
  };//отрисовка линии когда курсор не движется

  if(mouse.click && cursor.rect){
    ctx.fillStyle=Mycolor;
    ctx.fillRect(mx_rect,my_rect,mouse.x - mx_rect, mouse.y - my_rect);
  };//отрисовка прямоугольника когда курсор не движется

  if(mouse.click && cursor.arc){
    ctx.fillStyle=Mycolor;
    ctx.beginPath();
    ctx.arc(mx_arc,my_arc,P(mx_arc, my_arc, mouse.x, mouse.y),0,2 * PI,false);
    ctx.fill();
    ctx.closePath();
  };


  for(j in grid){

    ctx.strokeStyle = "gray";

    ctx.fillStyle = "gray";

    ctx.lineWidth = 1;

    ctx.closePath();

    ctx.beginPath();

    ctx.moveTo(grid[j].x1,grid[j].y1);

    ctx.lineTo(grid[j].x0,grid[j].y0);

    ctx.stroke();

    ctx.closePath();
  }

  var r = player.x + 10;
  var l = player.x - 10;
  var st = player.y - 10;
  var back = player.y + 10;

  if(Math.sqrt(Math.pow(player.x-finish.x,2) + Math.pow(player.y-finish.y,2))<=10){
    document.location.reload(true);
    alert("YOU WIN");
  };


  for(i in rect){


      if(rect[i].type == 1){

          ctx.beginPath();

          ctx.fillStyle = rect[i].color;
          ctx.strokeStyle = rect[i].color;
          ctx.arc(rect[i].x0,rect[i].y0,radius,0,Math.PI * 2,true);

          ctx.fill();

        };


      if(rect[i].type == 2){

        ctx.fillStyle = rect[i].color;

        ctx.strokeStyle = rect[i].color;

        ctx.lineWidth = radius * 2;

        ctx.beginPath();

        ctx.moveTo(rect[i].x1,rect[i].y1);

        ctx.lineTo(rect[i].x0,rect[i].y0);

        ctx.stroke();

        ctx.closePath();

      };//отрисовка линии соеденяющиеся с кружочками(что бы было ровно)


      if(rect[i].type == 3){

        ctx.strokeStyle = rect[i].color;

        ctx.fillStyle = rect[i].color;

        ctx.lineWidth = 4;

        ctx.closePath();

        ctx.beginPath();

        ctx.moveTo(rect[i].x1,rect[i].y1);

        ctx.lineTo(rect[i].x0,rect[i].y0);

        ctx.stroke();

        ctx.closePath();
      };//отрисовка прямых линий

      if(rect[i].type == 4){

        ctx.fillStyle = rect[i].color;

        ctx.beginPath();

        ctx.fillRect(rect[i].x0,rect[i].y0,rect[i].x1,rect[i].y1);

        ctx.closePath();

      };//отрисовка прямоугольников


      if(rect[i].type == 5){
        ctx.fillStyle = rect[i].color;
        ctx.beginPath();

        ctx.arc(rect[i].x0, rect[i].y0, rect[i].R,0 , 2 * PI,false);

        ctx.fill();

        ctx.closePath();
        //draw_buttons();
      };
    };
},0.1);




var mx_down = mouse.x,my_down = mouse.y;

var mousex = -1;//позиции при нажатии

var mousey = -1;

var mx_rect;

var my_rect;

var mx_arc;

var my_arc;

var P = function(x0,y0,x1,y1){
  return Math.sqrt( Math.pow(x1-x0,2) + Math.pow(y1-y0,2) );
};


cvs.onmousemove = function(e){
console.log(mouse.x,mouse.y);

  mouse.x = e.clientX - 78;

  mouse.y = e.clientY- 140;

  if(mouse.click){


    if(cursor.draw && mouse.x>=0 && mouse.x<=cvswidth && mouse.y>=0 && mouse.y<= cvsheight){

      rect.push(new Wall(mx_down,my_down,mouse.x,mouse.y,0,Mycolor,2));

      rect.push(new Wall(mouse.x,mouse.y,-1,-1,-1,Mycolor,1));

      cnt+=2;

    };//когда нажата кнопка рисования от руки


    if(cursor.line){

      ctx.lineWidth = 4;

      ctx.strokeStyle=Mycolor;

      var wmX,wmY;

      ctx.beginPath();

      ctx.moveTo(mousex,mousey);

      ctx.lineTo(mouse.x,mouse.y);

      ctx.stroke();

      ctx.closePath();

    };//когда нажата кнопка рисования прямых линий

    if(cursor.arc){
      ctx.fillStyle=Mycolor;
      ctx.beginPath();
      ctx.arc(mx_arc,my_arc,P(mx_arc, my_arc, mouse.x, mouse.y),0,2 * PI,false);
      ctx.fill();
      ctx.closePath();
    };

    mx_down = mouse.x;

    my_down = mouse.y


    if(cursorinplayer() && mouse.click && start){
      player.x=mouse.x;
      player.y=mouse.y;
    }

    if(cursorinfinish() && mouse.click && fin){
      finish.x=mouse.x;
      finish.y=mouse.y;
    }

  }
};




var count = [] , cnt;

window.onmousedown = function(){

  ctx.beginPath();
  mouse.click = true;

  if(cursor.draw){
  cnt=0;
};


  if(cursor.line){
    mousex = mouse.x;
    mousey = mouse.y;
  };

  mx_down = mouse.x;
  my_down = mouse.y;

  mx_rect = mouse.x;
  my_rect = mouse.y;

  mx_arc = mouse.x;
  my_arc = mouse.y;

  if(cursor.rect){
    ctx.fillRect(mx_rect,my_rect,mouse.x - mx_rect, mouse.y - my_rect);
  };
};


window.onmouseup = function(){
  if(cursor.draw && mouse.x>=0 && mouse.x<=cvswidth && mouse.y>=0 && mouse.y<= cvsheight){

    count.push(cnt);

    cnt=0;
  }

  if(cursor.line && mouse.x>=0 && mouse.x<=cvswidth && mouse.y>=0 && mouse.y<= cvsheight) {

    rect.push(new Wall(mousex,  mousey, mouse.x, mouse.y, -1,Mycolor,3));

    index++;
  };

  if(cursor.rect && mouse.x>=0 && mouse.x<=cvswidth && mouse.y>=0 && mouse.y<= cvsheight){

    rect.push(new Wall(mx_rect, my_rect, mouse.x - mx_rect, mouse.y - my_rect,-1 ,Mycolor,4));

    index++;
  };

  if(cursor.arc && mouse.x>=0 && mouse.x<=cvswidth && mouse.y>=0 && mouse.y<= cvsheight){

    rect.push(new Wall(mx_arc,my_arc, -1, -1, P(mx_arc, my_arc, mouse.x, mouse.y), Mycolor,5));

    index++;
  };


  if(fin && !player_in_finish()){
    fin = false;
  };

  if(start && !player_in_start()){
    start = false;
    fin = true
  };


  mouse.click = false;
};
