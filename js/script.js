const input = document.getElementById('input');
const btnAgregar = document.getElementById('btnAgregar');
const btnGuardar = document.getElementById('btnGuardar');
const lista = document.getElementById('lista');

function nuevoItem(txt){
  let contenedor = document.createElement('div');
  contenedor.setAttribute("class","objetoLista");
  lista.appendChild(contenedor);

  let p = document.createElement('p');
  p.innerHTML = txt;
  p.setAttribute("class","texto");
  contenedor.appendChild(p);
  input.value = "";

  let btnC = document.createElement("button");
  btnC.innerHTML = "X";
  contenedor.appendChild(btnC);

  contenedor.addEventListener("click",()=>{
    contenedor.classList.toggle("hecho");
    btnC.classList.toggle('colorWhite');
  })

  btnC.addEventListener("click", ()=>{
    contenedor.classList.toggle("borrar");
  })
}

function obtenerTextos(){
  let textos = [];
  document.querySelectorAll("p.texto").forEach(p=>{
    textos.push(p.innerText);
  })
  return textos;
}

function guardarTextos(){
  localStorage.setItem("textos",JSON.stringify(obtenerTextos()));
}

function cargarTextos(){
  let array = JSON.parse(localStorage.getItem("textos"));
  array.forEach(txt=>{
    nuevoItem(txt);
  })
}

//Borrar contenedores
setInterval(()=>{
  var contenedores = document.getElementsByClassName('borrar');
  for(var i=0;i<contenedores.length;i++){
    contenedores[i].parentNode.removeChild(contenedores[i])
  }
})

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