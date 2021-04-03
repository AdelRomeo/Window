const timer = (selector, deadline) => {
  //selector - элемент в который будет помщен таймер
  //deadline - конечная дата

  //добавление нуля если число однозначное
  const addZero = (number)=>{
    if (number <= 9){
      return `0${number}`;
    } else {
      return number;
    }
  }

  //функция получает deadline и считает оставшееся время до него
  //deadline = endTime
  const getTimeRemaining = (endTime) => {
    //заносим в t - разница между endTime и временем на данный момент
    const t = Date.parse(endTime) - Date.parse(new Date());
    //получаем секунды
    const seconds = Math.floor((t / 1000) % 60);
    //получаем минуты
    const minutes = Math.floor((t / 1000 / 60) % 60);
    //получаем часы
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    //получаем дни
    const days = Math.floor(t / (1000 * 60 * 60 * 24));

    //возвращаем из функции объект со всеми вычисляемыми данными
    return {
      'total': t,
      days,
      hours,
      minutes,
      seconds
    }
  }

  //функция помещаем данные на страницу
  const setClock = (selector, endTime) => {
    //родительский элемент
    const timer = document.querySelector(selector);
    //элемент на странице в который будут записаны дни
    const days = timer.querySelector('#days');
    //элемент на странице в который будут записаны часы
    const hours = timer.querySelector('#hours');
    //элемент на странице в который будут записаны минуты
    const minutes = timer.querySelector('#minutes');
    //элемент на странице в который будут записаны секунды
    const seconds = timer.querySelector('#seconds');

    //обновление времени настранице
    let timeInterval = setInterval(upDateClock, 1000);

    upDateClock();

    //функция записи данных на страницу
    function upDateClock() {
      //t - объект с датами
      const t = getTimeRemaining(endTime);

      //вносим данные в элементы
      days.textContent = addZero(t.days);
      hours.textContent = addZero(t.hours);
      minutes.textContent = addZero(t.minutes);
      seconds.textContent = addZero(t.seconds);

      //если deadline закнчился
      if (t.total <= 0){
        //обнуляем данные на странице
        days.textContent = '00';
        hours.textContent = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';

        //останавливаем интервал
        clearInterval(timeInterval);
      }
    }
  }

  setClock(selector, deadline);
}

export default timer;