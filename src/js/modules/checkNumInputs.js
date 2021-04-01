//модуль валиднации инпутов
const checkNumInputs = (selector)=>{
  const numInputs = document.querySelectorAll(selector);

  //перебираем все инпуты
  numInputs.forEach(item => {
    //вешаем на каждый инпут обработчик
    //input - событие происходит при каждом изменении значения в поле инпута
    item.addEventListener('input', () => {
      //заменяем все НЕчисла в инпуте на ничего
      item.value = item.value.replace(/\D/, '');
    });
  });
}

export default checkNumInputs;