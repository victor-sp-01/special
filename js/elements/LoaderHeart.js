import Ele from "../libs/Ele.js"

export default ( element )=>{
    const $Ele = new Ele({ element })
    $Ele.create(`
        <div class="lds-heart"><div></div></div>
    `) 
} 