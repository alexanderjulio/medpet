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
        const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
        credentials.private_key = credentials.private_key.replace(/\\n/g, '\n'); // Reparar saltos de línea

        /*const credentials = {
            type: process.env.GOOGLE_TYPE,
            project_id: process.env.GOOGLE_PROJECT_ID,
            private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Convertir saltos de línea escapados
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            client_id: process.env.GOOGLE_CLIENT_ID,
            auth_uri: process.env.GOOGLE_AUTH_URI,
            token_uri: process.env.GOOGLE_TOKEN_URI,
            auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_CERT_URL,
            client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT_URL,
            universe_domain: process.env.UNIVERSE_DOMAIN,
        }*/

        const auth = new google.auth.GoogleAuth({
            credentials,//keyFile: path.join(process.cwd(), 'src/config', 'env.js'),
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