import React, { useState} from 'react';
import './index.css'; // стили

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animation, setAnimation] = useState('slide-in'); // начальное состояние анимации

  const data = [
    {
      image: 'images/maze.png',
      title: 'ЛАБИРИНТ',
      description: 'Узкий туннель с мягкими барьерами, где нужно быстро проползти.',
    },
    {
      image: 'images/image_8.png',
      title: 'ДОМИНО',
      description: 'Мягкие блоки с разными возможностями преодоления',
    },
    {
      image: 'images/image_9.png',
      title: 'ТАРЗАН',
      description: 'Экстремальные качели для самых ловких',
    },
    {
      image: 'images/image_10.png',
      title: 'СОНИК',
      description: 'Подвижные кольца не так просты, как кажутся',
    },
  ];

  const handlePrevClick = () => {
    setAnimation('slide-right'); // делаем переход вправо(т.к. нажали влево, типа листаем)
    setTimeout(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
    setAnimation('slide-in'); // в базовую позицию возвращаем
  },100);
  };

  const handleNextClick = () => {
    setAnimation('slide-left'); // аналогично
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === data.length - 1 ? 0 : prevIndex + 1
      );
      setAnimation('slide-in'); // аналогично
    }, 100); //100 - это время мс анимации
  };

  const info = (
    <p>
      ПРИГЛАШАЕМ ВАС <b>20 мая в 15:00</b> испытать вашу силу на уникальной
      полосе препятствий, созданная специально для <b>батутного центра
      “Полетаем”ул. Ладыгина, 3 (этаж 2)! </b>
      Вас ждут не просто прыжки – это настоящее испытание на скорость,
      ловкость и смекалку.
    </p>
  );

  const left_but = (
    <div className="image-block" onClick={handlePrevClick}>
      <img src="images/left.png" alt="Влево" />
    </div>
  );

  const right_but = (
    <div className="image-block" onClick={handleNextClick}>
      <img src="images/right.png" alt="Вправо" />
    </div>
  );

  const data_block = (
    <div className={`data-block ${animation}`} >
      <div className="data-image">
        <img src={data[currentIndex].image} alt="фото лабиринтов" />
      </div>
      <h2 className="data-title">
        {data[currentIndex].title}
      </h2>
      <p className="data-paragraph">
        {data[currentIndex].description}
      </p>
    </div>
  );

  const button = (
    <div className="bottom-button">
      <img src="images/registration.png" alt="Записаться" />
    </div>
  );

  return (
    <div className="main-container">
      <h1 className="main-title">Что вас ждет?</h1>
      <div className="content-container">
        <div className="left-block">
          {info}
        </div>
        <div className="right-block">
          <div className="top-content-container">
            {left_but}
            {data_block}
            {right_but}
          </div>
          {button}
        </div>
      </div>
    </div>
  );
}

export default App;