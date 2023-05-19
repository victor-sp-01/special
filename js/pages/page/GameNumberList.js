import { getLocalStorage } from "../../api/apiLocalStorage.js"
import getDataNumber from "../../data/getDataNumber.js"
import Ele from "../../libs/Ele.js"
import OpcGameNumber from "../../components/OpcGameNumber.js"
import ListNumber from "../../components/ListNumber.js"

export default ()=>{

    const { type    = 'NUMBER', 
            limit  = 1000 } = getLocalStorage( 'DataNumber', {}, true )['generate']

    const typeMode  = getDataNumber(type, limit) 
    const lstItemUsed   = []
    let itemUsed = {}

    const Game = { 
        play    : false, 
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
                <div class="form__FQKwi" autocomplete="off" >
                    <input type="text" name="number" value="999" readonly autocomplete="off" >
                    <div class="div__f1GW0" >
                        <button class="button-kqxgew" data-action="btnList" ><i class="fa-solid fa-list-ul"></i></button>
                        <button class="button-BDeHE" data-action="btnPlay" ><i class="fa-solid fa-play"></i></button>
                    </div>
                </div>
            </div>
        </div>
    `)

    $Element.findChild('[data-action="openOption"]').addEventListener('click', ()=>{
        OpcGameNumber('generate')
    })

    const generateItem =()=>{
        Game.play = false   
        const ceros = type === 'NUMBER' ? (`${ limit }`).split('').map(()=> '0').join('') : ''
        const lst = typeMode.filter( i => ( !lstItemUsed.includes( i.id ) ) && i )
        
        if( lst.length === 0 ) return

        const generate =()=>{
            const num = lst[ Math.floor( Math.random() * lst.length ) ] 
            $Element.findChild('[name="number"]').value =  ceros.slice((`${ num.value }`).length) + num.value
            return num
        }
        
        Time.timeGenerate = setInterval(()=>{
            if( document.body.contains( $Element.element ) ) if( lst.length !== 0 ) generate()
            else return clearTimes()
        }, 30);

        Time.timeGenerateStop = setTimeout( ()=> { 
            clearInterval( Time.timeGenerate )
            
            itemUsed = generate() 
            lstItemUsed.push(itemUsed)

            Game.generate = true
            Game.play = true

        }, 1250 )
    }

    const clearTimes =()=>{
        clearInterval( Time.timeGenerate )
        clearTimeout( Time.timeGenerateStop )
    } 

    const gameStart =()=>{
        generateItem()
    }

    const gameReset =()=>{ 
        lstItemUsed.splice(0) 
        Game.helps = 1 
        clearTimes()
        gameStart() 
    }
 
    const gamePlay =()=>{
        clearTimes()
        gameStart()
    }

    $Element.findChild('[data-action="resetGame"]').addEventListener('click', ()=> {
        gameReset()
    })
    
    $Element.findChild('.button-kqxgew').addEventListener('click', ()=> {
        ListNumber(lstItemUsed)
    })

    $Element.findChild('.button-BDeHE').addEventListener('click', ()=> {
        gamePlay()
    })
 
    gameStart()
}