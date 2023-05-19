import api from "../helpers/api.js";
import { getData } from "../api/apiData.js";
import { getLocalStorage, setLocalStorage } from "../api/apiLocalStorage.js";
export default async()=>{
    const { token = false } = getLocalStorage('Auth', {}, true)  
    const data = await getData( api('token/' + token) )
    
    setLocalStorage('Auth', data, true) 
    if( !data )if( token ) location.reload()
} 