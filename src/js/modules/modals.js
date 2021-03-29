const modals = () => {
  //функция привязки модального окна к триггерам
  //triggerSelector - кнопка отрывающая модальное окно
  //modalSelector - модальное окно
  //closeSelector - кнопка закрывающая модальное окно
  function bindModal(triggerSelector, modalSelector, closeSelector) {

    const triggers = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);
    const close = document.querySelector(closeSelector);

    //перебираем триггеры
    triggers.forEach(trigger => {
      //вешаем обработчик на каждый триггер
      trigger.addEventListener('click', (e) => {
        //отменяем действие по умолчанию
        if (e.target) {
          e.preventDefault();
        }
        //показываем модальное окно
        modal.style.display = 'block';
        //запрещаем скролл страницы на время показа модального окна
        document.body.classList.add('modal-open');
      });
    });

    //клик по кнопке закрытия
    close.addEventListener('click', () => {
      //скрываем модальное окно
      modal.style.display = 'none';
      //разрешаем скролл страницы на время показа модального окна
      document.body.classList.remove('modal-open');
    });

    //клик по модальному окну
    modal.addEventListener('click', (e) => {
      //если кликнули строго по модального окну
      if (e.target === modal) {
        //скрываем модальное окно
        modal.style.display = 'none';
        //разрешаем скролл страницы на время показа модального окна
        document.body.classList.remove('modal-open');
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

  //запускаем функции с нужными аргументами
  bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
  bindModal('.phone_link', '.popup', '.popup .popup_close');
  //showModalByTime('.popup', 60000);
}

export default modals;