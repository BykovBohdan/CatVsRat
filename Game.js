window.onload = init;

	var canvas,
	    ctx,
	   // drawBtn,
	    //clearBtn,
	    canvasWidth,
	    canvasHeigth,
	    catImg,
	    bgAudio,
	    player,
	    enemy,
	    timer,
	    bgX,
	    bgX1,
	    bg;
 var enemys = [];

   

 canvasWidth = 1280;
 canvasHeigth  = 620;

 bgX = 0;
 bgX1 = canvasWidth;


    bg = new Image();
    bg.src = "img/bg.jpg";
    
  var bg2 = new Image();
    bg2.src = "img/bg1.jpg";

    catImg = new Image();
    catImg.src = "img/cat2.png";
    ratImg = new Image();
    ratImg.src = "img/rat.png";
    bgAudio = new Audio();
    bgAudio.src = "bgAudio.mp3";
    bgAudio.volume = 0.01;



function init () {


	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

    canvas.width  = canvasWidth; // обращение становиться короче
    canvas.height = canvasHeigth;
	

/*	drawBtn = document.getElementById("drawBtn"); //получаю доступ к кнопке
	clearBtn = document.getElementById("clearBtn");


	drawBtn.addEventListener("click", drawRect, false); // вешаю на кнопку событие "клик"
	clearBtn.addEventListener("click", clearRect, false); // при нажатии на копку запуск. соотв. функция */
	document.addEventListener("keydown", chechKeyDown, false);
    document.addEventListener("keyup", chechKeyUp, false);
    player = new Player();
  //  enemy = new Enemy();
    timer = 1;

    spawnEnemys(10);
    
   // bgAudio.play();
  //  draw();
    startLoop();
}



function spawnEnemys(count) {
  for (var i = 0; i < count; i += 1) {
  	enemys[i] = new Enemy();		
  }
  console.log("eni = " + enemys );
}

function drawRect () {
	ctx.fillStyle = "rgba(255,255,255,0.6)";
	ctx.fillRect(0,0, canvasWidth, canvasHeigth);

}


function clearRect () {

  ctx.clearRect(0, 0, canvasWidth, canvasHeigth);

}

function drawBg() {
	
	ctx.drawImage(bg, bgX, 0, canvasWidth, canvasHeigth);
	ctx.drawImage(bg2, bgX1, 0, canvasWidth, canvasHeigth);
//	ctx.drawImage(bg2, bgX1, 0, canvasWidth, canvasHeigth);
	ctx.font = "italic 30pt Arial";
	 ctx.strokeStyle = "#F00";
     ctx.strokeText("Points: " + timer, 10, 50);
	
}

function Player () {
	this.scrX = 200; // координаты в файле
	this.srcY = 100;  //ошибся с названием, но менять уже не буду 
	
	this.width = 200 ;
	this.height = 100;

	this.isUp = false;
	this.isDown = false;
	this.isRight = false;
	this.isLeft = false;

	this.speed = 5;
}

Player.prototype.draw = function () {
	ctx.drawImage(catImg, this.scrX, this.srcY, this.width, this.height);
}




function Enemy () {
	this.scrX =  Math.floor(Math.random() * canvasWidth + canvasWidth); // координаты в файле
	this.srcY = Math.floor(Math.random() * (canvasHeigth - 92)) ; // костыляка
	
	this.width = 50 ;
	this.height = 90;

	this.speed = 5;
}


Enemy.prototype.draw = function () {
	ctx.drawImage(ratImg, this.scrX, this.srcY, this.width, this.height);
}

function draw() {
	player.draw();
//	enemy.draw();
	for (var i = 0; i < enemys.length; i += 1) {
	enemys[i].draw();
}
}
 
var isPlaying; 

var requestAnimFrame = ( window.requestAnimationFrame || 
                         window.webkitRequestAnimationFrame ||
                         window.mozRequestAnimationFrame ||
                         window.oRequestAnimationFrame ||
                         window.msRequestAnimationFrame );

function loop() {
	if (isPlaying) {  // если игра активна (это переменная для выхода из игр цикла)
	 bgAudio.play();	
    clearRect ();  // очищаем экран
    drawBg();  // прорисовуем бек
    draw();  // прорисовуем обьекты
    update();  // обновляем состояния
    requestAnimFrame(loop); // зацикливаем
    timer++;
    console.log("timer " + timer);
	}

}

