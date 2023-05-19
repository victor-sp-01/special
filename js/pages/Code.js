import api from "../helpers/api.js";
import { Hash } from "../helpers/Params.js";
import { getData } from "../api/apiData.js";
import { getLocalStorage, setLocalStorage } from "../api/apiLocalStorage.js";
export default async ()=>{
    const { token } = getLocalStorage('Auth', false, true)
    if( token ) return 
    const hash = Hash()

    let codigo = ''

    if(hash.length < 2){
        codigo = prompt('ingrese el token')
    }
    else {
        codigo = hash[1]
    }

    console.log(codigo)

    const data = await getData( api('token/' + codigo))
    if( data ){
        setLocalStorage('Auth', data, true)
        location.hash = '#day'
    }
    
}