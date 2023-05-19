import { Hash } from "../helpers/Params.js" 
import api from "../helpers/api.js"
import Ele from "../libs/Ele.js"
import getDataLocalMessage from "../data/getDataLocalMessage.js"
import ContentMessage from "../components/ContentMessage.js" 
import getDataAsynMessage from "../data/getDataAsynMessage.js"

export default async ()=>{
    
    const hash = Hash() 
    const $Ele = new Ele({classID:'#main'})
    $Ele.create(`
        <div class="div_oT3YG" >
            <div class="div_wmVT1"> 
                <div class="div_kKxtZ">
                    <a href="#" class="button_5fozh" ><i class="fa-solid fa-arrow-left"></i></a> 
                </div>
                <div class="div_frsOR">
                    <div class="div_U7x3k"></div>
                </div>
            </div>
            <div class="div_bIPDq ${ hash.length >= 2 ? 'active' : '' }">
                <div class="div_tgpzg" >
                    <img src="./img/icons/buscar.png">
                </div>
            </div>
        </div>
    `) 
    //CALL CONTENT MESSAGE
    const elementContainerUser  = $Ele.findChild('.div_U7x3k')
    const elementContainerMessage = $Ele.findChild('.div_bIPDq')
    
    //LOAD CHATS USER
    const messageslocal = await getDataLocalMessage() 
    const messagesAsync = await getDataAsynMessage() 
    const messages = [...messageslocal, ...messagesAsync]

    const renderMessage =( id )=>{
        elementContainerMessage.classList.add('active')
        const [ data ] = messages.filter( message => message.id === id ) || [] 
        
        if( !data ) return elementContainerMessage.innerHTML =  `
            <div class="div_tgpzg" >
                <a href="#message" class="button_iyguI menu small"><i class="fa-solid fa-arrow-left"></i></a>
                <img src="./img/icons/no-content.png">
            </div>
        `
        
        elementContainerMessage.innerHTML = ''
        ContentMessage({ element : elementContainerMessage, data })
    }

    elementContainerUser.innerHTML = messages.map( message => {
        //${ message.id === hash[1] ? ' focus' : '' }
        return `
            <button class="button_3KfIS" data-id="${ message.id }" >
                <img src="${ api('files/avatar/'+message.avatarUserGet)  }">
                <h3>${ message.usernameGet }</h3>
            </button>
        `
    }).join('')

    //change Message USER
    elementContainerUser.addEventListener('click', e => {
        const trg = e.target.closest('.button_3KfIS')
        
        if( trg ){
            if( trg.classList.contains('focus') ) return
            $Ele.findChild( '.button_3KfIS.focus', true ).classList.remove('focus')
            //trg.classList.add('focus')

            const idMessage = trg.dataset.id
            history.replaceState(null, null, `#message/${ idMessage }`)
            renderMessage(idMessage)
        }
         
    })

    if( hash.length >= 2 ) return renderMessage(hash[1]) 
} 