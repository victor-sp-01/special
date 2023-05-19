import api from "../helpers/api.js";
import { getData } from "../api/apiData.js"
import { getLocalStorage } from "../api/apiLocalStorage.js";
export default async ()=>{
    const { token, datauser } = getLocalStorage('Auth', {}, true) 
    return await getData( api(`message/${ datauser.id }?token=${ token }`) )
}
