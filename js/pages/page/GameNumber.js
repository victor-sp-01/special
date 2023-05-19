import { Hash } from "../../helpers/Params.js"
import Ele from "../../libs/Ele.js"
import GameNumberPlay from "./GameNumberPlay.js";
import GameNumberList from "./GameNumberList.js";
export default ()=>{

    const hash = Hash();

    if (hash.length > 2){
        if (hash[2] === "play") return GameNumberPlay()
        if (hash[2] === "list") return GameNumberList()
        return
    }

    const $Element = new Ele({ classID : '#root' })
    $Element.create(`
        <div class="div_4bfP8" >
            <a href="#game" class="buttonPrimary menu"><i class="fa-solid fa-arrow-left"></i></a>
            <div class="div_35pzR" > 
                <a href="#game/number/play" class="buttonPrimary"><i class="fa-solid fa-play"></i></a>
                <a href="#game/number/list" class="buttonPrimary"><i class="fa-solid fa-list-ol"></i></a>
                <a href="#setting" class="buttonPrimary"><i class="fa-solid fa-gear"></i></a>
            </div>
        </div>
    `)
}