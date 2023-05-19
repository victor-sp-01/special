import { getLocalStorage, setLocalStorage } from "../api/apiLocalStorage.js"
import Ele from "../libs/Ele.js"
import updatePage from "../routes/updatePage.js"
import getDataNumber from "../data/getDataNumber.js"

export default ( typeModalGame = 'play' )=>{
    //DATA
    const DataNumber = getLocalStorage('DataNumber', {}, true) 

    //CONTENEDOR DE Elementos
    const ContainerTabs = document.createDocumentFragment()

    //CONTENEDOR OPCIONES
    const category = DataNumber[typeModalGame].type
    const limitRange = DataNumber[typeModalGame].limit 
    const lstDataNumber = getDataNumber( category )

    const $Element = new Ele({classID : '#root'})
    $Element.create(`
        <div class="div_jF21p" >
            <a class="backgroundTouch" data-action="closeOption" ></a>
            <div class="div_kVLpN" >
                <div class="div_lymmi" >
                    <button class="buttonPrimary button_BGsvs active" data-action="openTab-categoria"><i class="fa-solid fa-lines-leaning"></i></button>
                    ${ category === 'NUMBER' ? '<button class="buttonPrimary button_BGsvs" data-action="openTab-limit"><i class="fa-solid fa-arrow-up-1-9"></i></button>' : '' }
                    ${ typeModalGame === 'play' ? `<button class="buttonPrimary button_BGsvs" data-action="openTab-casilla"><i class="fa-solid fa-list"></i></button>` :'' }
                </div>
                <div class="div_wjZFH" ></div>
            </div>
        </div>
    `)
  
    $Element.findChild('[data-action="closeOption"]').addEventListener('click', ()=>{
        $Element.delete()
    })
    $Element.findChild('.div_lymmi', true).addEventListener( 'click', e =>{
        const trg = e.target.closest('.button_BGsvs')  

        if( !trg ) return
        if( trg.classList.contains('active') ) return

        $Element.findChild('.button_BGsvs.active', true).classList.remove('active') 
        trg.classList.add('active')

        const ContentTabs = $Element.findChild('.div_wjZFH')
        const action = trg.dataset.action

        ContentTabs.innerHTML = ''
        if( action === 'openTab-categoria' ){ 
            return $TabCategory.parent({element : ContentTabs})
        }
        if( action === 'openTab-limit' || action === 'openTab-casilla' ){
            const val = action === 'openTab-limit'
            typeTabLimit = val ? 'LIMIT' : 'CASILLAS'

            $TabLimit.findChild('.h3_SAZQu').textContent = val ? 'LIMIT' : 'CASILLAS'
            inputCantidad.value = val ? limitRange : DataNumber.play.casillas 
            return $TabLimit.parent({element : ContentTabs})
        }  
        
    })

    //CATEGORIA

    const categories = [
        { name : 'numeros', type : 'NUMBER' },
        { name : 'abcedario', type : 'ABC' },
        { name : 'meses', type : 'MONTH' },
        { name : 'dias', type : 'DAY' },
        { name : 'planetas', type : 'PLANET' },
        { name : 'libros biblicos', type : 'BIBLE' },
    ]

    const $TabCategory = new Ele({ element : $Element.findChild('.div_wjZFH') })
    $TabCategory.create(`
        <form class="form_t0Gpe" autocomplete="off">
            <div class="div_Kxhvv">
            
                ${
                    categories.map( cat =>{
                        const focus = cat.type === category
                        return(`
                            <button type="button" class="button_PV4cA ${ focus ? 'focus' : '' }" data-type="${ cat.type }" >
                                <span>${ cat.name }</span>
                                ${ focus ? '<i class="fa-solid fa-circle-check"></i>' : '' }
                            </button>
                        `)
                    }).join('')
                }
                
            </div>
        </form>
    `)

    $TabCategory.findChild('.div_Kxhvv').addEventListener('click', e => {
        const trg = e.target.closest('.button_PV4cA')

        if( !trg ) return

        const type = trg.dataset.type
        const DataNumber = getLocalStorage('DataNumber', {}, true) 
        const lstDataNumber = getDataNumber( type )

       if( type === 'NUMBER' ){
            DataNumber[typeModalGame].limit       = 1000
            DataNumber[typeModalGame].casillas    = 10
        } else {
            DataNumber[typeModalGame].limit       = lstDataNumber.length - 1
            if(typeModalGame == 'play' ){
                DataNumber[typeModalGame].casillas    = Math.round(DataNumber[typeModalGame].limit / 2) + 1 
                DataNumber[typeModalGame].casillas    = DataNumber[typeModalGame].casillas > 10 ? 10 : DataNumber[typeModalGame].casillas
            }
        }
        
        DataNumber[typeModalGame].type = type
        setLocalStorage('DataNumber', DataNumber, true) 
        updatePage()
    })

    //LIMITE NUMERO/CASILLA
    const $TabLimit = new Ele({element : ContainerTabs})
    $TabLimit.create(`
        <form class="form_xAvjK" autocomplete="off">
            <h3 class="h3_SAZQu" >limite de numero</h3>
            <div class="div_OTepT">
                <button type="button" class="buton_R5yEr" data-action="minus-cantidad" ><i class="fa-solid fa-minus"></i></button>
                <span></span>
                <input type="number" name="number" data-value="1000" class="input_jrULC" value="1000" >
                <span></span>
                <button type="button" class="buton_R5yEr" data-action="plus-cantidad" ><i class="fa-solid fa-plus"></i></button>
            </div>
            <div class="div_CGheo" > 
                <button type="submit" class="button_vDecj" ><i class="fa-solid fa-arrow-right"></i></button>
            </div>
        </form>
    `)

    const validateNumber = /^([0-9])*$/
    const inputCantidad = $TabLimit.findChild('.div_OTepT [name="number"]', true)
    let typeTabLimit = 'LIMIT'

    inputCantidad.addEventListener('input', e =>{
        const trg = e.currentTarget  
        if( !validateNumber.test( e.data) && e.data !== null ) {
            trg.value = ''
            trg.value = trg.dataset.value 
        } 

        trg.dataset.value = trg.value = limitCasillas(trg.value) 
    })

    $TabLimit.findChild('.div_OTepT [data-action="minus-cantidad"]', true).addEventListener('click', ()=> {
        inputCantidad.value = limitCasillas(--inputCantidad.value) 
    })

    $TabLimit.findChild('.div_OTepT [data-action="plus-cantidad"]', true).addEventListener('click', ()=> {
        inputCantidad.value = limitCasillas(++inputCantidad.value)   
    })

    $TabLimit.event('submit', e => {
        e.preventDefault()
        
        if( typeTabLimit === 'LIMIT' ){
            DataNumber[typeModalGame].limit = +inputCantidad.value
        }

        else if( typeTabLimit === 'CASILLAS' ){
            DataNumber.play.casillas = +inputCantidad.value
        }

        setLocalStorage('DataNumber', DataNumber, true)
        updatePage()

    })

    const limitCasillas =( number )=>{
        number = +number
        const validatePlay      = typeModalGame === 'play'
        const validateNumber    = category === 'NUMBER'
        const validateLimit     = typeTabLimit === 'LIMIT'

        if( validatePlay ){
            if(validateNumber){
                if( validateLimit ){
                    if( number < DataNumber.play.casillas ) number = 10000
                    if( number > 10000 ) number = DataNumber.play.casillas
                } else {
                    if( number < 3 ) number = DataNumber.play.limit
                    if( number > DataNumber.play.limit ) number = 3
                }
            } else {
                if( number < 3 ) number = lstDataNumber.length - 1
                if( number > lstDataNumber.length - 1 ) number = 3
            }
        } else {
            if(validateNumber){
                if( number < 3 ) number = 10000
                if( number > 10000 ) number = 3
            } else {
                if( number < 3 ) number = lstDataNumber.length - 1
                if( number > lstDataNumber.length - 1 ) number = 3
            }
        }

        return number
    }
    
} 