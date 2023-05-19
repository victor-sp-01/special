import { Hash } from "../helpers/Params.js"
import Ele from "../libs/Ele.js"
import GameNumber from "./page/GameNumber.js";

export default ()=>{

    const hash = Hash();

    if (hash.length > 1){
        if (hash[1] === "number") return GameNumber()
    }

    const $Element = new Ele({classID : '#main'})
    $Element.create(`
        <div class="div_q5uNP" >
            <div class="div_W3itO" >
                <a href="#" class="buttonPrimary"><i class="fa-solid fa-arrow-left"></i></a>
                <a class="buttonPrimary"><img src="./img/avatar/17.jpg"></a>
                <a class="buttonPrimary"><i class="fa-solid fa-gear"></i></a>
            </div>
            <span class="span_r7VUW" ></span>
            <div class="div__suZQG" >
                <div class="div__FXIWA">
                    <a href="#game/number" class="a__Jqggi icon" > 
                        <img src="./img/icons/number.png">
                        <span>numeros</span>
                    </a>
                    <a href="#game/word" class="a__Jqggi icon" > 
                        <img src="./img/icons/abc__z.png">
                        <span>words</span>
                    </a>
                    <a href="#game/flip" class="a__Jqggi icon" > 
                        <img src="./img/icons/cards.png">
                        <span>flip</span>
                    </a>
                    <a href="#game/puzzle" class="a__Jqggi icon" > 
                        <img src="./img/icons/puzzle.png">
                        <span>puzzle</span>
                    </a> 
                </div>
            </div>
            
        </div>
    `)

    $Element.event( 'contextmenu', e => e.preventDefault() )
}