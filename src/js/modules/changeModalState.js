import checkNumInputs from './checkNumInputs';

const changeModalState = (state) => {
  //форма окна
  const windowForm = document.querySelectorAll('.balcon_icons_img');
  //ширина окна
  const windowWidth = document.querySelectorAll('#width');
  //высота окна
  const windowHeight = document.querySelectorAll('#height');
  //тип окна
  const windowType = document.querySelectorAll('#view_type');
  //профиль
  const windowProfile = document.querySelectorAll('.checkbox');

  checkNumInputs('#width');
  checkNumInputs('#height');

  //event - событие которое будет происходить
  //elem - элемент с которым работаем
  //prop - свойство которое будем записывать в state
  function bindActionToElems(event, elem, prop) {
    //перебираем все формы окон
    elem.forEach((item, index) => {
      //вешаем обработчик на каждый элемент
      item.addEventListener(event, () => {
        //проверка элемента на который кликнули по тегу
        switch (item.nodeName) {
          //кликнули по картинке
          case 'SPAN':
            //записываем индекс картинки
            state[prop] = index;
            break;
          case 'INPUT':
            //если у item есть аттрибут checkbox
            //выбор между теплым и холодным
            if (item.getAttribute('type') === 'checkbox') {
              //кникнули по первому или второму элементу
              index === 0 ? state[prop] = 'Холодное' : state[prop] = 'Теплое'
              //перебираем все checkbox
              elem.forEach((box, j) =>{
                //убираем со всех элементов галочку
                box.checked = false;
                //если индекс элемента на который кликнули совпадает с одним из checkbox
                if (index === j){
                  //ставим галочку на этом элементе
                  box.checked = true;
                }
              });
            } else {
              //width и height
              state[prop] = item.value;
            }
            break;
          case 'SELECT':
            state[prop] = item.value;
            break;
        }
        console.log(state)
      });
    });
  }

  //вызваем функцию для все нужных элементов
  bindActionToElems('click', windowForm, 'form');
  bindActionToElems('input', windowWidth, 'width');
  bindActionToElems('input', windowHeight, 'height');
  bindActionToElems('change', windowType, 'type');
  bindActionToElems('change', windowProfile, 'profile');

}

export default changeModalState;