import { Hash } from "../helpers/Params.js"
import { getLocalStorage } from "../api/apiLocalStorage.js"
import Inicio from "../pages/Inicio.js"
import Message from "../pages/Message.js"
import Game from "../pages/Game.js"
import Day from "../pages/Day.js"
import Picture from "../pages/Picture.js"
import User from "../pages/User.js" 
import Code from "../pages/Code.js"

const Routes =()=>{
    const hash = Hash()
    const ruta = hash[0] || ''

    const auth = getLocalStorage('Auth', false, true) 
    if(['user', 'day', 'message'].includes(hash[0]) && !auth ) return location.hash = '#' 
    if(['code'].includes(hash[0]) && auth ) return location.hash = '#' 
 
    if( ruta === '' ) return Inicio()
    if( ruta === 'message' ) return Message()
    if( ruta === 'game' ) return Game()
    if( ruta === 'day' ) return Day()
    if( ruta === 'picture' ) return Picture()
    if( ruta === 'user' ) return User() 
    if( ruta === 'code' ) return Code()
}

export default Routes