import api from "../helpers/api.js";
import Ele from "../libs/Ele.js"
import { getLocalStorage } from "../api/apiLocalStorage.js";
import { dateUTCToHoursAMPM } from "../functions/fechas.js"; 
const LstMessage =( menssages )=>{

    const { datauser } = getLocalStorage('Auth', {}, true)
    const idUserSet = datauser.id;
    const lstMessage = document.createDocumentFragment()
    const chatElementHTML = document.createElement('textarea')

    menssages.forEach((chat, i) => {
        chat.files = typeof chat.files === 'string' ? JSON.parse(chat.files) : chat.files
        const position = chat.idUserSet === idUserSet ? "right" : "";
        const topUser = i === 0 || chat.idUserSet !== menssages[i - 1].idUserSet 
            ? true 
            : false;

        const bottomUser = i === menssages.length - 1 || chat.idUserSet !== menssages[i + 1].idUserSet
            ? true
            : false;

        const classTopUSer = !topUser && !bottomUser
            ? "topBottom"
            : !topUser
            ? "top"
            : !bottomUser
            ? "bottom"
            : "";

        const htmlMessageFiles =( files )=>{
            const _api = api('files/message') 
            let htmlImages = ''
            let htmlAudios = ''

            let iImages = 0
            let iAudios = 0

            files.forEach(file => {
                if( file.type === 'image' ){
                    ++iImages 
                    return htmlImages += `<img src="${ _api }/image/${file.id}.${file.extension}">`
                } 
                if( file.type === 'audio' ){
                    ++iAudios
                    return htmlAudios+= `
                        <audio controls="" name="media">
                            <source src="${ _api }/audio/${file.id}.${file.extension}" type="audio/mpeg">
                            <source src="${ _api }/audio/${file.id}.${file.extension}" type="audio/ogg">
                            <source src="${ _api }/audio/${file.id}.${file.extension}" type="audio/wav">
                            El audio no se puede reproducir
                        </audio>
                    `
                }
            });

            const valImages = iImages > 2 ? iImages % 2 : 0
            const classImages = (files.length >= 3 ? "image" : '') + ' ' + ( valImages === 0 ? '' : 'end' ) 
            const classAudios = 'audio'

            if( htmlImages !== '' ) htmlImages = `<div class="div_uqfg0 ${ classImages }">${ htmlImages }</div>`
            if( htmlAudios !== '' ) htmlAudios = `<div class="div_uqfg0 ${ classAudios }">${ htmlAudios }</div>` 

            const html = htmlImages + htmlAudios

            const classFile = (chat.message === '' && iAudios > 0 ? 'audio' : '')
            return `<div class="div__EnM97 ${ classFile }" >${ html }</div>`
        } 
 
        const $element = new Ele({ element: lstMessage });
        $element.create(`
            <div class="div__s3T7q ${position} ${ classTopUSer }" >
                <a class="a__zYRbn ${classTopUSer}" data-id="${chat.id || ''}" data-idUserSet="${chat.idUserSet || ''}" ></a>
                <div class="div__Dnziu ${classTopUSer}" >
                    ${ chat.files.length === 0 ? "" : htmlMessageFiles(chat.files) }
                    <div class="div_NwH0d ${ chat.message === '' ? 'hidden' : '' }">
                        ${ chat.message !== '' ? '<p></p>' : '' }
                        <span >${chat.dateTime ? dateUTCToHoursAMPM(chat.dateTime) : chat.time}</span>
                    </div>
                </div>
            </div>
        `)

        chatElementHTML.innerHTML = chat.message
        $element.findChild('.div__Dnziu p', true).textContent = chatElementHTML.textContent 

    });

    return lstMessage 
}

export default LstMessage