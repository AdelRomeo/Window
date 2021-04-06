const showImages = () => {
  //создаем модальное окно
  const imgPopup = document.createElement('div');
  //родительский элемент всех изображений
  const workSection = document.querySelector('.works');
  //создаем изображение которое будет показываться
  const bigImg = document.createElement('img');

  //добавляем класс для корректного отображения модального окна
  imgPopup.classList.add('popup');
  //добавляем стили
  imgPopup.style.justifyContent = 'center';
  imgPopup.style.alignItems = 'center';
  imgPopup.style.display = 'none';

  workSection.appendChild(imgPopup);
  imgPopup.appendChild(bigImg);

  //вешаем обработчик события на родительский элемент
  workSection.addEventListener('click', (e) => {
    //отменяем поведение по умолчанию
    e.preventDefault();
    //проверяем наличие класса для фильтрации нужных элементов
    if (e.target.classList.contains('preview')) {
      //показываем popup
      imgPopup.style.display = 'flex';
      //получаем путь к картинке
      const src = e.target.parentNode.getAttribute('href');
      //добавляем путь к картинке
      bigImg.setAttribute('src', src);
    }

    //если кликнули именно по диву с классом popup (не по картинке)
    if (e.target.matches('div.popup')) {
      //скрываем popup
      imgPopup.style.display = 'none';
    }

  });
}

export default showImages;