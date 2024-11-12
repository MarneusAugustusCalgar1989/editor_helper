# «Вспомогатор»
![Титульник вспомогатора](https://obzor.city/data/images/news_2024/zgl1/gittest/vspomogator.jpg)

## Петпроект для помощи небольшой редакции

«Вспомогатор» создан для решения задач небольшой редакции. На данном этапе он реализует три функции: 

<ul>
  <li>Наложение логотипов на фотографии</li>
  <li>Конвертация amr в mp3 (для перевода записи телефонных разговорв «человеческий» формат)</li>
  <li>Создание документации (запросов для получения информации, писем поддержки и других)</li>  
</ul>
В проекте реализована простая самописная система регистрации и авторизации. Есть личный кабинет. 

## ЛОГОТИПЕР
<img src = 'https://obzor.city/data/images/news_2024/zgl1/gittest/document_creator.jpg'/>

Логотипер берет иизображения (пока только jpg) и накладывает на них логотип. Строго в правый нижний угол. 

## ЗВУКОДЕЛ
![ЗВУКОДЕЛ](https://obzor.city/data/images/news_2024/zgl1/gittest/audioconverter.jpg)
Звукодел берет файл с расширением amr и превращает в mp3. Тут же его можно скачать, прослушать или преобразовать другой файл. 

## ДОКУМЕНТОДЕЛ

Инструмент для генерации разного рода документации. Возвращает определенным образом офорленный pdf-файл. Очень облегчает жизнь редакции. 

## ЛИЧНЫЙ КАБИНЕТ
![ЛИЧНЫЙ КАБИНЕТ](https://obzor.city/data/images/news_2024/zgl1/gittest/lk.jpg)
Все, что было сделано в Логотипере, Звукоделе или Документоделе можно найти в кабинете пользователя (если нажать на его имя на экране). Реализованы механизмы фильтрации и сортировки, можно также удалять активности. 
## Установка

Скачать, установить зависимости, выполнить npm start, открыть http://localhots:3000. Сервис развернут на удаленном сервере. Напишите [сюда](https://t.me/emperor_protects), чтобы его запустили (ну или просто дали доступ к рабочей версии). Скрипты из бэка лежат в папке backend.   


