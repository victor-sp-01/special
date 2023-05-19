import { getLocalStorage } from "../api/apiLocalStorage.js"
import Inicio2 from "./Inicio2.js"
import Inicio3 from "./Inicio3.js"
export default ()=>{

    const { token, datauser } = getLocalStorage('Auth', {}, true) 
     
    const date = new Date()
    const month = date.getMonth() + 1
    const day  = date.getDate() 

    const validate = parseInt(month + '' + day) 
    if( token ){
        const userbirthdate = new Date(+datauser.birthdate)
        const monthUser = userbirthdate.getMonth() + 1
        const dayUser  = userbirthdate.getDate()
        const validateUser = parseInt(monthUser + '' + dayUser)

        if(  validate === validateUser ){
            return Inicio3()
        }

    } 
    
    Inicio2()
 
} 