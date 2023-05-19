import { Hash } from "../helpers/Params.js"
import Ele from "../libs/Ele.js"
import getDataPictures from "../data/getDataPictures.js"
import LoaderHeart from "../elements/LoaderHeart.js"

export default async ()=>{
    const $Ele = new Ele({ classID : '#root' })
    $Ele.create(`
        <div class="div_BguEq scrollY" >    
            <div class="div_amFav"></div>
            <a href="#picture" class="buttonPrimary" ><i class="fa-solid fa-arrow-left"></i></a>
            <div class="div_cQLNn" ></div>
            <div class="div_5K2Cj scrollX">
                <div class="div_eKDdN"></div>
            </div> 
        </div>
    `)

    //elementos
    const eleBlurImage      = $Ele.findChild('.div_amFav')
    const eleMainImage      = $Ele.findChild('.div_cQLNn')
    const eleContainerImage = $Ele.findChild('.div_5K2Cj')
    const eleContentImages  = $Ele.findChild('.div_eKDdN')

    LoaderHeart(eleMainImage)

    const hash      = Hash()
    const datas     = (await getDataPictures(hash[1])).filter( data => data.active === true )
    const datas2    = datas.filter( data => data.id === hash[2] ) || []
    const [dataID]  = datas2.length > 0 ? datas2 : datas

    eleBlurImage.innerHTML = eleMainImage.innerHTML = `<img src="./img/perfil/gallery/${ dataID.idPicture }/${ dataID.name }.${ dataID.extension }">` 

    eleContentImages.innerHTML = datas.map( (data, i) => { 
        const focus = hash[2] ? hash[2] : i === 0 ? data.id : false 
        return `
            <button class="button_gGp1A ${ data.id === focus ? 'focus' : '' }" data-id="${ data.id }" >
                <img src="./img/perfil/gallery/${ data.idPicture }/${ data.name }.${ data.extension }">
            </button> 
        `
    }).join('')
 
    const Images        = $Ele.findChildren('.button_gGp1A')
    const limitImage    = (eleContainerImage.scrollWidth - eleContainerImage.offsetWidth) / (Images.length - 1)
    let incrementar     = 0
    let innerImageScroll    = false
    let timeInnerImageScroll = null

    eleContentImages.addEventListener('click', e => {
        const trg = e.target.closest('.button_gGp1A')
        
        if( trg ){
            if( trg.classList.contains('focus') ) return
            innerImageScroll = false
            clearTimeout(timeInnerImageScroll)
            timeInnerImageScroll = setTimeout(()=> innerImageScroll = true, 500)

            const buttons = [...$Ele.findChildren('.button_gGp1A')]
            const indexButton = buttons.indexOf(trg)

            $Ele.findChild('.button_gGp1A.focus', true).classList.remove('focus')
            trg.classList.add('focus')
            eleContainerImage.scrollTo({ left: (limitImage * indexButton), behavior: 'smooth' })
            eleBlurImage.innerHTML = eleMainImage.innerHTML = trg.innerHTML

            history.replaceState(null, null,`#picture/${ hash[1] }/${ trg.dataset.id }`)
        }
    })

-    eleContainerImage.addEventListener('scroll', e => {
        if( !innerImageScroll ) return

        const trg = e.target
        const limit = trg.scrollLeft + (limitImage/ 2) 
        let i = 0

        for (let index = limitImage; index < limit; index+=limitImage) i++ 
        if( incrementar === i ) return
        incrementar = i

        $Ele.findChild('.button_gGp1A.focus', true).classList.remove('focus')
        $Ele.findChildren('.button_gGp1A')[i].classList.add('focus')
        eleBlurImage.innerHTML = eleMainImage.innerHTML = `<img src="./img/perfil/gallery/${ datas[i].idPicture }/${ datas[i].name }.${ datas[i].extension }">`
         
    })

    const buttons       = [...$Ele.findChildren('.button_gGp1A')]
    const indexButton   = buttons.indexOf($Ele.findChild('.button_gGp1A.focus', true))
    eleContainerImage.scrollTo({ left: (limitImage * indexButton) })
    clearTimeout(timeInnerImageScroll)
    timeInnerImageScroll = setTimeout(()=> innerImageScroll = true, 500)
}