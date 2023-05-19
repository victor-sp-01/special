import api from "../helpers/api.js"
import { Hash } from "../helpers/Params.js"
import { getLocalStorage } from "../api/apiLocalStorage.js"
import Ele from "../libs/Ele.js"
import Loader from "../elements/Loader.js"
import getDataAsyncMessages from "../data/getDataAsyncMessages.js"
import setDataAsyncMessages from "../data/setDataAsyncMessages.js"
import getDataLocalMessages from "../data/getDataLocalMessages.js"
import LstMessage from "./LstMessage.js"

import ModalConfirm from "../elements/ModalConfirm.js"

const ContentMessage =async({ element = false, data = false } = {})=>{ 
    const { datauser } = getLocalStorage('Auth', {}, true)
    const _idMessage = Hash(1)
    const $Ele = new Ele({ element })
    $Ele.create(`
        <div class="div_Q9p0S">
            <div class="div_OQ4h8">
                <div class="div_sV1bn" >
                    <button class="button_M2yD6" data-action="cancel-selection" ><i class="fa-solid fa-xmark"></i></button>
                    <h3></h3>
                    <div class="div_eKDLt"></div>
                </div>
                <a class="a_6K8NM"><img src="${ api('files/avatar/' + data.avatarUserGet) }" class="imgCircle"></a>
                <h3>${ data.usernameGet }</h3>
                <button class="button_M2yD6" data-action="close-message" ><i class="fa-solid fa-xmark"></i></button> 
            </div>

            <div class="div_WuwwT">
                <div class="div_tgpzg" ></div>
            </div>

            ${ data.type !== 'W' 
                ? '' 
                :`
                    <form class="form_v8BKt" enctype="multipart/form-data">
                        <div class="div__5XlJf" >
                            <div class="div_wOFR4" >
                                <div class="div_WK5Q3 scrollX" > 
                                    <label class="label__7qhGw" >
                                        <input  type="file" accept="image/*" name="filesImage[]" multiple ><i class="fa-solid fa-image"></i>
                                    </label>
                                    <label class="label__7qhGw" >
                                        <input  type="file" accept="audio/*" name="filesAudio[]" multiple ><i class="fa-solid fa-headphones"></i></i>
                                    </label>
                                </div>
                                <div class="div_T7Fm0 scrollX"></div>
                            </div>
                            <span class="span__ZkcMX"></span>
                            <button type="button" class="button_7Jg1A" data-action="close-multimedia" ><i class="fa-solid fa-xmark"></i></button>
                        </div>
                        <div class="div_BhSSn" enctype="multipart/form-data" >
                            <input name="id" hidden>
                            <input name="idMessage" value="${_idMessage}" hidden>
                            <input name="idUserSet" value="${datauser.id}" hidden>
                            <input name="idUserGet" value="${data.idUserGet}" hidden>
                            <input name="dateTime" hidden>
                            <input name="imgs" hidden>

                            <label class="label__ebgC1" >
                                <textarea class="textarea__nl1oT" name="message" placeholder="mensaje" ></textarea>
                            </label>
                            
                            <button type="button" class="button__TCxrT" data-action="open-multimedia" ><i class="fa-solid fa-paperclip"></i></button>
                            <button type="submit" class="button__TCxrT" ><i class="fa-solid fa-paper-plane"></i></button>
                        </div>
                    </div>
                `
            }
            
        </div>            
    `)

    //VARIABLES
    const chatElementHTML = document.createElement('textarea')
    const limitRenderMessage = 100
    const chatTotal = []
    const chatLocal = []
    let   chatFocus = {}

    let typeSubmit      = 'add'
    let timeScrollbar   = false

    //ELEMENTS
    const elementContainerHeadOption    = $Ele.findChild('.div_sV1bn', true)
    const elementContentHeadOption      = $Ele.findChild('.div_eKDLt', true)
    const elementContainerMessage       = $Ele.findChild('.div_WuwwT', true)

    const elementContainerOptionMessages = $Ele.findChild('.div__5XlJf', true)
    const elementContainerOptionMessage = $Ele.findChild('.div_wOFR4', true)
    const elementContentOptionMessage   = $Ele.findChild('.div_T7Fm0', true)
    const elementFormMessage            = $Ele.findChild('.form_v8BKt', true)
    const elementTextMessage            = $Ele.findChild('textarea[name=message]', true)
    const elementFileImageMessage       = $Ele.findChild('input[name="filesImage[]"]', true)
    const elementFileAudioMessage       = $Ele.findChild('input[name="filesAudio[]"]', true)
    const elementOpenMultimedia         = $Ele.findChild('.button__TCxrT[data-action="open-multimedia"]', true)
    
    elementContainerMessage.addEventListener('scroll', (e)=> renderNewMessages(e))
    elementContainerMessage.addEventListener('click', (e)=> selectMessage(e))
    elementContentHeadOption.addEventListener('click', (e)=> {
        const trg = e.target.closest('.button_M2yD6')

        if( trg ){
            const _type = trg.dataset.type
            const ids   = JSON.parse(trg.dataset.id) 
            
            if( _type === 'update' ) return openUpdateMessage(ids)
            if( _type === 'delete' ) return openDeleteMessage(ids)
        }
    })
    elementFormMessage.addEventListener('submit', e => handleSubmitMessage(e))
    elementTextMessage.addEventListener("input", ()=> autoHeightMessage());
    elementFileImageMessage.addEventListener('change', e => openUploadFileImages(e))
    elementFileAudioMessage.addEventListener('change', ()=> {})
    elementOpenMultimedia.addEventListener( 'click', ()=> openMultimedia())

    $Ele.findChild('.button_7Jg1A[data-action="close-multimedia"]', true).addEventListener( 'click', ()=> closeMultimedia() )
    $Ele.findChild('.button_M2yD6[data-action="cancel-selection"]', true).addEventListener('click', ()=> cancelSelectMessage())
    $Ele.findChild('.button_M2yD6[data-action="close-message"]').addEventListener('click', ()=> {
        element.classList.remove('active')
        history.replaceState(null, null, '#message')
    })

    const renderMessages =(limit = limitRenderMessage, renderUp = true)=>{
        const chats = renderUp ? chatTotal.splice(-limit) : [] 
        chatLocal.unshift(...chats) 

        if( chatLocal.length === 0 ) return  elementContainerMessage.innerHTML = '<div class="div_tgpzg" ><img src="./img/icons/saludo.png"></div>'
        if( !$Ele.findChild('.div_OaE6E') ) elementContainerMessage.innerHTML = '<div class="div_OaE6E"></div>'

        $Ele.findChild('.div_OaE6E', true)[renderUp ? 'prepend' : 'append' ]( LstMessage( renderUp ? chats : chatLocal.slice(-limit) ))
    }

    const renderNewMessages = e =>{ 
        const trg = e.currentTarget
        trg.classList.add('active')

        if( timeScrollbar ) clearTimeout(timeScrollbar)
        timeScrollbar = setTimeout(()=> trg.classList.remove('active'), 500)
        
        if(chatTotal.length === 0 ) return
        
        const topTotal = trg.scrollHeight
        const topUpdate = -(trg.scrollTop) + trg.offsetHeight 
        
        if( (topTotal - topUpdate) <= 100 ) renderMessages()
    }

    const selectMessage = e =>{
        const trg = e.target

        if( !trg.classList.contains('a__zYRbn') ) return
        if( data.type !== 'W' ) return
        if( typeSubmit === 'update' ) return
        if( trg.dataset.iduserset !== datauser.id ) return

        trg.classList.contains('active') ? trg.classList.remove('active') : trg.classList.add('active') 
        typeSubmit = 'add'

        const messages  = $Ele.findChildren('.a__zYRbn.active')

        if( messages.length > limitRenderMessage ) {
            alert(`seleccion llegado al limite ${ limitRenderMessage }`)
            return trg.classList.remove('active')
        }  

        const id         = trg.dataset.id
        const idUserSet  = trg.dataset.iduserset === datauser.id
        const idMessages = [] 

        messages.length === 0 ? elementContainerHeadOption.classList.remove('active') : elementContainerHeadOption.classList.add('active') 
        for( const message of messages ) idMessages.push(message.dataset.id)
        
        $Ele.findChild('.div_sV1bn h3').textContent = idMessages.length
        elementContentHeadOption.innerHTML = `
            ${ idUserSet && messages.length === 1 ? `<button  class="button_M2yD6" data-id='${ JSON.stringify([id]) }' data-type="update" ><i class="fa-solid fa-pen"></i></button>` : '' }
            <button  class="button_M2yD6" data-id='${ JSON.stringify(idMessages) }' data-type="delete" ><i class="fa-solid fa-ban"></i></button>
        `
    }

    const cancelSelectMessage =()=>{
        if( typeSubmit === 'update' )
            elementFileImageMessage.value = elementFileImageMessage.value = ''

        typeSubmit = 'add'

        elementContainerHeadOption.classList.remove('active')
        elementContentHeadOption.innerHTML = ''

        const messages = $Ele.findChildren('.a__zYRbn.active')
        for(const message of messages)
            message.classList.remove('active') 
    }

    const openUpdateMessage =(ids)=>{
        const [ chat ] = chatLocal.filter( chat => ids.includes(chat.id) && chat )
        chatFocus = chat 
        elementOpenMultimedia.style.display = 'none'

        elementFormMessage.id.value = chat.id
        elementFileImageMessage.value = elementFileAudioMessage.value = ''
        elementFormMessage.dateTime.value = chat.dateTime
        chatElementHTML.innerHTML = chat.message 
        elementTextMessage.value = chatElementHTML.textContent
        elementTextMessage.focus() 
        typeSubmit = 'update'

        elementContainerOptionMessages.classList.add('active')
        elementContentOptionMessage.innerHTML = `<p>${ chatElementHTML.innerHTML }</p>`
        elementContainerOptionMessage.classList.add('edit')
        elementContainerHeadOption.classList.remove('active')
        elementContentHeadOption.innerHTML = ''
        
        autoHeightMessage() 
    }

    const openDeleteMessage =(ids)=>{
        elementContentHeadOption.classList.remove('active')
        ModalConfirm({
            message     : `¿ Eliminar <b>${ ids.length }</b> mensajes ?`,
            actionFalse : ()=>{ removeClassMessage() },
            actionTrue  : ()=>{
                const messages = $Ele.findChildren('.a__zYRbn.active')
                setDataAsyncMessages('deletes', {ids}, elementFormMessage ).then(()=> {
                    for(const message of messages) message.parentElement.remove()
                    chatLocal.push(...((chatLocal)=>{
                        const chatLocalCopy = chatLocal.slice()
                        chatLocal.splice(0)
                        return chatLocalCopy.filter( chat => !ids.includes(chat.id) )
                    })(chatLocal))
                    renderMessages(ids.length)
                })

            }
        })

        elementContainerHeadOption.classList.remove('active')
        elementContentHeadOption.innerHTML = ''
    }

    const openMultimedia =()=>{
        elementContainerOptionMessages.classList.toggle('active')
    }

    const closeMultimedia =()=>{
        elementContainerOptionMessages.classList.remove('active')
        elementFileImageMessage.value = elementFileAudioMessage.value = ''
        elementOpenMultimedia.style.display = 'initial'    

        if( typeSubmit === 'update' ) {
            $Ele.findChild('.a__zYRbn.active', true).classList.remove('active')
            elementContainerOptionMessage.classList = 'div_wOFR4'
            elementTextMessage.value = ''
            autoHeightMessage()
            console.log('aqui mira')
        } 
        elementContainerOptionMessage.classList = 'div_wOFR4'
        typeSubmit = 'add'
    }

    const autoHeightMessage =()=>{ 
        elementTextMessage.style.height = "20px";
        const scHeight                  = elementTextMessage.scrollHeight;
        elementTextMessage.style.height = `${scHeight}px`;
    }

    const openUploadFileImages = e =>{
        const trg = e.target 
        const files = trg.files; 
        
        if (files.length === 0) return elementContainerOptionMessages.classList.remove("active");
        elementContentOptionMessage.textContent = "";
    
        for (const file of files) {
            if( !file ) continue
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener("load", () => {
                const url = URL.createObjectURL(file);
                const img = document.createElement("img");
                img.setAttribute("src", url);
                elementContentOptionMessage.append(img);
            });
        }

        elementContainerOptionMessages.classList.add("active");
        $Ele.findChild('.div_wOFR4').classList.add('file')
        elementOpenMultimedia.style.display = 'none'
    }

    const handleSubmitMessage = async e =>{
        e.preventDefault() 
        
        elementTextMessage.focus()
        elementTextMessage.value = elementTextMessage.value.trim()

        if( elementTextMessage.value === '' 
            && elementFileImageMessage.value === '' 
            && elementFileAudioMessage.value === '' 
            && chatFocus.files.length === 0 ) return

        const _data = await setDataAsyncMessages(typeSubmit, { }, elementFormMessage )
        if( !_data ) return
        
        if( typeSubmit === 'update' ){  

            for (let index = 0; index < chatLocal.length; index++) {
                if( chatLocal[index].id !== elementFormMessage.id.value ) continue
                chatLocal[index] = _data
                break 
            }
 
            const message = $Ele.findChild('.a__zYRbn.active').closest('.div__s3T7q')
            message.replaceWith(LstMessage( [_data] ))
            typeSubmit = 'add' 
        } else {
            chatLocal.push(_data) 
            renderMessages(1, false)
            elementContainerMessage.scrollTo({ top: 0, behavior: 'smooth' })
        }   

        elementTextMessage.value = elementFileImageMessage.value = elementFileAudioMessage.value = '' 
        chatFocus = {}

        closeMultimedia()
    }

    const elemetEmptyMessages   = $Ele.findChild('.div_tgpzg', true)
    Loader( elemetEmptyMessages )

    const timeLimit             = setTimeout(()=> elemetEmptyMessages.innerHTML = '<img src="./img/icons/no-content.png">', 30000)

    const clearT = setTimeout( async ()=>{
        const dataLocalMessages     = data.mode === undefined ? [] : await getDataLocalMessages(_idMessage)
        const dataAsynMessages      = data.mode === 'local' ? [] : await getDataAsyncMessages(_idMessage)
        chatTotal.push(...dataLocalMessages, ...dataAsynMessages)
        clearTimeout(timeLimit)
        clearTimeout(clearT)
        renderMessages()
    }, 300) 

}   

export default ContentMessage 
