class ElementModal {
  constructor({ element = false, classID = false, position = "append" }) {
    this.elementBase = "";
    this.element = "";
    this.parentElement = element || document.querySelector(classID) || false;
    this.position = position;
  }

  create(element = false) {
    const _element = document.createElement("div");
    _element.innerHTML = `
        <div class="div_FFuONG8os7">
            <a class="a_EzsORjVabE"></a>
            ${element}
        </div>
    `;
  
    this.elementBase = _element.children[0];

    this.element =
      this.elementBase.children.length === 2
        ? this.elementBase.children[1]
        : document.createElement("div");

    this.elementBase.children[0].addEventListener('click', ()=>{
        this.delete()
    })

    _element.innerHTML = "";

    if (this.parentElement) this.parentElement[this.position](this.elementBase);
  }

  delete() {
    if (document.body.contains(this.elementBase)) this.elementBase.remove() 
  }

  parent({ element = false, classID = false, position = "append" }) {
    this.parentElement = element || document.querySelector(classID) || false;
    if (this.parentElement) this.parentElement[position](this.elementBase);
  }

  children(...data) {
    this.element.append(...data);
  }

  event(typeEvent, actionEvent) {
    this.element.addEventListener(typeEvent, actionEvent);
  }

  findChild(classID, element = false) {
    if (element)
      return (
        this.element.querySelector(classID) || document.createElement("div")
      );
    return this.element.querySelector(classID);
  }

  findChildren(classID) {
    return this.element.querySelectorAll(classID);
  }

  valChildren(children = []) {
    //atributos de los children del elemento
    children.forEach(
      ({ classID = false, attributes = {}, contents = {} } = false) => {
        const element = this.element.querySelector(classID) || false;
        if (element === false) return;
        for (const attribute in attributes)
          element.setAttribute(attribute, attributes[attribute].trim());
        for (const content in contents)
          element[content] = contents[content].trim();
      }
    );
  }
}
export default ElementModal;
