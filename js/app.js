//Paso 1: indentificar o crear los selectores
const contenedorCarrito = document.querySelector("#lista-carrito tbody")
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito")
const listaCursos = document.querySelector("#lista-cursos")
const carrito = document.querySelector("#carrito")

//console.log(vaciarCarritoBtn)

//Paso 2: que estructura voy a usar para guardar

let articulosCarrito = [] //declarando un arreglo

//Paso 3: definir los eventos
cargarEventos();//llamar una funcion

function cargarEventos(){
    vaciarCarritoBtn.addEventListener('click', ()=>{
        articulosCarrito = [];
        vaciarCarrito();
    })
    listaCursos.addEventListener('click', agregarCursos)
    carrito.addEventListener("click", eliminarCurso)
}

function agregarCursos(e){
    e.preventDefault() // Este beta es para no refrescar la pagina con click en boton agregar curso
    console.log(e.target.classList.contains("agregar-carrito"))

    if(e.target.classList.contains("agregar-carrito")){
        const curso = e.target.parentElement.parentElement
        leerDatosCurso(curso)
    }
}

function leerDatosCurso(curso){
    //crear un objeto
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        nombre: curso.querySelector('h4').textContent,
        precio: curso.querySelector('span').textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }
    
    if(articulosCarrito.some(i=> i.id === infoCurso.id)){
        const cursos = articulosCarrito.map(i=>{
            if(i.id === infoCurso.id){
                i.cantidad++;
                return i;
            }
            else{
                return i;
            }
        })
        articulosCarrito = [...cursos]
    }else{
        articulosCarrito = [...articulosCarrito,infoCurso]
    }
    mostrarHTML()
}

function mostrarHTML(){

    vaciarCarrito()
    articulosCarrito.forEach(i=>{
        const row = document.createElement('tr')
        row.innerHTML =`
            <td>
                <img src="${i.imagen}" width=100>
            </td>
            <td>
                ${i.nombre}
            </td>
            <td>
                ${i.precio}
            </td>
            <td>
                ${i.cantidad}
            </td>
            <td> 
                <a href="#" class="borrar-curso" data-id="${i.id}">X</a>
        `
        contenedorCarrito.appendChild(row)
    })
}

function eliminarCurso(e){
    e.preventDefault();
        if(e.target.classList.contains('borrar-curso')){
            const cursoId = e.target.getAttribute("data-id")

            const existe = articulosCarrito.some(i=> i.id === cursoId);

            if(existe){
                const i = articulosCarrito.map(i=>{
                    if(i.id === cursoId){
                        if(i.cantidad > 1){
                            i.cantidad--;
                            return i;
                        }else{
                            articulosCarrito = articulosCarrito.filter(i => i.id !== cursoId);
                            return i;
                        }
                    }
                })
            }
            mostrarHTML()
        }
}

function vaciarCarrito(){

        while(contenedorCarrito.firstChild){
            contenedorCarrito.removeChild(contenedorCarrito.firstChild)
        }
}