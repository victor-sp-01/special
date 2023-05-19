import Ele from "../libs/Ele.js"
import countAge from "../functions/diffAge.js"
import { getLocalStorage } from "../api/apiLocalStorage.js"
export default ()=>{
    const $Ele = new Ele({classID:'main'})
    $Ele.create(`
        <div class="div_apRDj"> 
            <div class="div_2nAHD" > 
                <img src="./img/perfil/birthdate/birthdate_01.png">
            </div>
            <div class="div_vAIlS">
                <a href="#user" class="button_SbbKd"><i class="fa-solid fa-user"></i></a>
                <a href="#message" class="button_SbbKd"><i class="fa-solid fa-comments"></i></a>
                <a href="#picture" class="button_SbbKd"><i class="fa-solid fa-image"></i></a>
            </div>
            <div class="div_5seTa">
                <div class="div_ShbcK">
                    <div class="div_neblB">
                        <ul>
                            <span>A</span>
                            <li id="year">0</li>
                        </ul>
                        <ul>
                            <span>M</span>
                            <li id="month">0</li>
                        </ul>
                        <ul>
                            <span>D</span>
                            <li id="day">0</li>
                        </ul>
                    </div> 
                    <div class="div_neblB">
                        <ul>
                            <span>H</span>
                            <li id="hour">0</li>
                        </ul>
                        <ul>
                            <span>M</span>
                            <li id="minute">0</li>
                        </ul>
                        <ul>
                            <span>S</span>
                            <li id="second">0</li>
                        </ul>
                    </div>
                    
                    <button class="button_aDbQy"><i class="fa-solid fa-ellipsis"></i></button>
                </div> 
            </div>
        </div> 
    `)

    $Ele.findChild('.button_aDbQy').addEventListener('click', ()=> {
        $Ele.findChild('.div_neblB.top').classList.toggle('deactive')
    })

    const { datauser } = getLocalStorage('Auth', {}, true)
    const start = datauser.birthdate 
    const renderTime =()=>{
        const times = countAge(start, new Date())
        for( const time in times ){
            $Ele.findChild( `#${ time }`, true ).textContent = ('0' + times[time]).slice(-2)
        }
    }
    renderTime()

    const clearI =setInterval(() => {
 
        if( !document.body.contains($Ele.element) ) return clearInterval(clearI) 
        renderTime()

    }, 1000);
}
 