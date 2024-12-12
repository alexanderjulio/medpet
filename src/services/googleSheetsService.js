import path from 'path';
import { google } from 'googleapis';
import config from "../config/env.js";

const sheets = google.sheets('v4');
const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);

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
        const response = (await sheets.spreadsheets.values.append(request).data);
        return response;
    } catch (error) {
        console.error(error)
    }
}

const appendToSheet = async (data) => {
    try {
        const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: ['https://www.googleapis.com/auth/spreadsheets']
        });

        const authClient = await auth.getClient();
        const spreadsheetId = process.env.SHEET_ID

        await addRowToSheet(authClient, spreadsheetId, data);
        return 'Datos correctamente agregados'
    } catch (error) {
        console.error(error);
    }
}

export default appendToSheet;