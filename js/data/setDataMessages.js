import indexDB from "../api/apiIndexedDB.js"
export default async ({ type = false, data = {}, form = false } = {})=>{
    const db = new indexDB('messages')
    if( type === 'get' ) return await db.getItemAll()
    if( type === 'delete' ) return await db.delete(data.id)
    if( type === 'deleteAll' ) return await db.deleteAll(data.ids)
    if( type === 'add' ){

        const nameFiles = [];
        const time = '' 
        const id = Date.now()

        for (const file of form.files.files) nameFiles.push(file.name);

        const _data = {
            id      : `${ id }`,
            idMessage : data.idMessage,
            idUserSet : form.idUserSet.value,
            idUserGet : form.idUserGet.value,
            date : time,
            time : time,
            dateTime : id,
            message : form.message.value,
            imgs    : nameFiles 
        } 

        return await db.put(_data) 
    }

    if( type === 'update' ){
        const nameFiles = [];
        const time = ''  

        for (const file of form.files.files) nameFiles.push(file.name);

        const _data = {
            id      : form.id.value,
            idMessage : data.idMessage,
            idUserSet : form.idUserSet.value,
            idUserGet : form.idUserGet.value,
            date : time,
            time : time,
            dateTime : +form.dateTime.value,
            message : form.message.value,
            imgs    : nameFiles 
        }  

        return await db.put(_data) 
    }
} 