import { getLocalStorage } from "../api/apiLocalStorage.js"
import api from "../helpers/api.js"
import Ele from "../libs/Ele.js"
import diff from "../functions/diff.js"
import diffAge from "../functions/diffAge.js"
import getZodiacSign from "../functions/getZodiacSign.js"
import diffTimeOutBirthdate from "../functions/diffTimeOutBirthdate.js"
export default ()=>{

    const { datauser } = getLocalStorage('Auth', {}, true)
    const $Ele = new Ele({classID:'main'})
    $Ele.create(`
        <div class="div_tpkWp scrollY">
            <div class="div_8ocF2">
                <a href="#" class="button_12dtU"><i class="fa-solid fa-arrow-left"></i></a
            </div>
            <div class="div_UmoZ7">
                <div class="div_V7fYp" >
                    <div class="div_g3esP" >
                        <img src="${ api('files/avatar/'+datauser.avatar) }">
                    </div>
                </div>
                <div class="div_imJOb">
                    <h2>${ datauser.fullname.toUpperCase() }</h2>
                    <div class="div_AWlQM">
                        <h4>${ getZodiacSign(datauser.birthdate).toUpperCase() }</h4> 
                    </div>
                </div>
                <div class="div_6Bann">
                    <div class="div_CyIN4">
                        <h4 class="last" id="lastAge">-</h4>
                        <span class="last"></span>
                        <h4 class="now" id="thisAge">-</h4>
                        <span></span>
                        <h4 class="next" id="nextAge">-</h4>
                    </div>
                    <div class="div_q6cER">
                        <ul><li id="day">-</li><span>D</span></ul>
                        <ul><li id="hour">-</li><span>H</span></ul>
                        <ul><li id="minute">-</li><span>M</span></ul>
                        <ul><li id="second">-</li><span>S</span></ul>
                    </div>
                </div>
                <div class="div_a5lzd">
                    <button class="button_1imqw focus" data-action="open-informacion">info</button>
                    <button class="button_1imqw" data-action="open-gustos">destacados</button> 
                </div>
                <div class="div_FirLX"></div>
            </div>
        </div>
    `)
    

    $Ele.findChild('.button_1imqw[data-action="open-informacion"]').addEventListener('click', ()=> {
        $Ele.findChild('.div_FirLX').classList.toggle('active')
    })

    $Ele.findChild('.div_a5lzd', true).addEventListener('click', e => {
        const trg = e.target.closest('.button_1imqw')
        if( trg ){ 
            $Ele.findChild('.button_1imqw.focus', true).classList.remove('focus')
            trg.classList.add('focus')
            const action = trg.dataset.action 
            if( action === 'open-informacion' ){
                renderInformacion()
                return renderDates2()
            }   
            if( action === 'open-gustos' ) return  renderGustos() 
        }
    })

     
    const renderAge =()=>{
        const age = diffAge(datauser.birthdate, new Date())
        $Ele.findChild('#lastAge').textContent = age.year - 1
        $Ele.findChild('#thisAge').textContent = age.year
        $Ele.findChild('#nextAge').textContent = age.year + 1
    }

    const getBirthdate =()=>{
        const realTime = new Date()
        const thisYear = realTime.getFullYear()

        const birthdate = new Date(+datauser.birthdate)
        const monthBirthdate = birthdate.getMonth() + 1
        const dayBirthdate = birthdate.getDate()

        const birthdateThisYear = new Date(`${ thisYear }-${ monthBirthdate }-${ dayBirthdate } 00:00:000`)
        const validateBirthdateThisYear = realTime.getTime() > birthdateThisYear.getTime()
        
        const nextBirthdate = validateBirthdateThisYear ? new Date(`${ thisYear + 1 }-${ monthBirthdate }-${ dayBirthdate } 00:00:000`) : birthdateThisYear 

        return [ realTime, nextBirthdate ]
    }
    
    let [ realTime, nextBirthdate ] = getBirthdate()
 
    const renderDates =()=>{
        const [ realTime2, nextBirthdate2 ] = getBirthdate()
        const dates = diffTimeOutBirthdate(realTime2, nextBirthdate2)

        if( nextBirthdate.getTime() !== nextBirthdate2.getTime() ) {
            renderAge()
            nextBirthdate = nextBirthdate2
        }

        for(const date in dates){
            $Ele.findChild(`#${ date }`).textContent = ('0' + dates[date]).slice(-2)
        }
    }

    const clearI = setInterval(()=>{ 
        if( !document.body.contains($Ele.element) ) return clearInterval(clearI)
        renderDates()
    }, 1000)

   
    const renderInformacion =()=>{
        $Ele.findChild('.div_FirLX').innerHTML = `
            <div class="div_hdq2N">
                <div class="div_FPtki">
                    <span>DNI</span>
                    <div class="div_udgPp">
                        <h4>6*******</h4>
                    </div>
                </div>
                <div class="div_FPtki">
                    <span>padres</span>
                    <div class="div_udgPp">
                        <div>
                            <h4>Rober Huamani</h4>
                            <h4>Elizabeth Gamero</h4>
                        </div>
                    </div>
                </div>
                <div class="div_FPtki">
                    <span>direccion</span>
                    <div class="div_udgPp">
                        <h4>lima / ica / arequipa</h4>
                    </div>
                </div> 
                <div class="div_FPtki">
                    <span>lugar de nacimiento</span>
                    <div class="div_udgPp">
                        <div>
                            <h4>peru</h4>
                            <h4>nickolandia</h4>
                        </div>
                    </div>
                </div>
                <div class="div_FPtki">
                    <span>genero</span>
                    <div class="div_udgPp">
                        <h4>nickosexual</h4>
                    </div>
                </div> 
                <div class="div_FPtki">
                    <span>idioma</span>
                    <div class="div_udgPp">
                        <div>
                            <h4>español</h4>
                            <h4>nickoliense(suele pronunciar mil segundos por palabra)</h4>
                        </div>
                    </div>
                </div>
                <div class="div_FPtki">
                    <span>hijos</span>
                    <div class="div_udgPp">
                        <h4>3</h4>
                    </div>
                </div>
                <div class="div_FPtki">
                    <span>animal que odia</span>
                    <div class="div_udgPp">
                        <h4>ni mencionarlo pero es S********</h4>
                    </div>
                </div>
                <div class="div_FPtki">
                    <span></span>
                    <div class="div_udgPp">
                        <div class="div_uzsQm"></div>
                    </div>
                </div>
            </div>
        `
    }

    
    const renderGustos =()=>{
        $Ele.findChild('.div_FirLX').innerHTML = `
        <div class="div_">
            <div class="div_FPtki">
                <span>colores</span>
                <div class="div_udgPp">
                    <span style="background:black"></span>
                    <span style="background:red"></span>
                    <span style="background:pink"></span>
                </div>
            </div>
            <div class="div_FPtki">
                <span>cantante</span>
                <div class="div_udgPp">
                    <img src="./img/perfil/informacion/cantante_01.jpg">    
                </div>
            </div>
            <div class="div_FPtki">
                <span>escritora</span>
                <div class="div_udgPp">
                    <img src="./img/perfil/informacion/escritora_01.jpg">    
                </div>
            </div>
            <div class="div_FPtki">
                <span>literarios</span>
                <div class="div_udgPp">
                    <img src="./img/perfil/informacion/literarios_01.jpg"> 
                    <img src="./img/perfil/informacion/literarios_02.jpg"> 
                    <img src="./img/perfil/informacion/literarios_03.jpg"> 
                    <img src="./img/perfil/informacion/literarios_04.jpg"> 
                    <img src="./img/perfil/informacion/literarios_05.jpg"> 
                    <img src="./img/perfil/informacion/literarios_06.jpg">  
                </div>
            </div>
            <div class="div_FPtki">
                <span>serie</span>
                <div class="div_udgPp">
                    <img src="./img/perfil/informacion/serie_01.jpg">   
                </div>
            </div>
            <div class="div_FPtki">
                <span>granjita</span>
                <div class="div_udgPp">
                    <img src="./img/perfil/informacion/granjita_01.jpg"> 
                    <img src="./img/perfil/informacion/granjita_02.jpg"> 
                    <img src="./img/perfil/informacion/granjita_03.jpg"> 
                    <img src="./img/perfil/informacion/granjita_04.jpg"> 
                    <img src="./img/perfil/informacion/granjita_05.jpg"> 
                    <img src="./img/perfil/informacion/granjita_06.jpg"> 
                    <img src="./img/perfil/informacion/granjita_07.jpg"> 
                </div>
            </div>
            <div class="div_FPtki">
                <span>peliculas compartidas</span>
                <div class="div_udgPp">
                    <img src="./img/perfil/informacion/pelicula_01.jpg">   
                    <img src="./img/perfil/informacion/pelicula_02.jpg">   
                    <img src="./img/perfil/informacion/pelicula_03.jpg">   
                    <img src="./img/perfil/informacion/pelicula_04.jpg">   
                </div>
            </div>
            <div class="div_FPtki">
                <span>juegos compartidos</span>
                <div class="div_udgPp">
                    <img src="./img/perfil/informacion/game_01.jpg">   
                    <img src="./img/perfil/informacion/game_02.jpg">   
                    <img src="./img/perfil/informacion/game_03.jpg">   
                    <img src="./img/perfil/informacion/game_04.jpg">   
                    <img src="./img/perfil/informacion/game_05.jpg">   
                    <img src="./img/perfil/informacion/game_06.jpg">   
                </div>
            </div>
        </div>
        `
    } 

    const start = datauser.birthdate
    const renderDates2 =()=>{
        const end   = new Date() 
        const dates = diff(start, end)

        const dateBirthday = [
            { name : 'Año', number : dates.year },
            { name : 'Meses', number : dates.month },
            { name : 'Semanas', number : dates.week },
            { name : 'Dias', number : dates.day },
            { name : 'Horas', number : dates.hour },
            { name : 'Minutos', number : dates.minute }
        ]
    
        $Ele.findChild('.div_uzsQm').innerHTML = dateBirthday.map( data => {{
            return `
                <ul>
                    <span>${ data.name }</span>
                    <h4>${ data.number }</h4>
                </ul>
            `
        }}).join('')
    }

    renderAge()
    renderDates(realTime, nextBirthdate)
    renderInformacion()
    renderDates2()
}
 