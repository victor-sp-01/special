import Ele from "../libs/Ele.js"
const Main =()=>{
    const $Ele = new Ele({ classID : '#root' })
    $Ele.create('<main class="main" id="main"></main>') 
}

export default Main