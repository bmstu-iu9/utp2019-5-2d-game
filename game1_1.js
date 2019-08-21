"use strict"
var cvs=document.getElementById('cvs');
var ctx=cvs.getContext("2d");
var cvswidth=1000;
var cvsheight=500;
cvs.width=cvswidth;
cvs.height=cvsheight;
cvs.style.backgroundColor="darkgray";

var PI = Math.PI;

var Mycolor="white";
document.getElementById("color").oninput= function(){Mycolor = this.value};

var Wall = function(x0,y0,x1,y1,R,type){
  this.x0 = x0,
  this.y0 = y0,
  this.x1 = x1,
  this.y1 = y1,
  this.R=R;
  this.type=type
};


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

/*document.getElementById("reset").onclick = function(){
  cursor.draw=false;
  cursor.rect=false;
  cursor.line=false;
  cursor.arc=false;
  cursor.reset=true;
  cursor.load=false;
};*/

document.getElementById("load").onclick = function(){
  cursor.draw=false;
  cursor.rect=false;
  cursor.line=false;
  cursor.arc=false;
  cursor.reset=false;
  cursor.load=true;
};

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
  confrim:false
}

var player = {
  x:15,
  y:15
};


var finish = {
  x:cvswidth-215,
  y:cvsheight-15
};

var rect = [];
var i;
var radius = 5;

var player_in_start = function(){
   return player.x>=0 && player.x<=40 && player.y>=0 && player.y<=40;
 };//!!!!!!!!!!!! переделать!!!

 var player_in_finish = function(){
    return finish.x>=cvswidth-231 && finish.x<=cvswidth-200 && finish.y>=469 && finish.y<=500;
  };//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! переделать потом

var playerinLine = function(r){
  return (Math.abs((r.y1-r.y0)*player.x - (r.x1-r.x0) * player.y + (r.x1 * r.y0) - (r.y1 * r.x0))/(Math.sqrt(( Math.pow(r.y1 - r.y0,2)) + (Math.pow((r.x1 - r.x0),2)))))<=10;
}

setInterval(function(){
  ctx.clearRect(0, 0, cvswidth, cvsheight);
  ctx.closePath();

// if(mouse.x==550){mouse.x=550}    // ????????????????????????

  if(mouse.click && cursor.line){
    ctx.strokeStyle = Mycolor;    // не работает
    ctx.beginPath();
    ctx.moveTo(mousex, mousey);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
    ctx.closePath();
  }//отрисовка линии когда курсор не движется

  if(mouse.click && cursor.rect){
    ctx.fillStyle=Mycolor;
    ctx.fillRect(mx_rect,my_rect,mouse.x - mx_rect, mouse.y - my_rect);
  }//отрисовка прямоугольника когда курсор не движется

  if(mouse.click && cursor.arc){
    ctx.fillStyle=Mycolor;
    ctx.beginPath();
    ctx.arc(mx_arc,my_arc,P(mx_arc, my_arc, mouse.x, mouse.y),0,2 * PI,false);
    ctx.fill();
    ctx.closePath();
  }



  for(i in rect){

      if(rect[i].type == 1){

          ctx.beginPath();

          ctx.fillStyle=Mycolor;

          ctx.arc(rect[i].x0,rect[i].y0,radius,0,Math.PI * 2,true);

          ctx.fill();

        }


      if(rect[i].type == 2){

        ctx.strokeStyle = Mycolor;

        ctx.fillStyle = Mycolor;

        ctx.lineWidth = radius * 2;

        ctx.beginPath();

        ctx.moveTo(rect[i].x1,rect[i].y1);

        ctx.lineTo(rect[i].x0,rect[i].y0);

        ctx.stroke();

        ctx.closePath();

      }//отрисовка линии соеденяющиеся с кружочками(что бы было ровно)


      if(rect[i].type==3){

        ctx.strokeStyle = Mycolor;

        ctx.fillStyle = Mycolor;

        ctx.lineWidth = 4;

        ctx.closePath();

        ctx.beginPath();

        ctx.moveTo(rect[i].x1,rect[i].y1);

        ctx.lineTo(rect[i].x0,rect[i].y0);

        ctx.stroke();

        ctx.closePath();
      }//отрисовка прямых линий

      if(rect[i].type==4){
        ctx.beginPath();
        ctx.fillRect(rect[i].x0,rect[i].y0,rect[i].x1,rect[i].y1);
        ctx.closePath();
      }//отрисовка прямоугольников


      if(rect[i].type==5){
        ctx.beginPath();
        ctx.arc(rect[i].x0, rect[i].y0, rect[i].R,0 , 2 * PI,false);
        ctx.fill();
        ctx.closePath();
        //draw_buttons();
      }
    }
},1);




var mx_down = mouse.x,my_down = mouse.y;
var mousex = -1;//позиции при нажатии
var mousey = -1;
var mx_rect;
var my_rect;
var mx_arc;
var my_arc;

var P = function(x0,y0,x1,y1){
  return Math.sqrt( Math.pow(x1-x0,2) + Math.pow(y1-y0,2) );
}


window.onmousemove = function(e){
  mouse.x = e.pageX-5;
  mouse.y = e.pageY-5;

  if(mouse.click){


    if(cursor.draw){

      rect.push(new Wall(mx_down,my_down,mouse.x,mouse.y,0,2));  

      rect.push(new Wall(mouse.x,mouse.y,-1,-1,-1,1));

    }//когда нажата кнопка рисования от руки


    if(cursor.line){
      ctx.lineWidth = 4;
      ctx.strokeStyle=Mycolor;
      var wmX,wmY;

      ctx.beginPath();
      ctx.moveTo(mousex,mousey);
      ctx.lineTo(mouse.x,mouse.y);
      ctx.stroke();
      ctx.closePath();
    }//когда нажата кнопка рисования прямых линий

    if(cursor.arc){
      ctx.fillStyle=Mycolor;
      ctx.beginPath();
      ctx.arc(mx_arc,my_arc,P(mx_arc, my_arc, mouse.x, mouse.y),0,2 * PI,false);
      ctx.fill();
      ctx.closePath();
    }
    mx_down = mouse.x;
    my_down = mouse.y
  }
};






window.onmousedown = function(){

  ctx.beginPath();

  mouse.click = true;

  if(cursor.line){
    mousex = mouse.x;
    mousey = mouse.y;
  }

  mx_down = mouse.x;
  my_down = mouse.y;

  mx_rect = mouse.x;
  my_rect = mouse.y;

  mx_arc = mouse.x;
  my_arc = mouse.y;

  if(cursor.rect){
    ctx.fillRect(mx_rect,my_rect,mouse.x - mx_rect, mouse.y - my_rect);
  }
};


window.onmouseup = function(){
  if(cursor.line) {
    rect.push(new Wall(mousex,  mousey, mouse.x, mouse.y, -1,3));}

  if(cursor.rect){
    rect.push(new Wall(mx_rect, my_rect, mouse.x - mx_rect, mouse.y - my_rect,-1 ,4));
  }

  if(cursor.arc){
    rect.push(new Wall(mx_arc,my_arc, -1, -1, P(mx_arc, my_arc, mouse.x, mouse.y),5));
  }

  mouse.click = false;
};
