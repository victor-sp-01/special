import Ele from "../libs/Ele.js"
import Loader from "../elements/Loader.js" 
import BackgroundRain from "../elements/BackgroundRain.js"
import { getLocalStorage } from "../api/apiLocalStorage.js"

export default ()=>{

    const { datauser } = getLocalStorage('Auth', {}, true)
    
    const userbirthdate = new Date(+datauser.birthdate)
    const date = new Date()
    const month = date.getMonth() + 1
    const day  = date.getDate()

    const monthUser = userbirthdate.getMonth() + 1
    const dayUser  = userbirthdate.getDate()

    const validate = parseInt(month + '' + day)
    const validateUser = parseInt(monthUser + '' + dayUser)

    if( validate !== validateUser ){
        return location.hash = '#'
    }

    const $Element = new Ele({classID:'#main'})
    $Element.create(`
        <div class="div_NWwmA" >
            <div class="div_Qtjhv" >  
                <span>0%</span>  
                <div class="div_yTSWf" ></div>
            </div> 
            <div class="div_K65pA"></div>
            <div class="div_8g31u scrollY off" >
                <div class="div_VI7I8"> 
                    <div class="div_vomJJ" >
                        <div class="div_WwujJ">
                            <i class="fa-solid fa-crown"></i>
                            <span>19</span>
                        </div>
                        
                        <img src="./img/imgs/banderines.png" class="img_cdEpl" >
                    </div> 
                    <div class="div_EU8UW" > 
                        <h3 class="left" >Feliz</h3>
                        <h3 class="right" >Cumple</h3>
                    </div>
                    <span class="span_ICc9w" ></span>
                    <div class="div_PkNFV" >
                        <a class="#" >abrir</a>
                        <div class="div_cdEpl" >
                            <img src="./img/imgs/corazon.png" class="img_cdEpl one" >
                            <img src="./img/imgs/corazon.png" class="img_cdEpl two" >
                            <img src="./img/imgs/corazon.png" class="img_cdEpl three" >
                        </div>
                    </div>
                </div>
            </div>
            <div class="div_HN1m4" ></div>
        </div>
    `)
  
    const background    = $Element.element
    const elementText   = $Element.findChild('.div_Qtjhv span')
    const elemetLoad    = $Element.findChild('.div_yTSWf')
    //Background(document.getElementById('root'))
    BackgroundRain($Element.findChild('.div_HN1m4'))
    Loader(elemetLoad)

    let i = 0
    const time = setInterval(()=>{

        elementText.textContent = ++i + '%'  
        if( i === 18 ){
            clearInterval(time)
            function2() 
        } 
    },1000)

    const function2 = ()=>{
        const time = setTimeout(() => {
            clearTimeout(time)
            elementText.textContent = '19%'
            //$Element.findChild('.div_K65pA', true).classList.add('active')

            const time2 = setTimeout(()=>{
                location.hash = '#'
                // $Element.findChild('.div_Qtjhv').remove()
                // $Element.findChild('.div_8g31u', true).classList.remove('off')
                clearTimeout(time2)
            },4000)
        }, 4000); 
    }
}