const tabs = (headerSelector, tabsSelector, contentsSelector, activeClass, display = 'block') => {
  //заголовок в котором нвходятся табы
  const header = document.querySelector(headerSelector);
  //табы переключающие видимый контент
  const tabs = document.querySelectorAll(tabsSelector);
  //элементы контента
  const contents = document.querySelectorAll(contentsSelector);

  //скрытие всех табов
  function hideTabsContent() {
    //перебираем все вкладки с контентом
    contents.forEach(item => {
      //скрываем вкладки
      item.style.display = 'none';
    });

    //перебираем все табы
    tabs.forEach(tab => {
      //удаляем у всех классов класс активности
      tab.classList.remove(activeClass);
    })
  }

  //показ одного конкретного элемента из списка контента
  function showTabContent(i = 0) {
    //показываем элемент контента индеск которого совпадает с индексом таба на который кликнули
    contents[i].style.display = display;

    //добавляем класс активности табу на который кликнули
    tabs[i].classList.add(activeClass);
  }

  hideTabsContent();
  showTabContent();

  //вешаем обработчик на контайнер табов
  header.addEventListener('click', (e) => {
    const target = e.target;
    //проверяем наличие класса у элемента на который кликнули
    if (target.classList.contains(tabsSelector.replace(/\./, '')) || target.parentNode.classList.contains(tabsSelector.replace(/\./, ''))) {
      //перебираем все табы
      tabs.forEach((tab, i) => {
        //если то на что кликнули это один из табов
        if (target === tab || target.parentNode === tab) {
          //скрываем все
          hideTabsContent();
          //показываем элементы с идексом таба на который кликнули
          showTabContent(i);
        }
      });
    }
  });

}

export default tabs;