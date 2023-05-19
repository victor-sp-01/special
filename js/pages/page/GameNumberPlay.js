import { getLocalStorage } from "../../api/apiLocalStorage.js"
import getDataNumber from "../../data/getDataNumber.js"
import Ele from "../../libs/Ele.js"
import OpcGameNumber from "../../components/OpcGameNumber.js"
export default ()=>{

    const { type    = 'NUMBER', 
            limit  = 1000 , 
            casillas = 10 } = getLocalStorage( 'DataNumber', {}, true )['play']

    const typeMode  = getDataNumber(type, limit) 
    const lstItemUsed   = []
    let itemUsed = {}

    const Game = { 
        play    : false,
        finish  : false,
        generate: false,

        helps   : 1
    }

    const Time = {
        timeGenerate        : null,
        timeGenerateStop    : null,
    }

    const $Element = new Ele({classID:'#main'})
    $Element.create(`
        <div class="div_4bfP8" >
            <div class="div_Y3Efk" >
                <a href="#game/number" class="buttonPrimary"><i class="fa-solid fa-arrow-left"></i></a>
                <div class="div_QCGXU">
                    <button class="buttonPrimary" data-action="resetGame" ><i class="fa-solid fa-repeat"></i></button>
                    <button class="buttonPrimary" data-action="openOption" ><i class="fa-solid fa-ellipsis-vertical"></i></button>
                </div>
            </div>
            <div class="div_Pr5sm" >
                <div class="form__sKQFM" >
                    <div class="div__ebNKi overflowY" >
                        <div class="div__KN7Ob" >
                            ${ [ ...Array( casillas || 5 ).keys() ].map( data => {
                                return(`
                                    <button type="button" class="button__ABYX4 icon" >
                                        <span class="span__dbj8s" ></span>
                                        <span class="span__EwUoC" >${ ++data }</span>
                                    </button>
                                `)
                            } ).join('') }
                        </div>
                    </div>
                            
                    <h3 type="text" class="input__PVCmI" ></h3>
                </div>
            </div>
        </div>
    `)

    $Element.findChild('[data-action="openOption"]').addEventListener('click', ()=>{
        OpcGameNumber()
    })
    $Element.findChild('[data-action="resetGame"]').addEventListener('click', ()=>{
        gameReset()
    })
 
    const generateItem =()=>{
        Game.play = false  
        const ceros = type === 'NUMBER' ? (`${ limit }`).split('').map(()=> '0').join('') : ''
        const lst = typeMode.filter( i => ( !lstItemUsed.includes( i.id ) ) && i )
        
        if( lst.length === 0 ) return

        const generate =()=>{
            const num = lst[ Math.floor( Math.random() * lst.length ) ] 
            $Element.findChild('.input__PVCmI').textContent =  ceros.slice((`${ num.value }`).length) + num.value
            return num
        }
        
        Time.timeGenerate = setInterval(()=>{
            if( document.body.contains( $Element.element ) ) if( lst.length !== 0 ) generate()
            else return clearTimes()
        }, 100);

        Time.timeGenerateStop = setTimeout( ()=> { 
            clearInterval( Time.timeGenerate )
            
            itemUsed = generate() 

            Game.generate = true
            Game.play = true

        }, 1000 )
    }

    const clearTimes =()=>{
        clearInterval( Time.timeGenerate )
        clearTimeout( Time.timeGenerateStop )
    } 

    const gameStart =()=>{
        generateItem()
    }

    const gameReset =()=>{
        const buttons = $Element.findChildren( '.button__ABYX4' )

        buttons.forEach((button, i)=> {
            button.querySelector( '.span__EwUoC' ).textContent = i + 1
            button.classList = 'button__ABYX4 icon'
            button.value = ''
        }); 

        lstItemUsed.splice(0) 
        Game.helps = 1
        Game.finish = false
        clearTimes()
        gameStart() 
    }

    const gameFinish=()=>{
        Game.generate = Game.play = false
        Game.finish = true
    }

    const gamePlay =(trg)=>{
        const span = trg.querySelector( '.span__EwUoC' )

        trg.classList.add( 'complete' )
        trg.value = itemUsed.id
        span.textContent = itemUsed.value  

        lstItemUsed.push( +trg.value  )
        //Data.validate = []

        const buttons = $Element.findChildren( '.button__ABYX4.complete' )
        
        buttons.forEach((button, i) => {
            if( button.value === '' ) return
            if( !buttons[ i + 1 ] ) return
            if( +button.value < +buttons[ i + 1 ].value ) return

            trg.classList.add( 'error' )
            gameFinish() 
        }); 

        if( Game.finish ) return
        if( buttons.length === casillas ){ 
            trg.classList.add( 'finish' )
            gameFinish()
            return setTimeout( ()=> alert( 'ps si se pudo, Buena...✨✨' ), 500 ) 
        }

        gameStart()
    }

    $Element.findChild('.input__PVCmI').addEventListener('click', ()=> {
        if( Game.finish ) return gameReset()
        if( !Game.generate || Game.helps <= 0 ) return
        Game.helps--

        clearTimes()
        gameStart()
    })

    $Element.findChild('.div__KN7Ob').addEventListener('click', e => {
        const trg = e.target

        if( !Game.play ) return
        if( !trg.classList.contains('button__ABYX4') ) return
        gamePlay(trg)
    })

    gameStart()
    
}
 