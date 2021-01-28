// variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');




//listener aciones
cargarEventListeners();


function cargarEventListeners() {
    // dispara cuando se presiona
    cursos.addEventListener('click', comprarCurso);

    // cuando se elimina un curso del carrito
    carrito.addEventListener('click', elminarCurso);

    // al vaciar el carrito

    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    //al cargar documento mostrar loscal storage

    document.addEventListener('DOMContentLoaded', leerLocalStorage);

}






//funciones

// funcion que añade el curso al carrito
function comprarCurso(e) {
    e.preventDefault();
    // delegation para agregar- carrito
    if (e.target.classList.contains('agregar-carrito')) {

        const curso = e.target.parentElement.parentElement;
        //eviamos el curso selecionado para tomar sus datos 
        leerDatosCursos(curso);
    }
}


// lee los datos del curso

function leerDatosCursos(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')

    }

    insertarCarrito(infoCurso);
}


// muestra el curso seleccionado en el carrito

function insertarCarrito(curso) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
            <img width="100px" src="${curso.imagen}">
    </td>
    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td>
    <a href="#" class="borrar-curso" data-id="${curso.id}">x</a>
    </td>
    `;

    listaCursos.appendChild(row);

    guadarCursoLocalStorage(curso);

}

// elimina el curso del carrito en el dom
function elminarCurso(e) {
    e.preventDefault();
    //console.log('eliminado');
    let curso,
        cursoid;
    if (e.target.classList.contains('borrar-curso')) {


        curso = e.target.parentElement.parentElement;
        cursoid = document.querySelector('a').getAttribute('data-id');
        e.target.parentElement.parentElement.remove();
    }
    eliminarCursoLocalStorage(cursoid);
    //console.log(cursoid);
}


// elimina todos los cursos del carrito en el dom

function vaciarCarrito() {
    // forma lenta 
    //listaCursos.innerHTML = '';

    // forma rapida (recomendada)
    while (listaCursos.firstChild) {
        listaCursos.removeChild(listaCursos.firstChild);
    }



    // vaciar local storage
    vaciarLocalStorage();


}



// almacena cursos en el carrito a local Storage 
function guadarCursoLocalStorage(curso) {
    let cursos;
    // toma los datos del localStorage y
    // devuelve un array vacio si no hay nada en el 
    // local storage
    cursos = obtenerCursoLocalStorage();

    // añade un producto al array 
    cursos.push(curso);

    localStorage.setItem('cursos', JSON.stringify(cursos));
    console.log(cursos);
}

// comprueba si algo en el local storage
function obtenerCursoLocalStorage() {
    let cursosLs;
    // comprobar si hay algo en el local storage

    if (localStorage.getItem('cursos') === null) {
        cursosLs = [];

    } else {
        cursosLs = JSON.parse(localStorage.getItem('cursos'));
    }

    return cursosLs;
}


// imprime los cursos de local Storage en el carrito

function leerLocalStorage() {
    let cursosLs

    cursosLs = obtenerCursoLocalStorage();

    cursosLs.forEach(function(curso) {
        // construir el template
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
                <img width="100px" src="${curso.imagen}">
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}">x</a>
        </td>
        `;

        listaCursos.appendChild(row);

    });


}


//eliminar el curso del local storage por el id

function eliminarCursoLocalStorage(cursoid) {
    let cursoLs;

    cursoLs = obtenerCursoLocalStorage();
    cursoLs.forEach(function(curso, index) {
        if (curso.id === cursoid) {
            cursoLs.splice(index, 1);
        }
    });

    localStorage.setItem('cursos', JSON.stringify(cursoLs));


}



// elimina todos los cursos del local storage

function vaciarLocalStorage() {
    localStorage.clear();
}