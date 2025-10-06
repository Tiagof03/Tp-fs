// ejercicio3.js
const fs = require('node:fs/promises');
const path = require('path');

const CONTACTS_FILE = path.join(__dirname, 'contactos.json');

async function getContactos() {
    try {
        const data = await fs.readFile(CONTACTS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return [];
        }
        console.error("Error al leer contactos:", error.message);
        throw error;
    }
}

async function saveContactos(contactos) {
    try {
        const jsonString = JSON.stringify(contactos, null, 2);
        await fs.writeFile(CONTACTS_FILE, jsonString, 'utf8');
    } catch (error) {
        console.error("Error al guardar contactos:", error.message);
        throw error;
    }
}

async function agregarContacto(nombre, telefono, email) {
    console.log(`\nAgregando contacto: ${nombre}...`);
    try {
        const contactos = await getContactos();
        const nuevoContacto = { nombre, telefono, email };
        contactos.push(nuevoContacto);
        await saveContactos(contactos);
        console.log(` Contacto agregado con éxito: ${nombre}.`);
    } catch (error) {
        console.error(` Falló la adición del contacto ${nombre}.`);
    }
}
async function mostrarContactos() {
    console.log("\n=============================");
    console.log("CONTACTOS ALMACENADOS:");
    try {
        const contactos = await getContactos();
        if (contactos.length === 0) {
            console.log("No hay contactos almacenados.");
            return;
        }
        console.table(contactos);
    } catch (error) {
        console.error(" No se pudieron mostrar los contactos.");
    }
    console.log("=============================");
}
async function eliminarContacto(nombreAEliminar) {
    console.log(`\n Eliminando contacto: ${nombreAEliminar}...`);
    try {
        const contactos = await getContactos();
        const contactosActualizados = contactos.filter(
            c => c.nombre !== nombreAEliminar
        );
        if (contactosActualizados.length === contactos.length) {
            console.log(` Advertencia: Contacto "${nombreAEliminar}" no encontrado.`);
            return;
        }
        await saveContactos(contactosActualizados);
        console.log(` Contacto "${nombreAEliminar}" eliminado con éxito.`);
    } catch (error) {
        console.error(`Falló la eliminación del contacto ${nombreAEliminar}.`);
    }
}
async function runTest() {
    console.log("--- INICIANDO EJERCICIO 3: MANEJO DE JSON ---");
    const initialData = [
        {
            "nombre": "Juan Pérez",
            "telefono": "123-456-7890",
            "email": "juan@utn.com"
        }
    ];
    await saveContactos(initialData);
    console.log(`Archivo '${path.basename(CONTACTS_FILE)}' inicializado con éxito.`);
    await agregarContacto('Carlos López', '987-654-3210', 'carlos@utn.com');
    await mostrarContactos();
    await eliminarContacto('Juan Pérez');
    await mostrarContactos();
}

runTest();