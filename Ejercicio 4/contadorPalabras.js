// contadorPalabras.js
const fs = require('node:fs/promises');
const path = require('path');

async function contadorPalabras() {
    const argumentos = process.argv.slice(2);
    const nombreArchivo = argumentos[0];
    const palabraBuscada = argumentos[1];

    if (!nombreArchivo || !palabraBuscada) {
        console.error("ERROR: Faltan argumentos.");
        console.log("Uso: node contadorPalabras.js <nombre_archivo> <palabra_a_buscar>");
        return; 
    }
    const rutaCompletaArchivo = path.join(__dirname, nombreArchivo);
    try {
        const contenido = await fs.readFile(rutaCompletaArchivo, 'utf8');
        const contenidoNormalizado = contenido.toLowerCase();
        const palabraNormalizada = palabraBuscada.toLowerCase();
        const regex = new RegExp(`\\b${palabraNormalizada}\\b`, 'g');
        const coincidencias = contenidoNormalizado.match(regex);
        const conteo = coincidencias ? coincidencias.length : 0;
        console.log(`\nLa palabra "${palabraBuscada}" aparece ${conteo} veces en el archivo "${nombreArchivo}".`);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(`❌ ERROR: El archivo "${nombreArchivo}" no fue encontrado en la ruta: ${rutaCompletaArchivo}`);
        } else {
            console.error(`❌ Ocurrió un error al procesar el archivo:`, error.message);
        }
    }
}
// Ejecutar la función principal
contadorPalabras();
//ejecución:
//node contadorPalabras.js archivo.txt palabras
