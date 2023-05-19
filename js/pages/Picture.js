import { Hash } from "../helpers/Params.js"
import Ele from "../libs/Ele.js"
import ContentPictures from "../components/ContentPictures.js"
import getDataPicture from "../data/getDataPicture.js"
import getDataPictures from "../data/getDataPictures.js" 

export default async ()=>{

    const hash = Hash()
    if( hash.length > 1 ) return ContentPictures() 

   const $Ele = new Ele({classID:'#main'})
   $Ele.create(`
    <div class="div_UGuhX scrollY">
        <div class="div_kNTPG">
            <img src="./img/perfil/gallery/wallpaper.jpg">
        </div>
        <div class="div_lYaqk"> 
            <header class="header_VFOij">
                <h3></h3>
            </header>
            <div class="div_fNZOv"></div>
        </div>
        <a href="#" class="button_iyguI menu"><i class="fa-solid fa-arrow-left"></i></a>
    </div>
   `) 
    
   const dataMain = await getDataPicture()
   const datasAll = await getDataPictures()

   const datas  = dataMain.map(data => {
        let cantidad = 0

        const [ datas2 ] = datasAll.filter(data2 =>{
            if( data2.idPicture === data.id ){
                if( data2.active ) cantidad++
                if( data2.focus ) return data2
            }
            return
        }) || []
 
        return {
            ...data,
            cantidad,
            image : `${ datas2.name }.${ datas2.extension  }`
        } 
   })

   $Ele.findChild('.div_fNZOv').innerHTML = datas.map(data => {
    return `
        <a href="#picture/${ data.id }" class="a_tOXVY" >
            <img src="./img/imgs/cuadrado.png" >
            <img src="./img/perfil/gallery/${ data.id }/${ data.image }" alt="pic-not-found" class="imgPicture" >
            <div class="div_zQx3E" >
                <h5>${ data.name }</h5>
                <span>${ data.cantidad }</span>
            </div>
        </a>
    `
   }).join('')

}

