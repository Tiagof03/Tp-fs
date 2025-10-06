// log_manager.js

const fs = require('node:fs/promises');
const path = require('path');

const LOG_DIR = path.join(__dirname, 'logs');
const LOG_FILE = path.join(LOG_DIR, 'app.log');
const MAX_LINES_TO_SHOW = 5;

function obtenerTimestampFormateado() {
    const fechaActual = new Date();
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
async function registrarEjecucion() {
    try {
        await fs.mkdir(LOG_DIR, { recursive: true });
        const timestamp = obtenerTimestampFormateado();
        const mensajeLog = `${timestamp} - Ejecución exitosa.\n`;
        await fs.appendFile(LOG_FILE, mensajeLog, 'utf8');
        console.log(`Log registrado con éxito en: ${path.basename(LOG_FILE)}`);
    } catch (error) {
        console.error("Error durante el registro de ejecución:", error.message);
    }
}
async function mostrarUltimosLogs() {
    try {
        console.log(`\n--- ÚLTIMAS ${MAX_LINES_TO_SHOW} EJECUCIONES REGISTRADAS ---`);
        const contenido = await fs.readFile(LOG_FILE, 'utf8');

        let lineas = contenido.split('\n').filter(line => line.trim() !== '');
        if (lineas.length === 0) {
            console.log("El archivo de log está vacío.");
            return;
        }
        const ultimasLineas = lineas.slice(-MAX_LINES_TO_SHOW);
        ultimasLineas.forEach(line => console.log(line));
        console.log("--------------------------------------------");
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(`El archivo de log (${path.basename(LOG_FILE)}) aún no existe o no tiene registros.`);
        } else {
            console.error(" Error al leer los logs:", error.message);
        }
    }
}
async function main() {
    console.log("--- INICIANDO GESTOR DE LOGS ---");
    await registrarEjecucion();
    await mostrarUltimosLogs();
}
main();