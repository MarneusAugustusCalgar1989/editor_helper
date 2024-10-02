import styles from '../styles/UserActivities.module.css';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const UserActivities = ({ item, innerCB }) => {
  const context = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState('');
  const [uploadProgress, setUploadProgress] = useState('');
  const [imageLoaded, setImgLoaded] = useState('');

  useEffect(() => {
    const getImage = async () => {
      const response = await fetch(
        'http://213.59.156.172:3000/' + item.requestText,
        {
          method: 'GET',
          headers: { 'Content-Type': 'image/jpg' },
        }
      );

      if (response.ok) {
        const reader = response.body.getReader();
        const contentLength = +response.headers.get('Content-Length');
        let recievedLength = 0;
        let chunks = [];

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          console.log(uploadProgress);
          chunks.push(value);
          recievedLength += value.length;
          setUploadProgress(
            `${Math.floor((recievedLength * 100) / contentLength)}%`
          );
        }
        const blob = new Blob(chunks);
        const imgSrc = URL.createObjectURL(blob);
        setShowModal(false);
        setUploadProgress(0);

        URL.revokeObjectURL(blob);

        setImgLoaded(imgSrc);
      }
    };

    //   .then(data => {
    //       if (data.ok) {
    //         const reader = data.body.getReader();
    //         reader.read().then();
    //       }
    //     })
    //     .then(data => {
    //       const blob = new Blob(data.value);
    //       const imgSrc = URL.createObjectURL(blob);
    //       setImageSource(imgSrc);
    //       URL.revokeObjectURL(blob);
    //     });
    // };
    getImage();
  }, [item]);

  const createInnerHtml = item => {
    return { __html: item };
  };

  const removeActivity = async e => {
    const findIndex =
      e.target.parentNode.parentNode
        .querySelector('.' + styles.request_container)
        .querySelector('img')?.alt ||
      e.target.parentNode.parentNode.querySelector(
        '.' + styles.request_container
      ).innerHTML;

    console.log(findIndex);

    context.index = findIndex;

    await fetch('http://213.59.156.172:3000/remove_activity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(context),
    })
      .then(data => data.json())
      .then(data => {
        innerCB(findIndex);
        if (data[0][0].Default) {
          navigate('/');
        }
      });
  };

  const postDate = new Date(item.timeStamp);
  let month = '';

  if (postDate.getMonth() === 0) {
    month = 'Января';
  }
  if (postDate.getMonth() === 1) {
    month = 'Февраля';
  }
  if (postDate.getMonth() === 2) {
    month = 'Марта';
  }
  if (postDate.getMonth() === 3) {
    month = 'Апреля';
  }
  if (postDate.getMonth() === 4) {
    month = 'Мая';
  }
  if (postDate.getMonth() === 5) {
    month = 'Июня';
  }
  if (postDate.getMonth() === 6) {
    month = 'Июля';
  }
  if (postDate.getMonth() === 7) {
    month = 'Августа';
  }
  if (postDate.getMonth() === 8) {
    month = 'Сентября';
  }
  if (postDate.getMonth() === 9) {
    month = 'Октября';
  }
  if (postDate.getMonth() === 10) {
    month = 'Ноября';
  }
  if (postDate.getMonth() === 11) {
    month = 'Декабря';
  }

  let postTime = `${postDate.getDay()} ${month} ${postDate.getFullYear()}. ${
    postDate.getHours() > 9 ? postDate.getHours() : '0' + postDate.getHours()
  }:${
    postDate.getMinutes() > 9
      ? postDate.getMinutes()
      : '0' + postDate.getMinutes()
  }:${
    postDate.getSeconds() > 9
      ? postDate.getSeconds()
      : '0' + postDate.getSeconds()
  }`;

  const downloadLogotypedImage = e => {};

  return (
    <div>
      {item.Default && <h1>Нечего показывать</h1>}

      {!item.Default && item.type && (
        <div className={styles.user_activities}>
          <div className={styles.remove_button_wrapper}>
            <p>{postTime}</p>
            <span
              className={styles.remove_button}
              onClick={e => removeActivity(e)}
            >
              &times;
            </span>
          </div>

          <div className={styles.ua_header_wrapper}>
            <h1>{item.type}</h1>
          </div>

          <p>
            {item.adress} {item.sign ? 'С печатью' : 'С печатью и подписью'}{' '}
          </p>
          <div
            className={styles.request_container}
            dangerouslySetInnerHTML={createInnerHtml(item.requestText)}
          ></div>
          <div className={styles.button_wrapper}>
            <div
              className={styles.user_activities_button}
              onClick={() => {
                context.item = item;
                navigate('/documentcreator');
              }}
            >
              <p>Повторить</p>
              <span className={styles.tec_span}>{item.timeStamp}</span>
            </div>
          </div>
        </div>
      )}

      {!item.Default && item.logotype_image && (
        <div className={styles.user_activities}>
          <div className={styles.remove_button_wrapper}>
            <p>{postTime}</p>

            <span
              className={styles.remove_button}
              onClick={e => removeActivity(e)}
            >
              &times;
            </span>
          </div>
          <div className={styles.ua_header_wrapper}>
            <h1>Логотипер</h1>
          </div>

          <div
            className={styles.request_container}
            // dangerouslySetInnerHTML={createInnerHtml(item.requestText)}
          >
            <a href={imageLoaded} download={item.requestText} target='blank'>
              <img src={imageLoaded} alt={item.requestText} />
            </a>
          </div>
        </div>
      )}

      {!item.Default && item.convert_audio && (
        <div className={styles.user_activities}>
          <div className={styles.remove_button_wrapper}>
            <p>{postTime}</p>

            <span
              className={styles.remove_button}
              onClick={e => removeActivity(e)}
            >
              &times;
            </span>
          </div>
          <div className={styles.ua_header_wrapper}>
            <h1>Аудиокнвертер</h1>
          </div>

          <div
            className={styles.request_container}
            dangerouslySetInnerHTML={createInnerHtml(item.requestText)}
          ></div>
          <div className={styles.button_wrapper}>
            <div className={styles.user_activities_button}>
              <p>Скачать</p>
              <span className={styles.tec_span}>{item.timeStamp}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserActivities;
