import * as default from 'google-spreadsheet';
// import { serviceAccountName, adminSheetId } from '../utils/Env';


export async function getSheetsApi(serviceAccountName: string, adminSheetId: string ): SheetsApi {
  const serviceFileContent = await fs.readFile(`../../auth/${serviceAccountName}.service.json`);
  const serviceFileJson = JSON.parse(serviceFileContent);

  const doc = new GoogleSpreadsheet(adminSheetId); 
  await doc.useServiceAccount(serviceFileJson)

  const info = await doc.getInfo();

  
  return true;
}