import api from "../helpers/api.js"
import { getData } from "../api/apiData.js"
import { getLocalStorage } from "../api/apiLocalStorage.js"
export default async (id)=>{
    const { token } = getLocalStorage('Auth', {}, true)
    return await getData(api(`messages/${ id }?token=${ token }`))
}