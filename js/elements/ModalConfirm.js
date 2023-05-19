import Ele from "../libs/Ele.js"

export default ({  message = '', actionFalse = false, actionTrue = false} = {})=>{
    const $Ele = new Ele({classID:'#root'})
    $Ele.create(`
        <div class="div_rDDKp" >
            <a class="a_75iT1" data-action="closeModal" ></a>
            <form class="form_MgDQL" >
                <h3>${ message }</h3>
                <div class="div_FDPCO" >
                    <button type="button" class="button_hc03j" data-action="closeModal" ><i class="fa-solid fa-xmark"></i></button>
                    <span></span>
                    <button type="button" class="button_I0V6c"><i class="fa-solid fa-check"></i></button>
                </div>
            </form>
        </div>
    `) 

    $Ele.findChildren('[data-action="closeModal"]').forEach(element => {
        element.addEventListener('click', ()=>{
            actionFalse && actionFalse()
            $Ele.delete()
        })
    });  

    $Ele.findChild('.button_I0V6c').addEventListener('click', ()=>{
        actionTrue && actionTrue()
        $Ele.delete()
    })
}