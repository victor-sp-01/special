class Ele {
  constructor({ element = false, classID = false, position = "append" }) {
    this.element = "";
    this.parentElement = element || document.querySelector(classID) || false;
    this.position = position;
  }
 
  create(element = false) {
    const _element = document.createElement("div");
    _element.innerHTML = element;

    this.element =
      _element.children.length !== 0
        ? _element.children[0]
        : document.createElement("div");

    _element.innerHTML = "";

    if (this.parentElement) this.parentElement[this.position](this.element);
  }

  delete() {
    if (document.body.contains(this.element))
      this.element.parentElement.removeChild(this.element);
  }

  parent({ element = false, classID = false, position = "append" }) {
    this.parentElement = element || document.querySelector(classID) || false;
    if (this.parentElement) this.parentElement[position](this.element);
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
export default Ele; 
