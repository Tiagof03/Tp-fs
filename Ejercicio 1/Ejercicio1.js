//Ejercicio 1
const fs = require('node:fs/promises');
const path = require('path');

const LOG_FILE = path.join(__dirname, 'log.txt');
const TAREA_DURACION_MS = 5000;

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

// Implementa fs.appendFile() (asíncrono) para registros de logs
async function log(message) {
    const timestamp = obtenerTimestampFormateado();
    const logEntry = `${timestamp} - ${message}\n`;

    try {
        // Escritura no bloqueante 
        await fs.appendFile(LOG_FILE, logEntry, 'utf8');
    } catch (error) {
        // Manejo de errores implementado 
        console.error('Error al escribir en el archivo de log:', error);
    }
}

// Función asíncrona para simular la pausa (no bloqueante).
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    console.log("Iniciando programa y registro de log...");
    try {
        await log("Inicio del programa");
        await log("Ejecutando tarea...");

        console.log(`Tarea en curso. Esperando ${TAREA_DURACION_MS / 1000} segundos...`);
        await sleep(TAREA_DURACION_MS);

        await log("Tarea completada");
        console.log("Proceso finalizado. El archivo 'log.txt' ha sido actualizado.");

    } catch (error) {
        console.error('Ocurrió un error inesperado en el proceso principal:', error);
    }
}

main();
