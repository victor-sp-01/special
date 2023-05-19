import api from "../helpers/api.js"
import { setData } from "../api/apiData.js"
import { getLocalStorage } from "../api/apiLocalStorage.js";
export default async ( type, data, form )=>{
    const { token } = getLocalStorage('Auth', {}, true) 
    if( type === 'add' ){

        // const imgs = [];
        // for (const img of form.files.files) imgs.push(img.name);

        form.dateTime.value = Date.now()
        // form.imgs.value = JSON.stringify(imgs)

        const _data = new FormData(form)
        const _link = api('add/messages?token=' + token)

        const dataID = await setData(_data, _link)
        if( !dataID ) return false
        
        return {
            id          : `${ dataID.id }`,
            idMessage   : form.idMessage.value,
            idUserSet   : form.idUserSet.value,
            idUserGet   : form.idUserGet.value,
            dateTime    : form.dateTime.value,
            message     : form.message.value,
            files       : dataID.files  
        } 
    }

    if( type === 'update' ){
        // const imgs = [];
        // for (const img of form.files.files) imgs.push(img.name);

        form.dateTime.value = Date.now()
        // form.imgs.value = JSON.stringify(imgs)

        const _data = new FormData(form)
        const _link = api( `update/messages/${ form.id.value }?token=${ token }` ) 

        const dataID = await setData(_data, _link)
        if( !dataID ) return false
       
        return {
            id          : form.id.value,
            idMessage   : form.idMessage.value,
            idUserSet   : form.idUserSet.value,
            idUserGet   : form.idUserGet.value,
            dateTime    : form.dateTime.value,
            message     : form.message.value,
            files       : dataID.files
        }
    }

    if( type === 'deletes' ){
        const _data  = JSON.stringify({ ids : data.ids })
        const _link = api( `deletes/messages/${ form.idUserSet.value }?token=${ token }` ) 
        return await setData(_data, _link) 

    } 

    return false
}