//variáveis da bolinha
let xBolinha = 300
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2 ;

//velocidade da bolinha
let velocidadeXBolinha = 8;
let velocidadeYBolinha = 8;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOpoenente;
let chanceDeErrar = 0;

let colidiu = false;

//placar do jogo
let meusPontos =0;
let pontosOponente = 0;

  //sons do jogo
let raquetada;
let ponto;
let trilha;
function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}
function preload(){
  trilha= loadSound("trilha.mp3");
  ponto= loadSound("ponto.mp3");
  raquetada= loadSound("raquetada.mp3");
}
function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 45
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 30){
    chanceDeErrar = 35
    }
  }
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0); // desenha o background
  mostraBolinha(); // desenha a bolinha
 movimentaBolinha(); // desenha o movimento da bolinha
  verificaColisaoBorda(); //desenha a colisao da bolinha
  mostraRaquete(xRaquete,yRaquete); //desenha a raquete 
  movimentaMinhaRaquete(); //desenha o movimento da raquete
  verificaColisaoRaquete(xRaquete, yRaquete); //desenha a colisao da raquete
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);//desenha a raquete do oponente
  movimentaRaqueteOponente(); //desenha o movimento da raquete do oponente
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);//desenha a colisao da raquete do oponente
incluiPlacar();//desenha o placar na tela
  marcaPonto();//desenha a marcação dos pontos
}


function mostraBolinha(){
  circle (xBolinha,yBolinha,diametro);
}
function movimentaBolinha(){
   xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}
function verificaColisaoBorda (){
  if (xBolinha + raio > width ||
      xBolinha - raio< 0){
      velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio> height ||
     yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete (x,y){
   rect (x,y,raqueteComprimento,raqueteAltura);
}
function mostraRaqueteOponente (x,y){
   rect (xRaqueteOponente,yRaqueteOponente,raqueteComprimento,raqueteAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -=10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete +=10;
  }
    }
 function verificarColisaoRaquete(x, y){
      colisao = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha,( raio+raqueteComprimento));
          if(colisao){
              if(xBolinha >= 570){
                    xBolinha = 565; 
              } 
              if(xBolinha <= 30){
                    xBolinha = 35;
              }
                velocidadeXBolinha *= -1;
                raquetada.play();
          }
    }
function verificaColisaoRaquete(x, y){
  colidiu=
collideRectCircle(x,y,raqueteComprimento,raqueteAltura,xBolinha, yBolinha,raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}
function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}
function incluiPlacar(){
  stroke(255);
 textAlign(CENTER);
  textSize(16);
  fill(color(255,140,0));
  rect(150,10,40,20);
      fill(255);
  text(meusPontos, 170,26);
  fill(color(255,140,0));
  rect(450,10,40,20);
  fill(255);
  text(pontosOponente, 470,26);
}
function marcaPonto(){
  if (xBolinha > 590){
    meusPontos +=1;
    ponto.play();
    
  } if (xBolinha <10){
  pontosOponente +=1;
    ponto.play();
}
} 
