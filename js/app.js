/*variables*/

const carrito = document.querySelector("#carrito"); //accede al id Carrito
const contenedorCarrito = document.querySelector("#lista-carrito tbody"); //accede al id lista-carrito y a la tabla del carrito
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito"); //accede al id del boton vaciar carrito
const listaCursos = document.querySelector("#lista-cursos"); //accede al id de la lista de los cursos
let articulosCarrito = [];

cargarEventListeners(); //llama a la funcion

//funciones
function cargarEventListeners() {
  //crea la funcion
  //cuando agregas un curso presionando "Agregar al Carrito"
  listaCursos.addEventListener("click", agregarCurso);

  //Elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

  //vaciar el carrito
  vaciarCarritoBtn.addEventListener('click', ()=>{
  articulosCarrito=[]//reseteamos el arreglo
  vaciarCarrito()//eliminamos todo el HTML
  })
}



function agregarCurso(e) {
  e.preventDefault(); //previene datos por default
  //e.target es el elemento al cual le damos click
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    //parentElement devuelve el dato del nodo del padre
    leerDatosCurso(cursoSeleccionado);
  }


}


//Elimina el curso del carrito

function eliminarCurso(e){
 console.log(e.target.classList)
 if(e.target.classList.contains('borrar-curso')) {
 const cursoId= e.target.getAttribute('data-id');


 //Elimina el arreglo de articulosCarrito por el data-id

 articulosCarrito=articulosCarrito.filter(curso =>curso.id !==cursoId)
carritoHTML()//volvemos a iterar sobre el carrito y volvemos a mostrar su HTML 
}
}
//lee el contenido del html al que le demos click y extrae la informacion del curso
function leerDatosCurso(curso) {
  //console.log(curso);

  //crear un objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };
//

  //revisa si un elemento ya existe en el carrito

  const existe=articulosCarrito.some(curso=> curso.id=== infoCurso.id); 
  if(existe){
      //actualiza la cantidad
      const cursos=articulosCarrito.map(curso=>{
        if  (curso.id=== infoCurso.id){
          curso.cantidad++;
          return curso;//retorna el objeto actualizado 
        }else{
          return curso; //retorna los objetos que no son los duplicados 
        }
      })
articulosCarrito=[...cursos]
  } else{
    //agrega el curso al carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }


  //agrega elementos al arreglo de carrito
  //crea una copia del elemento agregado anteriormente
  
  console.log(articulosCarrito);
  carritoHTML();
}

// Muestra el curso seleccionado en el Carrito

function carritoHTML() {

    vaciarCarrito();

    articulosCarrito.forEach(curso => {
        const {imagen, titulo, precio,cantidad,id}=curso;
         const row = document.createElement('tr');
         row.innerHTML = `
              <td>  
                   <img src="${imagen}" width=100>
              </td>
              <td>${titulo}</td>
              <td>${precio}</td>
              <td>${cantidad} </td>
              <td>
                   <a href="#" class="borrar-curso" data-id="${id}">X</a>
              </td>
         `;
         contenedorCarrito.appendChild(row);
    });

}

//Elimina los cursos del tbody

function vaciarCarrito() {
  //forma lenta
  //contenedorCarrito.innerHTML=''
  //si el contendor carrito  tiene un elemento adentro se sigue ejecutando y una vez que es limpiado html dentro del contenedor ya no ejecuta


    while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
