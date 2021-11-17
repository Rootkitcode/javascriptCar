//declaro las constantes haciendo llamado al id del elemnto que necesito
const carrito = document.getElementById("carrito");
const productos = document.getElementById("lista-productos");
const listaProductos = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");



cargarEventListeners();
//funcion que me permite cargar los elementos  mediante eventos
function cargarEventListeners() {
  productos.addEventListener("click", comprarProducto);
  carrito.addEventListener("click", eliminarProducto);
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
  document.addEventListener("DOMContentLoaded", leerLocalStorage);
  console.log(productos);
  console.log(carrito);
}
//funcion que me permite agregar los elementos
function comprarProducto(e) {
    e.preventDefault();//el prevent default e utiliza parapara detener una accion por omision se utiliza para etiquetas (a) y botones input submit
    if(e.target.classList.contains('agregar-carrito')){//target permite detectar si una funcion constructor fue llamada utilizando el operador
        const producto = e.target.parentElement.parentElement;//se utiliza esta propiedad de solo lectura
        leerDatosProducto(producto);
        console.log(producto);
    }
}
//leemos los datos que tenemos en las etiquetas
function leerDatosProducto(producto){
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h4').textContent,
        precio: producto.querySelector('.precio span').textContent,
        id: producto.querySelector('a').getAttribute('data-id')
        
    }
    console.log(infoProducto);

    insertarCarrito(infoProducto);
}
//cargamos los elementos en la tabla del carrito
function insertarCarrito(producto) {
    const row = document.createElement('tr');
    row.innerHTML = `
       <td>
           <img src="${producto.imagen}" width=100> 
       </td> 
       <td>${producto.titulo}</td>
       <td>${producto.precio}</td>
       <td>
        <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
       </td>
    `;
    listaProductos.appendChild(row);//el metodo appendChild es utilizado para insertar un nuevo nodo detro de la estructra DOM
    guardarProductoLocalStorage(producto);
    console.log(producto.titulo);
    console.log(producto.precio);
    console.log(producto.id);
}

// localStorage son propiedades que me dejanalmacenar datos en el navegador como si fueran cookies

function eliminarProducto(e) {
    e.preventDefault();//utilizamos el preventDefault para detener una accion en una etiqueta

    let producto,
        productoId;
    
    if(e.target.classList.contains('borrar-producto')) {
        e.target.parentElement.parentElement.remove();
        producto = e.target.parentElement.parentElement;//parentElement es una propiedad de solo lectura de nodo devuelve el nodo padre del elemento
        productoId = producto.querySelector('a').getAttribute('data-id');
    }
    eliminarProductoLocalStorage(productoId)
}

function vaciarCarrito(){
    while(listaProductos.firstChild){
        listaProductos.removeChild(listaProductos.firstChild);
    }
    vaciarLocalStorage();

    return false;
}

function guardarProductoLocalStorage(producto) {
    let productos;

    productos = obtenerProductosLocalStorage();
    productos.push(producto);

    localStorage.setItem('productos', JSON.stringify(productos));
}

function obtenerProductosLocalStorage() {
    let productosDt;

    if(localStorage.getItem('productos') === null) {
        productosDt = [];
    }else {
        productosDt = JSON.parse(localStorage.getItem('productos'));
    }
    return productosDt;
}
//recorremos el arreglo y vemos cuantos elementos tenemos en el storgae
function leerLocalStorage() {
    let productosDt;

    productosDt = obtenerProductosLocalStorage();

    productosDt.forEach(function(producto){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width=100>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
                <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
            </td>
        `;
        listaProductos.appendChild(row);
    });
    console.log(producto.imagen)
}

function eliminarProductoLocalStorage(producto) {
    let productosDt;
    productosDt = obtenerProductosLocalStorage();
//recorremos para saber cuantos elementos tenemos
    productosDt.forEach(function(productoCalidad, index){
        if(productoCalidad.id === producto) {
            productosDt.splice(index, 1);//el splice para cambiar o del array y eliminando los existentes
        }
    });

    localStorage.setItem('productos', JSON.stringify(productosDt));
}

function vaciarLocalStorage() {
    localStorage.clear();
}




