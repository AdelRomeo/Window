//подключаем slider
import './slider';
//подключаем модули
import modals from './modules/modals';
import tabs from './modules/tabs';
import forms from './modules/forms';
import changeModalState from "./modules/changeModalState";

window.addEventListener('DOMContentLoaded', ()=>{

  //объект в котором хранятся данные с нескольких модальных окон для отправки на сервер
  const modalState = {};

  //запускаем модули
  changeModalState(modalState);
  modals();
  tabs('.glazing_slider', '.glazing_block', '.glazing_content', 'active');
  tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click');
  tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block');
  forms(modalState);
});
