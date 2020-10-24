//VARIABLES
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
//let por que se va a ir modificando/llenando de acuerdo a lo que se compre
let articulosCarrito = [];


cargarEventListeners()
function cargarEventListeners() {
    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);


    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);
}

//FUNCIONES
function agregarCurso(e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito') ) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}


//Elimina un curso del carrito
function eliminarCurso(e){
    console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')) {
        console.log(e.target)
    }
}

//Lee el contenido/los datos del HTML al que le dimos click y extrae la información del curso
function leerDatosCurso(curso){

    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('p').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //Revisa si un elemento ya existe en el carrito(si necesitas más cantidad)
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id)
    if(existe) {
        //actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //Retorna el objeto actualizado
            } else {
                return curso; //Retorna los objetos que no son los duplicados pero que igual necesita el usuario
            }
        });
        articulosCarrito = [...cursos];
    } else {
        //Agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML();
}



//Muestra los productos que agregues en el HTML de carrito del navbar
function carritoHTML() {

    //Limpiar el HTML 
    limpiarHTML();


    // //Recorrer el carrito y general el HTML
    // articulosCarrito.forEach( curso => {
    //     const {imagen, titulo, precio, cantidad, id} = curso;
    //     const row = document.createElement('ul');
    //     row.innerHTML = `
    //     <td><img src="${imagen}" width="100"></td>
    //     <td>${titulo}</td>
    //     <td>${precio}</td>
    //     <td>${cantidad}</td>
    //     <td> <a href="#" class="borrar-curso" data-id="${id}">  X</a></td>
    //     `;

    //     //Agrega el HTML del carrito en el tbody
    //     contenedorCarrito.appendChild(row);
    // })

    //Recorrer el carrito y general el HTML
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src="${imagen}" width="100"></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td> <a href="#" class="borrar-curso" data-id="${id}">  X</a></td>
        `;

        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}



//Elimina los cursos del tbody
function limpiarHTML() {
    //Forma lenta
    //contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