function update () {
 

 player.update();
 //enemy.update();
moveBg();
for (var i = 0; i < enemys.length; i += 1) {
	enemys[i].update();
}
console.log("ok1" + enemys[i]);
}


function startLoop() {
	isPlaying = true;
	loop();

}

function stopLoop() {

	isPlaying = false;
	drawRect();
	bgAudio.pause();
	ctx.font = "italic 30pt Arial";
	 ctx.fillStyle = "black";
     ctx.fillText("GAME OVER", canvasWidth / 2 - 100, canvasHeigth / 2);

      ctx.font = "italic 20pt Arial";
      ctx.fillText("Your points: " + timer, canvasWidth / 2 - 75, canvasHeigth / 2 + 40);

      ctx.fillStyle = "red";
      ctx.fillText("Click for play again", canvasWidth / 2 - 90, canvasHeigth / 2 + 90);
      document.addEventListener("click", restart, false);

}

function restart () {
	alert("Это переростает в зависимость, АСТАНАВИТЕС!!11!");
}

Player.prototype.update = function() {
	
	this.control();



	if (this.scrX <= 0) {
		this.scrX +=  this.speed;
	} 

	if (this.scrX + 200 >= canvasWidth ) {  // заменить цифру на зис, но использовать бинд, потом что тер. контекст
		this.scrX -=  this.speed;
	}

	if (this.srcY <= 0 ) {
		this.srcY += this.speed;
	}

	if (this.srcY + 100 >= canvasHeigth) {
		this.srcY -= this.speed;
	}

    for (var i = 0; i < enemys.length; i += 1) {
	

	if (this.scrX < enemys[i].scrX + enemys[i].width && 
		this.scrX + 130 > enemys[i].scrX &&
		this.srcY + 20 < enemys[i].srcY + enemys[i].height &&
		this.srcY + 75 > enemys[i].srcY)  {
console.log("BOOM!");
		stopLoop();
	}

}
}

Enemy.prototype.update = function() {
    
    this.scrX -= this.speed; 
    if (this.scrX < 0) {
    	this.scrX =  Math.floor(Math.random() * 10 + canvasWidth); // координаты в файле
	this.srcY = Math.floor(Math.random() * (canvasHeigth - 92)) ; 
    }
	/*d = new Date();
    this.scrX = ( d.getTime() * 0.01 % canvasWidth);
    console.log("wwww " + this.scrX); */

}


Player.prototype.control = function() {

	if (this.isUp) {
		this.srcY -= this.speed;
	} // end if

	if (this.isDown) {
		this.srcY += this.speed;
	} // end if

	if (this.isLeft) {
		this.scrX -= this.speed;
	} // end if

    if (this.isRight) {
		this.scrX += this.speed;
	} // end if

}

function chechKeyDown (e) {

	var keyID = e.keyCode || e.which; //поддержка старых браузеров
	var keyChar = String.fromCharCode(keyID); // преобразуем в стринг

	if (keyChar == "W") {
		player.isUp = true;
		e.preventDefault(); //ставит в пред. состояние клавишу
	} //
	if (keyChar == "S") {
		player.isDown = true;
		e.preventDefault(); //ставит в пред. состояние клавишу
	}// 
	if (keyChar == "A") {
		player.isLeft = true;
		e.preventDefault(); //ставит в пред. состояние клавишу
	} // 
	if (keyChar == "D") {
		player.isRight = true;
		e.preventDefault(); //ставит в пред. состояние клавишу
	}
}


function chechKeyUp (e) {
	
	var keyID = e.keyCode || e.which; //поддержка старых браузеров
	var keyChar = String.fromCharCode(keyID); // преобразуем в стринг

	if (keyChar == "W") {
		player.isUp = false;
		e.preventDefault(); //ставит в пред. состояние клавишу
	} //
	if (keyChar == "S") {
		player.isDown = false;
		e.preventDefault(); //ставит в пред. состояние клавишу
	}// 
	if (keyChar == "A") {
		player.isLeft = false;
		e.preventDefault(); //ставит в пред. состояние клавишу
	} // 
	if (keyChar == "D") {
		player.isRight = false;
		e.preventDefault(); //ставит в пред. состояние клавишу
	}
}

function moveBg () {
	var vel = 2;
 bgX -= vel;
 bgX1 -= vel;

 if (bgX + canvasWidth < 0) {
 	bgX = canvasWidth - 5;
 }
if (bgX1 + canvasWidth < 0) {
 	bgX1 = canvasWidth - 5;
 }
}