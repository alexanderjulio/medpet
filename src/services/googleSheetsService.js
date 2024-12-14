import path from 'path';
import { google } from 'googleapis';
import config from "../config/env.js";

const sheets = google.sheets('v4');

async function addRowToSheet(auth, spreadsheetId, values) {
    const request = {
        spreadsheetId,
        range: 'reservas',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
            values: [values],
        },
        auth,
    }

    try {
        const response = await sheets.spreadsheets.values.append(request).data;
        return response;
    } catch (error) {
        console.error(error)
        throw new Error('Error al agregar datos a la hoja de cálculo.');
    }
}

const appendToSheet = async (data) => {
    try {
        //const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
        //credentials.private_key = credentials.private_key.replace(/\\n/g, '\n'); // Reparar saltos de línea

        const auth = new google.auth.GoogleAuth({
            keyFile: path.join(__dirname, 'src/config', 'env.js'),
            scopes: ['https://www.googleapis.com/auth/spreadsheets']
        });

        const authClient = await auth.getClient();
        const spreadsheetId = '1Cs3FxmPksIpoJFErB7DXEJWKNI9nW57ai2bUYBe-LT0'

        await addRowToSheet(authClient, spreadsheetId, data);
        return 'Datos correctamente agregados'
    } catch (error) {
        console.error(error);
    }
}

export default appendToSheet;