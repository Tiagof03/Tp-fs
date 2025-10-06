// contadorPalabras.js

// Importamos el módulo FS con soporte de Promesas para lectura asíncrona
const fs = require('node:fs/promises');
const path = require('path');

/**
 * Función principal asíncrona que lee un archivo y cuenta la ocurrencia de una palabra.
 */
async function contadorPalabras() {
    // 1. OBTENER ARGUMENTOS
    // process.argv contiene: [ruta_node, ruta_script, arg1, arg2, ...]
    const argumentos = process.argv.slice(2);
    
    const nombreArchivo = argumentos[0];
    const palabraBuscada = argumentos[1];

    // --- MANEJO INICIAL DE ERRORES DE ARGUMENTOS ---
    if (!nombreArchivo || !palabraBuscada) {
        console.error("❌ ERROR: Faltan argumentos.");
        console.log("Uso: node contadorPalabras.js <nombre_archivo> <palabra_a_buscar>");
        return; // Salimos de la función si los argumentos son insuficientes.
    }
    
    // 2. CONSTRUIR RUTA DEL ARCHIVO
    // Usamos path.join para resolver la ruta de forma segura.
    const rutaCompletaArchivo = path.join(__dirname, nombreArchivo);

    // --- MANEJO DE ERRORES DEL SISTEMA DE ARCHIVOS (try...catch) ---
    try {
        // 3. LEER EL ARCHIVO
        // readFile: Lectura asíncrona no bloqueante.
        const contenido = await fs.readFile(rutaCompletaArchivo, 'utf8');

        // 4. PROCESAR Y CONTAR
        // Normalizamos el texto (a minúsculas) para que la búsqueda no distinga mayúsculas/minúsculas
        const contenidoNormalizado = contenido.toLowerCase();
        const palabraNormalizada = palabraBuscada.toLowerCase();

        // Creamos una expresión regular (RegExp) para buscar la palabra completa y globalmente
        // La 'g' es para búsqueda global, la 'i' ya está cubierta por la normalización.
        const regex = new RegExp(`\\b${palabraNormalizada}\\b`, 'g');
        
        // Usamos .match() para obtener todas las coincidencias
        const coincidencias = contenidoNormalizado.match(regex);
        
        // El conteo es la longitud del array de coincidencias (o 0 si es null)
        const conteo = coincidencias ? coincidencias.length : 0;

        // 5. IMPRIMIR RESULTADO
        console.log(`\nLa palabra "${palabraBuscada}" aparece ${conteo} veces en el archivo "${nombreArchivo}".`);

    } catch (error) {
        // Implementar Manejo de Errores: Capturamos fallos en la lectura del archivo.
        if (error.code === 'ENOENT') {
            console.error(`❌ ERROR: El archivo "${nombreArchivo}" no fue encontrado en la ruta: ${rutaCompletaArchivo}`);
        } else {
            console.error(`❌ Ocurrió un error al procesar el archivo:`, error.message);
        }
    }
}

// Ejecutar la función principal
contadorPalabras();