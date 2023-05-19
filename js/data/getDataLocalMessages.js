import indexDB from "../api/apiIndexedDB.js";
export default async (id) => {
  const db = new indexDB('messages')
  const dataLocal = await db.getItemAll()
  const dataJSON = await fetch("./js/JSON/messages.json");
  
  if(dataJSON.ok)
    return [ ...dataLocal, ...( await dataJSON.json()) ].filter(({ idMessage }) => idMessage === id ) 

  return [];
}; 