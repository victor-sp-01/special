import ElementModal from "../libs/ElementModal.js"
export default ( numbers = [] )=>{
    const $Element = new ElementModal({classID:'#root'})
    $Element.create(`
        <div class="div__nFEgf overflowY" >
            ${
                numbers.map( (number, index) => {
                    return(`
                        <span class="span__L76xG${ index !== 0 ? ' line' : '' }" >${ number.value }</span>
                    `)
                } ).join('')
            }
        </div>
    `)
}