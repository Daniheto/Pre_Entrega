// Pre-Entrega - Daniel Hernández

const API = "https://fakestoreapi.com/products";

// Definición de las funciones para interactuar con la API
async function listadoProductos() {
    try {
        const response = await fetch(API);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error al listae los productos:", error);
    }
}

async function listadoProductosPorId(identificador) {
    try {
        const response = await fetch(API + `/${identificador}`);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error al listar el producto por ID:", error);
    }
}

async function agregarProducto(productoNuevo) {
    try {
        const response = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productoNuevo),
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error al agregar el producto:", error);
    }
}

async function borrarProducto(identificador) {
    try {
        const response = await fetch(API + `/${identificador}`, {
            method: "DELETE",
        });
        if (response.ok) {
            console.log("Producto borrado con éxito");
        } else {
            console.error("Error al borrar el producto");
        }
    } catch (error) {
        console.error("Error al borrar el producto:", error);
    }
}

// Manejo de argumentos de la línea de comandos
const comandos = process.argv.slice(2);

const comando1 = comandos[0];
const comando2 = comandos[1];

const comando2Split = comando2.split('/');
const id = parseInt(comando2Split[1])

const titulo = comandos[2]
const precio = parseFloat(comandos[3])
const categoria = comandos[4]


const producto = {
    title : titulo, 
    price: precio, 
    category: categoria}


// Validación de comandos y ejecución de funciones
if (comando1 === "GET" && comando2 === "products") {
        listadoProductos();
    }
    else if (comando1 === "GET" && comando2Split[0] === "products" && (id > 0 && id < 21)) {
        listadoProductosPorId(id);
    } 
    else if (comando1 === "POST" && comando2Split[0] === "products" && typeof titulo === "string" && typeof precio === "number" && typeof categoria === "string") {
        agregarProducto(producto);
    }
    else if (comando1 === "DELETE" && comando2Split[0] === "products" && (id > 0 && id < 21)) {
        borrarProducto(id)
    }
    else {
        console.log("Comando no reconocido o ID fuera de rango");    
    }