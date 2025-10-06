// copiaArchivos.js
const fs = require('node:fs/promises');
const path = require('path');

async function copiarArchivo() {
    const archivoOrigen = process.argv[2];
    const archivoDestino = process.argv[3];

    if (!archivoOrigen || !archivoDestino) {
        console.error(" ERROR: Faltan argumentos.");
        console.log("Uso: node copiaArchivos.js <archivo_origen> <archivo_destino>");
        return;
    }
    const rutaOrigen = path.join(__dirname, archivoOrigen);
    const rutaDestino = path.join(__dirname, archivoDestino);

    try {
        console.log(` Verificando la existencia de: "${archivoOrigen}"...`);
        await fs.access(rutaOrigen);
        console.log(`Copiando contenido de "${archivoOrigen}" a "${archivoDestino}"...`);
        await fs.copyFile(rutaOrigen, rutaDestino);
        console.log(`\n COPIA EXITOSA: El contenido de "${archivoOrigen}" ha sido copiado a "${archivoDestino}".`);

    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(`\n ERROR: El archivo de origen ("${archivoOrigen}") no fue encontrado en la ruta especificada.`);
        } else {
            console.error(`\n ERROR: No se pudo completar la copia. Detalles:`, error.message);
        }
    }
}
copiarArchivo();

// Ejemplo de uso:
// node copiarArchivos.js origen.txt copia.txt funciona
// node copiarArchivos.js archivoOrigen.txt archivoDestino.txt prueba error
