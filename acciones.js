let numeroCuadros=[1,2,3,4,5,6,7,8,9]
let posiblesCuadros=numeroCuadros

let posicionesX=[false,false,false,false,false,false,false,false,false]
let posicionesO=[false,false,false,false,false,false,false,false,false]


// reiniciar variables
function reiniciar() {
  let x = document.getElementsByClassName("cuadro");
  for (let i = 0; i < x.length; i++) {
    x[i].innerHTML = "";
  }
  posiblesCuadros=[1,2,3,4,5,6,7,8,9];
  posicionesX=[false,false,false,false,false,false,false,false,false]
  posicionesO=[false,false,false,false,false,false,false,false,false]


  ronda("Jugador uno")
}

// marca las posiciones elegidas y las guarda en un array
function marcarCuadroElegido(pos,index) {
   for (let i = 0; i < pos.length; i++) {
     if((index-1)==i){
       pos[i]=true
       return
     }
   }
}
// Elimina el cuadro seleccionado de los posibles cuadros
function bloquearCuadros(pos) {
  if(pos>0&&pos<10){
    for (var i = 0; i < posiblesCuadros.length; i++) {
      if(pos==posiblesCuadros[i]){
        posiblesCuadros.splice(i, 1);
        console.log("Si esta");
        return
      }
    }
  }
}
// Seleccionar un cuadro de la interfaz
function selectCuadro(index) {
  let elemento=document.querySelector(`[pos="${index}"]`)
  return document.querySelector(`[pos="${index}"]`)
}
// Aarega la clase correspondienteal tipo de jugador
function jugada(indice,jugador={}) {
  const element=selectCuadro(indice)
  if(jugador.player){
    element.textContent='X'
  }else if (jugador.maquina) {
    element.textContent='O'
  }
}

function turnoJugador(index,callback) {

    jugada(index,{player:true})
    bloquearCuadros(index)
    marcarCuadroElegido(posicionesX,index)
    setTimeout(()=>{
        callback("Maquina")
    },500)
}
function turnoMaquina(cb){
  let numGenerado
  numGenerado = posiblesCuadros[Math.floor(Math.random()*posiblesCuadros.length)];
  console.log('Cuadro maquina :'+numGenerado);
  //numGenerado=7
  marcarCuadroElegido(posicionesO,numGenerado)
  bloquearCuadros(numGenerado);
  jugada(numGenerado,{maquina:true})
  setTimeout(()=>{
      cb("Jugador uno")
  },500)
}
// Logica de la ronda
function ronda(tipoJugador) {
   swal(`Turno de : ${tipoJugador}`)
 .then((value) => {
     if(tipoJugador=="Jugador uno"){
         window.addEventListener('click',function (e) {
           let index=e.target.attributes.pos.value;
           turnoJugador(index,function (msg) {
             if(!empate()){
               if(!ganar(posicionesX)){
                 ronda(msg)
               }else {
                 swal("Buen trabajo", "Ganaste el triqui", "success").then((value) => {
                 reiniciar()
  });
               }
             }
             return
           })
         })
     }else{
         setTimeout(()=>{
           turnoMaquina(function (msg) {

             if(!empate()){
               if(!ganar(posicionesO)){
                 ronda(msg)
               }else {
                 swal("Perdiste", "Perdiste el triqui", "error").then(()=>{
                   reiniciar()
                 });
               }
             }else
             swal("Empate", "Empate en la partida", "warning").then(()=>{
               reiniciar()
             });
           })
         },500)
         return
     }
});
}
function empate() {
  let empate=false
  if(posiblesCuadros.length==0){
    empate=true
  }
  return empate
}
function ganar(array) {

let win=false;
//Linea superior horizontal
if(array[0]==true&&array[1]==true&&array[2]==true){
  console.log('ganaste');
  win=true;
}

//Linea media horizontal
if(array[3]==true&&array[4]==true&&array[5]==true){
  console.log('ganaste');
  win=true;
}

//Linea inferior horizontal
if(array[6]==true&&array[7]==true&&array[8]==true){
  console.log('ganaste');
  win=true;
}

//Linea izquierda vertial
if(array[0]==true&&array[3]==true&&array[6]==true){
  console.log('ganaste');
  win=true;
}

//Linea medio vertial
if(array[1]==true&&array[4]==true&&array[7]==true){
  console.log('ganaste');
  win=true;
}

//Linea deracha vertial
if(array[2]==true&&array[5]==true&&array[8]==true){
  console.log('ganaste');
  win=true;
}

//diagonal 1
if(array[0]==true&&array[4]==true&&array[8]==true){
  console.log('ganaste');
  win=true;
}

//diagonal 2
if(array[2]==true&&array[4]==true&&array[6]==true){
  console.log('ganaste');
  win=true;
}
  return win
}
// Metodo para iniciar la partida
ronda("Jugador uno")
