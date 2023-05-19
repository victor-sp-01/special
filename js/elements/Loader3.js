import Ele from "../libs/Ele.js"

export default ( element )=>{
    const $Ele = new Ele({ element })
    $Ele.create(`
        <div class="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    `) 
} 