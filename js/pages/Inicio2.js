import { Hash } from "../helpers/Params.js"
import Ele from "../libs/Ele.js" 
import { getLocalStorage } from "../api/apiLocalStorage.js"
export default ()=>{

    const auth = getLocalStorage('Auth', false, true) 
    
    const $Ele = new Ele({classID:'main'})
    $Ele.create(`
        <div class="div_lpKZv scrollY">
            <div class="div_V7p8Y">
                <a href="#user" class="button_5fozh" ><i class="fa-solid fa-user"></i></a>
                <div class="div_QofxS"></div>
                <a class="button_5fozh"><i class="fa-solid fa-gear"></i></a>
            </div>
        </div>
    `)
 
    const hash = Hash(0)

    const Pages = [
        { id: "message", icon: '<i class="fa-solid fa-comments"></i>' },
        // { id: "game", icon: '<i class="fa-solid fa-gamepad"></i>' },
        { id: "picture", icon: '<i class="fa-solid fa-image"></i>' },
    ];

    const PagesNotLogin = [
        // { id: "game", icon: '<i class="fa-solid fa-gamepad"></i>' },
    ];

    $Ele.findChild('.div_QofxS').innerHTML = ( auth ? Pages : PagesNotLogin).map(({id, icon}) => {
        const currentPage = hash[0] || ''
        return `
            <a href="#${ id }" class="button_5fozh${ id === currentPage ? ' focus' : '' }">${ icon }</a>
        `
    }).join('')
 
} 