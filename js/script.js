const input = document.getElementById('input');
const btnAgregar = document.getElementById('btnAgregar');
const btnGuardar = document.getElementById('btnGuardar');
const lista = document.getElementById('lista');

function nuevoItem(txt){
  //SE CREA UN CONTENEDOR
  let contenedor = document.createElement('div');
  lista.appendChild(contenedor);
  setTimeout(()=>{
    contenedor.setAttribute("class","objetoLista");
  })

  //SE CREA UN PARRAFO PARA EL TEXTO
  let p = document.createElement('p');
  p.innerHTML = txt;
  p.setAttribute("class","texto");
  contenedor.appendChild(p);
  input.value = "";

  //SE CREA UN BOTON PARA CERRAR
  let btnC = document.createElement("button");
  btnC.innerHTML = "X";
  contenedor.appendChild(btnC);

  //MARCAR HECHO
  contenedor.addEventListener("click",()=>{
    contenedor.classList.toggle("hecho");
    btnC.classList.toggle('colorWhite');
  })

  //BOTON CERRAR
  btnC.addEventListener("click", function(){
    contenedor.classList.toggle("borrar");
    btnC.classList.toggle("colorBlack");
    setTimeout(()=>{borrarContenedor(contenedor)},500)
  })
}

function obtenerTextos(){
  let textos = [];
  document.querySelectorAll("p.texto").forEach(p=>{
    textos.push(p.innerHTML);
  })
  return textos;
}

function guardarTextos(){
  if(obtenerTextos().length != 0){
    localStorage.setItem("textos",JSON.stringify(obtenerTextos()));
  } else {
    localStorage.removeItem("textos");
  }
}

function cargarTextos(){
  let array = JSON.parse(localStorage.getItem("textos"));
  array.forEach(txt=>{
    nuevoItem(txt);
  })
}

function borrarContenedor(e){
	e.parentNode.removeChild(e);
}

//Eventos
window.addEventListener('load',()=>{
  if(localStorage.getItem("textos") != null){
    cargarTextos();
  }
})

btnAgregar.addEventListener('click', ()=>{
  if(input.value != ""){
    nuevoItem(input.value);
  }
})

btnGuardar.addEventListener('click', ()=>{
  guardarTextos();
  //ALERTA DE GUARDADO EXITOSO
  document.querySelector('#alerta').classList.add('abierta');
  setTimeout(()=>{
    document.querySelector('#alerta').classList.remove('abierta');
  },1000*2)
})

document.addEventListener('keyup', e=>{
  if(e.key == "i"){
    input.focus();
  }
  if(e.key == "Enter"){
    if(input.value != ""){
      nuevoItem(input.value);
    }
  }
})