const createLocalStorage = (key = false, data = false, convert = false) => {
  const getData = localStorage.getItem(key);
  if (getData) return getData;

  const getData2 = convert ? JSON.stringify( data ) : data

  localStorage.setItem(key, getData2);
  return getData2 
}; 

const getLocalStorage = (key = false, data = false, convert = false) => {
  const getData = localStorage.getItem(key);
  return !getData ? data : convert ? JSON.parse(getData) : getData;
};

const setLocalStorage = (key = false, data = false, convert = false) => {
  const getData = convert ? JSON.stringify( data ) : data

  localStorage.setItem(key, getData);
  return getData
};

export { createLocalStorage, setLocalStorage, getLocalStorage };
