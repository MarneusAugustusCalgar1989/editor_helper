import { useState } from 'react';

const FilterSorter = ({ filter, sorter }) => {
  return (
    <div className='filter_sorter_wrapper'>
      <h1>Фильтрация и сортировка</h1>
      <div className='filter_sorter_buttons_wrapper'>
        <div className='filter_buttons'>
          <div
            className='test_button'
            onClick={e => {
              filter('convert_audio');
              e.target.classList.toggle('active_filter');
              console.log('Audio');
            }}
          >
            Аудио
          </div>
          <div
            className='test_button'
            onClick={e => {
              filter('type');
              e.target.classList.toggle('active_filter');
              console.log('Docs');
            }}
          >
            Доки
          </div>
          <div
            className='test_button'
            onClick={e => {
              filter('logotype_image');
              e.target.classList.toggle('active_filter');
              console.log('Photo');
            }}
          >
            Фото
          </div>
        </div>
      </div>
      <div className='sorter_buttons'>
        <div className='test_button'>Сортировать по времени</div>
      </div>
    </div>
  );
};

export default FilterSorter;
