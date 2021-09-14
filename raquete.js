//variaveis campo
let xLargura=600;
let xAltura=400;

//variáveis da bolinha
let xBolinha=300;
let yBolinha=200;
let diametroBolinha=16;
let raio = diametroBolinha / 2;
let velocidadeXBolinha=4;
let velocidadeYBolinha=4;
let colidiu=false;

//variaveis da raquete
let xRaquete=10;
let yRaquete=160;
let larguraRaquete=10;
let alturaRaquete=80;

//variaveis Raquete Oponente
let xRaqueteOponente=585;
let yRaqueteOponente=160;
let velocidadeyRaqueteOponente;

//placar
let pontosP1=0;
let pontosP2=0;

//sons
let ponto = new Audio("ponto.mp3");
let trilha = new Audio("trilha.mp3");
let batida = new Audio("raquetada.mp3");

function setup(){
    createCanvas(xLargura, xAltura);
    trilha.loop=true;
    trilha.play();
}

function draw(){
    background(0);
    criarBolinha();
    moverBolinha();
    controlarColisaoBorda();
    criarRaquete(xRaquete,yRaquete);
    moverRaquete();
    controlarColisaoRaquete(xRaquete, yRaquete);
    moverRaqueteOponente();
    criarRaquete(xRaqueteOponente,yRaqueteOponente);
    controlarColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
    alterarPlacar();
    marcarPontos();
}

function criarBolinha(){
    circle(xBolinha,yBolinha,diametroBolinha);
}

function moverBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function controlarColisaoBorda(){
    if (xBolinha + raio > width || xBolinha - raio <0){
        velocidadeXBolinha *= -1;
    }
    if (yBolinha + raio > height || yBolinha - raio <0){
        velocidadeYBolinha *= -1;
    }
}

function criarRaquete(x, y){
    rect(x, y, larguraRaquete, alturaRaquete);
}

function moverRaquete(){
    if (keyIsDown(UP_ARROW)){
        yRaquete -= 10;
    }
    if (keyIsDown(DOWN_ARROW)){
        yRaquete += 10;
    }
}

function moverRaqueteOponente(){
    velocidadeyRaqueteOponente = yBolinha - yRaqueteOponente - alturaRaquete / 2 + 48;
    yRaqueteOponente += velocidadeyRaqueteOponente;
}

function controlarColisaoRaquete(x, y){
    colidiu = collideRectCircle(x, y, larguraRaquete, alturaRaquete, xBolinha, yBolinha, diametroBolinha);
    if (colidiu){
        velocidadeXBolinha *= -1;
        batida.play();
    }
}

function alterarPlacar(){
  textAlign(CENTER);
  textSize(20);
  fill(255,140,0);
  rect(180,9,40,20);
  rect(380,9,40,20);
  fill(255);
  if (pontosP1 >= 10 || pontosP2 >= 10){
    text('fim de jogo');
  }
  text(pontosP1, 200, 26);
  text(pontosP2, 400, 26);
}

function marcarPontos(){
    if (xBolinha > 590){
        pontosP1 +=1;
        ponto.play();
    }
    if (xBolinha < 10){
        pontosP2 +=1;
        ponto.play();
    }
}