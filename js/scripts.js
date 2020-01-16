//Elementos de formulario como variables

const formularioProducto = document.getElementById('formulario-producto');
const btnLimpiarFormulario = document.querySelector('.limpiar-datos');
const listaCompras = document.getElementById('lista-compras');


//Event Listeners

eventListeners();

function eventListeners(){
    //Limpiar datos del formulario
    btnLimpiarFormulario.addEventListener('click', limpiarFormulario);

    //Enviar elementos del formulario
    formularioProducto.addEventListener('submit', enviarProductoLista);

    //Se ejecutará ciertos comandos en la fila del producto dependiento de la acción requerida
    listaCompras.addEventListener('click', ejecutarAccionArticulo);  

    //Se cargan los datos de la lista de compras desde Local Storage
    document.addEventListener('DOMContentLoaded', leerDatosListaComprasLocalStorage);
}


//Funciones

//Limpiar formulario
function limpiarFormulario(e){
    e.preventDefault();
    console.log('Limpiado Funciona');
}

//Recibe los datos del formulario productos
function enviarProductoLista(e){
    e.preventDefault();

    //Se reciben los datos del formulario de productos
    let nombreArticulo = document.getElementById('nombre-articulo').value;
    let cantidadArticulos = document.getElementById('cantidad-articulos').value;
    let um = document.getElementById('unidad-medida');
    let unidadMedidaArticulo = um.options[um.selectedIndex].text;

    //Se crea el botón de agregar precio
    const btnPrecioArticulo = document.createElement('a');
    btnPrecioArticulo.classList = 'agregar-precio';
    btnPrecioArticulo.innerText = 'Agregar Precio';

    //Se Crea el botón eliminar
    const btnEliminarArticulo = document.createElement('a');
    btnEliminarArticulo.classList = 'eliminar-articulo';
    btnEliminarArticulo.innerText = 'X';

    //Se crean las filas y las celdas
    const tr = document.createElement('tr');
    const tdNombreArticulo = document.createElement('td');
    const tdCantidadArticulos = document.createElement('td');
    const tdPrecioUnitario = document.createElement('td');
    const tdAccionPrecioArticulo = document.createElement('td');
    const tdEliminarArticulo = document.createElement('td');

    //Se asigna cada variable a su respectiva celda
    tdCantidadArticulos.innerText = `${cantidadArticulos} ${unidadMedidaArticulo}`; 
    tdNombreArticulo.innerText = nombreArticulo;
    tdPrecioUnitario.innerText = 'Sin precio';
    tdAccionPrecioArticulo.appendChild(btnPrecioArticulo);
    tdEliminarArticulo.appendChild(btnEliminarArticulo);

    //Se reunen todas las celdas en su fila
    tr.appendChild(tdCantidadArticulos);
    tr.appendChild(tdNombreArticulo);
    tr.appendChild(tdPrecioUnitario);
    tr.appendChild(tdAccionPrecioArticulo);
    tr.appendChild(tdEliminarArticulo);

    //Se crea la fila en la tabla
    listaCompras.appendChild(tr);

    //Se guardan los datos de cada artículo en Local Storage
    agregarArticuloLocalStorage(cantidadArticulos, unidadMedidaArticulo, nombreArticulo);
}


//Agregar artículos al Local Storage

function agregarArticuloLocalStorage(cantidadArticulos, unidadMedidaArticulo, nombreArticulo){
    let articulo;

    //Se lee artículos de la lista de compras desde Local Storage
    articulo = obtenerListaComprasLocalStorage();

    //Se guarda los datos del nuevo artículo en la lista de compras
    articulo.push(
        {
            cantidad: cantidadArticulos,
            unidad_medida: unidadMedidaArticulo,
            nombre: nombreArticulo,
            precio_unitario: 'Sin precio'
        });


    localStorage.setItem('articulo', JSON.stringify(articulo));
}


//Leer elementos de la lista de compras desde Local Storage

function obtenerListaComprasLocalStorage(){

    let articulo;

    //Revisa si hay datos en artículos desde Local Storage
    if (localStorage.getItem('articulo')=== null){
        articulo = [];
    }
    else{
        articulo = JSON.parse(localStorage.getItem('articulo'));
    }

    return articulo;
}

function leerDatosListaComprasLocalStorage(){
    let articulo;
    articulo = obtenerListaComprasLocalStorage();

    articulo.forEach(function(detalle, index){

        //Se crea el botón de agregar precio
        const btnPrecioArticulo = document.createElement('a');
        btnPrecioArticulo.classList = 'agregar-precio';
        btnPrecioArticulo.innerText = 'Agregar Precio';

        //Se Crea el botón eliminar
        const btnEliminarArticulo = document.createElement('a');
        btnEliminarArticulo.classList = 'eliminar-articulo';
        btnEliminarArticulo.innerText = 'X';

        //Se crean las filas y las celdas
        const tr = document.createElement('tr');
        const tdNombreArticulo = document.createElement('td');
        const tdCantidadArticulos = document.createElement('td');
        const tdPrecioUnitario = document.createElement('td');
        const tdPrecioArticulo = document.createElement('td');
        const tdEliminarArticulo = document.createElement('td');

        //Se asigna cada elemento del array a su respectiva celda
        tdCantidadArticulos.innerText = `${detalle.cantidad} ${detalle.unidad_medida}`; 
        tdNombreArticulo.innerText = detalle.nombre;
        tdPrecioUnitario.innerText = detalle.precio_unitario;
        tdPrecioArticulo.appendChild(btnPrecioArticulo);
        tdEliminarArticulo.appendChild(btnEliminarArticulo);

        //Se reunen todas las celdas en su fila
        tr.appendChild(tdCantidadArticulos);
        tr.appendChild(tdNombreArticulo);
        tr.appendChild(tdPrecioUnitario);
        tr.appendChild(tdPrecioArticulo);
        tr.appendChild(tdEliminarArticulo);
        
        //Se crea la fila en la tabla
        listaCompras.appendChild(tr);
    });
}

//Esta función determinará qué acción se realizará al hacer clic en ciertos comandos en cada fila
function ejecutarAccionArticulo(e){
    e.preventDefault();
    if (e.target.className === 'agregar-precio'){
        agregarPrecioArticulo();
    }
    else if(e.target.className === 'eliminar-articulo'){
        eliminarArticulo(e);
    }
}

//Función para cambiar precio del artículo incluido en lista de compras
function agregarPrecioArticulo(){
    let precioUnitarioProducto = prompt("Favor ingrese el valor unitario del producto");
    /* tdPrecioUnitario.innerText = precioUnitarioProducto; */
    /* console.log('Puedo agregar precio al artículo y hago lo que quiero XD'); */
}


function eliminarArticulo(e){
    let articulo;
    articulo = obtenerListaComprasLocalStorage();

    /* console.log(articulo[1]); */

    for (let x = 0; x <= articulo.length; x++){
        if(articulo[x].nombre == 'Carne Molida'){
            console.log('Funciona :D');
        }
        /* console.log(articulo[x].nombre); */
    }

    /* articulo.findIndex(function(detalle, e){
        if(detalle.nombre == 'Pasta de dientes'){
            console.log('Funciona :D');
        }
    }); */
    /* console.log(articulo); */

   /*  if (confirm("¿Está seguro de eliminar este artículo de su lista de compras?")){
        e.target.parentElement.parentElement.remove();
    };   */
}




