import path from 'path';
import { google } from 'googleapis';
import config from "../config/env.js";

const sheets = google.sheets('v4');
//const { GOOGLE_CREDENTIALS, SHEET_ID } = require('../config/env.js');

// Parsear las credenciales (porque están almacenadas como JSON en el archivo .env)
//const credentials = JSON.parse(GOOGLE_CREDENTIALS);

// Parsear credenciales de la variable de entorno
// const credentials = process.env.GOOGLE_CREDENTIALS;

async function addRowToSheet(auth, spreadsheetId, range, values) {
    const request = {
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
            values: [values],
        },
        auth,
    }

    try {
        const response = await sheets.spreadsheets.values.append(request);
        return response.data;
    } catch (error) {
        console.error(error)
        throw new Error('Error al agregar datos a la hoja de cálculo.');
    }
}

const appendToSheet = async (data) => {
    try {
        //const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
        const auth = new google.auth.GoogleAuth({
            keyFile: path.join(process.cwd(), 'src/config', 'env.js'),
            scopes: ['https://www.googleapis.com/auth/spreadsheets']
        });

        const authClient = await auth.getClient();
        const spreadsheetId = config.SHEET_ID

        await addRowToSheet(authClient, spreadsheetId, data);
        return 'Datos correctamente agregados'
    } catch (error) {
        console.error(error);
    }
}

export default appendToSheet;