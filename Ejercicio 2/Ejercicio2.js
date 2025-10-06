// ejercicio2.js
const fs = require('node:fs/promises');
const path = require('path');

function obtenerTimestampFormateado() {
    const fechaActual = new Date();
    // Función de relleno para asegurar dos dígitos (ej: 5 -> 05)
    const formato = (num) => num.toString().padStart(2, '0');

    const fecha = [
        fechaActual.getFullYear(),
        formato(fechaActual.getMonth() + 1), 
        formato(fechaActual.getDate())
    ].join('-');

    const tiempo = [
        formato(fechaActual.getHours()),
        formato(fechaActual.getMinutes()),
        formato(fechaActual.getSeconds())
    ].join(':');

    return `[${fecha} ${tiempo}]`;
}

function esperar(ms) {
    return new Promise(resolver => setTimeout(resolver, ms));
}

const RUTA_ARCHIVO_INICIAL = path.join(__dirname, 'datos.txt');
const RUTA_NUEVO_ARCHIVO = path.join(__dirname, 'informacion.txt');
const TIEMPO_ESPERA_MS = 10000; // 10 segundos

async function Ejercicio2() {
    try {
        // 1: CREAR Y ESCRIBIR (fs.writeFile)
        const contenidoInicial = `Nombre: juan
        Edad: 20
        Carrera: Programación\n`;
        // fs.writeFile crea o sobrescribe el archivo de forma asíncrona
        await fs.writeFile(RUTA_ARCHIVO_INICIAL, contenidoInicial, 'utf8');
        console.log(`1: '${path.basename(RUTA_ARCHIVO_INICIAL)}' creado y escrito.`); 
        // 2: LEER E IMPRIMIR (fs.readFile)
        const contenidoLeido = await fs.readFile(RUTA_ARCHIVO_INICIAL, 'utf8');
        console.log(`\n--- Contenido actual de ${path.basename(RUTA_ARCHIVO_INICIAL)} ---`);
        console.log(contenidoLeido.trim());
        console.log('------------------------------------------------');
        
        // 3: AGREGAR FECHA (fs.appendFile)
        const timestamp = obtenerTimestampFormateado();
        const contenidoAdicional = `\nFecha de modificación: ${timestamp}`;
        // fs.appendFile añade contenido sin sobrescribir lo previo
        await fs.appendFile(RUTA_ARCHIVO_INICIAL, contenidoAdicional, 'utf8');
        console.log(`3: Fecha de modificación agregada.`);
        
        // 4: RENOMBRAR (fs.rename)
        await fs.rename(RUTA_ARCHIVO_INICIAL, RUTA_NUEVO_ARCHIVO);
        console.log(`4: Archivo renombrado a '${path.basename(RUTA_NUEVO_ARCHIVO)}'.`);
        
        // 5: ELIMINAR CON PAUSA (sleep + fs.unlink)
        console.log(`\n5: Esperando ${TIEMPO_ESPERA_MS / 1000} segundos para eliminar...`);
        await esperar(TIEMPO_ESPERA_MS); // Pausa asíncrona
        
        // Eliminación: debe usar la ruta del archivo renombrado
        await fs.unlink(RUTA_NUEVO_ARCHIVO); 
        console.log(`5: '${path.basename(RUTA_NUEVO_ARCHIVO)}' ELIMINADO de forma permanente.`);
        
    } catch (error) {
        // Manejo de Errores: fundamental para la estabilidad
        console.error('Ocurrió un error en el proceso:', error.message);
    }
}
// Ejecutar el script
Ejercicio2();