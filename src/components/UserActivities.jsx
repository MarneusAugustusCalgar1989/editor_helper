import styles from '../styles/UserActivities.module.css';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const UserActivities = ({ item, innerCB }) => {
  const context = useAuth();
  const navigate = useNavigate();

  const createInnerHtml = item => {
    return { __html: item };
  };

  const removeActivity = async e => {
    const findIndex = e.target.parentNode.parentNode.querySelector(
      '.' + styles.request_container
    ).innerHTML;

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

  return (
    <div>
      {item.Default && <h1>Нечего показывать</h1>}

      {!item.Default && item.type && (
        <div className={styles.user_activities}>
          <div className={styles.remove_button_wrapper}>
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
            </div>
          </div>
        </div>
      )}

      {!item.Default && item.logotype_image && (
        <div className={styles.user_activities}>
          <div className={styles.remove_button_wrapper}>
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
            dangerouslySetInnerHTML={createInnerHtml(item.requestText)}
          ></div>
          <div className={styles.button_wrapper}>
            <div className={styles.user_activities_button}>
              <p>Скачать</p>
            </div>
          </div>
        </div>
      )}

      {!item.Default && item.convert_audio && (
        <div className={styles.user_activities}>
          <div className={styles.remove_button_wrapper}>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserActivities;
