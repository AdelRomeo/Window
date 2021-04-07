import checkNumInputs from './checkNumInputs';

const forms = (state) => {
  //все формы со страницы
  const formList = document.querySelectorAll('form');
  //все инпуты
  const inputList = document.querySelectorAll('input');
  //список сообщений показываемых пользователю
  const messages = {
    loading: 'Загрузка...',
    success: 'Спасибо! С вами скоро свяжутся',
    error: 'Что-то пошло не так...'
  }

  //валидируем инпуты
  checkNumInputs('input[name="user_phone"]');

  //перебираем все формы
  formList.forEach(form => {
    //вешаем обработчик на каждую форму
    //submit - отправка формы
    form.addEventListener('submit', (e) => {
      //отменяем действие по умолчанию
      e.preventDefault();

      //создаем элемент который будет показывать сообщение пользователю
      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      //добавляем элемент в форму
      form.appendChild(statusMessage);

      //собираем данные из инпутов формы
      const formData = new FormData(form);
      //если в форме с которой работаем есть указаный data-attribute
      if (form.getAttribute('data-calc') === 'end') {
        //перебираем объект с данными которые заполнил пользователь
        for (let k in state) {
          //добавляем даные из state в formData
          formData.append(k, state[k]);
        }
      }

      //отправляем запрос с нужными данными
      postData('/assets/server.php', formData)
        //обрабатываем ответ
        .then(res => {
          console.log(res);
          //информирование пользователя об успешной отправки данных
          statusMessage.textContent = messages.success;
        })
        .catch(() => {
          //информирование пользователя об ошибке
          statusMessage.textContent = messages.error;
        })
        .finally(() => {
          inputList.forEach(input => {
            //очищаем инпуты
            input.value = '';
            //очишаем state
            state = {};
            setTimeout(() => {
              //закрываем popup
              document.querySelector('.popup_calc_end').style.display = 'none';
              //удаляем сообщение информирующие пользователя
              statusMessage.remove();
            }, 3000)
          });
        });
    });
  });

  //отправка данных на сервер
  //url - адрес куда отправляем данные
  //data - данные которые отправляем
  const postData = async (url, data) => {
    //показываем сообщение о загрузке пользователю
    document.querySelector('.status').textContent = messages.loading;

    //отправляем данные
    let result = await fetch(url, {
      method: 'POST',
      body: data
    });

    return await result.text();
  }

}

export default forms;