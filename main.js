
// Elementos

var vbtIniciar;
var vBola;
var vCPU;
var vJogador;
var vPaineltxtPontos;

//==================================

// Controle de Animação

var game,Frame;

//==================================

//Posições

var posBolaX;
var posBolaY;
var posJogadorX;
var posJogadorY;
var posCPUX;
var posCPUY;

//==================================

// Direção de acordo com a tecla

var dirjY;

//==================================

//Posições iniciais
var posjogeInerX = 0;
var posjogeInerY = 180;
var posCPUInerY =  180;
var posCPUInerX = 900;
var posBolainiX = 475;
var posBolainiY = 240;


//==================================

// Variaveis de Tamanho

var campoX = 0;
var campoY = 0;
var campoW = 960;
var campoH = 500;
var barraW = 20;
var barraH = 140;
var bolaW = 20;
var bolaH = 20;

//==================================

//variaveis de Direção

var bolaX,bolaY;
var CPUY = 0;

//==================================

//Velocidade

var veloBola;
var veloCPU;
var veloJogador;

//==================================

//Variavel controle

var pontos = 0;
var Tecla;
var Jogo = false;

//==================================

function ControlaJG(){
    if(Jogo){
        posJogadorY += veloJogador*dirjY;
        if((posJogadorY+barraH >= campoH)||((posJogadorY <= 0))){
            posJogadorY += (veloJogador*dirjY) * -1;
        }
        vJogador.style.top=posJogadorY+"px";
    }
}

function ControlaCPU(){
    if(Jogo){
        if((posBolaX > (campoW/2)) && (bolaX > 0)){
            //Movimentação da CPU

            if((posBolaY+(bolaH/2)) > ((posCPUY+(barraH/2)))+veloCPU){
            //Movimentação Para baixo

            if((posCPUY+barraH) <= campoH){
                posCPUY+=veloCPU;
            }
        }else if((posBolaY+(bolaH/2)) < ((posCPUY+(barraH/2)))+veloCPU){
            if((posCPUY >= 0)){
                posCPUY-=veloCPU;
            }
        }
    }else{
        if((posCPUY+(barraH/2)) < (campoH/2)){
            posCPUY+=veloCPU;
        }else if((posCPUY+(barraH/2)) > (campoH/2)){
            posCPUY-=veloCPU;
        }
    }
    vCPU.style.top=posCPUY+"px";
}
}

function ControlaBola(){
    posBolaX += veloBola*bolaX;
    posBolaY += veloBola*bolaY;

    //Controle de impacto com o Jogador

    if((posBolaX <= posJogadorX+barraW)&&(((posBolaY+bolaH) >= posJogadorY)&&(posBolaY <= posJogadorY+barraH))){
        
        bolaY = (((posBolaY+(bolaH/2)) - (posJogadorY+(barraH/2)))/32);
        bolaX*=-1;

    //Controle de impacto com a CPU

    }else if((posBolaX >= posCPUX+barraW)&&(((posBolaY+bolaH) >= posCPUY)&&(posBolaY <= posCPUY+barraH))){
       
        bolaY = (((posBolaY+(bolaH/2)) - (posCPUY+(barraH/2)))/32);
        bolaX*=-1;

    }else if((posBolaY >= 480)||(posBolaY <= 0)){

        bolaY*=-1
    }else if(posBolaX >= (campoW-bolaW)){
        veloBola=0;
        posBolaX=posBolainiX;
        posBolaY=posBolainiY;
        posJogadorY= posjogeInerY;
        posJogadorX= posjogeInerX;
        posCPUY = posCPUInerY;
        pontos++;
        vPaineltxtPontos.value = pontos;
        Jogo = false
    }else if(posBolaX <= 0){
        veloBola=0;
        posBolaX=posBolainiX;
        posBolaY=posBolainiY;
        posJogadorY= posjogeInerY;
        posJogadorX= posjogeInerX;
        posCPUY = posCPUInerY;
        pontos--;
        vPaineltxtPontos.value = pontos;
        Jogo = false
    }


    vBola.style.top=posBolaY+"px";
    vBola.style.left=posBolaX+"px";

}

// Function para a tecla direita e Esquerda

function TeclaDw(event){
   Tecla = event.key;
   if(Tecla == 'ArrowUp'){
       dirjY = -1;
   }else if(Tecla == 'ArrowDown'){
       dirjY = 1;
   }
}

//====================================================================

// Function para a tecla cima e baixo

function TeclaUp(event){
    Tecla = event.key;
    if(Tecla == 'ArrowUp'){
        dirjY = 0;
    }else if(Tecla == 'ArrowDown'){
        dirjY = 0;
    }
}

//====================================================================

function Game(){
    if(Jogo){
        ControlaJG();
        ControlaBola();
        ControlaCPU();
    }
    Frame = requestAnimationFrame(Game);
    
}

function IniciaJogo(){
    if(!Jogo){
        cancelAnimationFrame(Frame);
        veloBola = 8;
        veloCPU = 8;
        veloJogador = 8;
        bolaY = 0;
        if((Math.random()*10) < 5){
            bolaX = -1;
        }else{
            bolaX = +1;
        }
        Jogo = true;
        dirjY = 0;
        posBolaX = posBolainiX;
        posBolaY = posBolainiY;
        posJogadorX = posjogeInerX;
        posJogadorY = posjogeInerY;
        posCPUX = posCPUInerX;
        posCPUY = posCPUInerY;
        Game();
    }
}

function Inicializa(){
    veloBola = 8;
    veloCPU = 8;
    veloJogador = 8;
    vbtIniciar = document.getElementById("btInicia");
    vbtIniciar.addEventListener("click", IniciaJogo);
    vJogador = document.getElementById("dvJogador");
    vCPU = document.getElementById("dvCPU");
    vBola = document.getElementById("dvBola");
    vPaineltxtPontos = document.getElementById("txtPontos");
    document.addEventListener("keydown", TeclaDw);
    document.addEventListener("keyup", TeclaUp);
}

window.addEventListener("load", Inicializa);




