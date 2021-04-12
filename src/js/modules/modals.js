const modals = () => {
  //функция по работе с модальными окнами
  //triggerSelector - кнопка отрывающая модальное окно
  //modalSelector - модальное окно с которым сейчас работаем
  //closeSelector - кнопка закрывающая модальное окно
  //closeClickOverlay - маркер. будет закрываться модальное окно по клику на подложку или нет
  function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {

    const triggers = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);
    const close = document.querySelector(closeSelector);
    //все моадльные окна
    const windows = document.querySelectorAll('[data-modal]');
    //ширина прокрутки
    const scroll = calcScroll();

    //перебираем триггеры
    triggers.forEach(trigger => {
      //вешаем обработчик на каждый триггер
      trigger.addEventListener('click', (e) => {
        //отменяем действие по умолчанию
        if (e.target) {
          e.preventDefault();
        }

        //перебираем все popup
        windows.forEach(item=>{
          //скрываем каждый popup
          item.style.display = 'none';
        });

        //показываем модальное окно
        modal.style.display = 'block';
        //запрещаем скролл страницы на время показа модального окна
        document.body.classList.add('modal-open');
        document.body.style.marginRight = `${scroll}px`;

      });
    });

    //клик по кнопке закрытия
    close.addEventListener('click', () => {

      //перебираем все popup
      windows.forEach(item=>{
        //скрываем каждый popup
        item.style.display = 'none';
      });

      //скрываем модальное окно
      //modal.style.display = 'none';
      //разрешаем скролл страницы на время показа модального окна
      document.body.classList.remove('modal-open');
      document.body.style.marginRight = `0px`;
    });

    //клик по подложке модального окна
    modal.addEventListener('click', (e) => {
      //если кликнули строго по модального окну
      if (e.target === modal && closeClickOverlay) {
        //перебираем все popup
        windows.forEach(item=>{
          //скрываем каждый popup
          item.style.display = 'none';
        });
        //скрываем модальное окно
        //modal.style.display = 'none';
        //разрешаем скролл страницы на время показа модального окна
        document.body.classList.remove('modal-open');
        document.body.style.marginRight = `0px`;
      }
    });
  }

  //появление модальноо окна через 60 секунд после того какпользователь зашел на страницу
  //selector - модальное окно
  //time - время через которое модальное окно должно появвиться
  function showModalByTime(selector, time){
    setTimeout(()=>{
      //показываем модальное окно
      document.querySelector(selector).style.display = 'block';
      //запрещаем скролл страницы на время показа модального окна
      document.body.classList.add('modal-open');
    }, time);
  }

  //расчет ширины скрола страницы
  function calcScroll(){
    //создаем элемент
    let div = document.createElement('div');
    //назначаем стили
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';
    //добавляем на страницу
    document.body.appendChild(div);
                      //берем полную ширину блока - отнимаем ширину без прокрутки = получаем ширину прокрутки
    let scrollWidth = div.offsetWidth - div.clientWidth;
    //удаляем элемент
    div.remove();

    //возвращаем значение прокрутки из функции
    return scrollWidth;
  }

  //запускаем функции с нужными аргументами
  bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
  bindModal('.phone_link', '.popup', '.popup .popup_close');
  bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
  bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
  bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
  //showModalByTime('.popup', 60000);
}

export default modals;