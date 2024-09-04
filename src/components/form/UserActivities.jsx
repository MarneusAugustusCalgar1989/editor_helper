import styles from '../../styles/UserActivities.module.css';
import { useAuth } from '../../hooks/useAuth';
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

      {!item.Default && (
        <div className={styles.user_activities}>
          <div className={styles.remove_button_wrapper}>
            <span
              className={styles.remove_button}
              onClick={e => removeActivity(e)}
            >
              &times;
            </span>
          </div>
          <h1>{item.adress}</h1>
          <p>
            {item.type} от {item.fromWho}
          </p>
          <div
            className={styles.request_container}
            dangerouslySetInnerHTML={createInnerHtml(item.requestText)}
          ></div>
          {item.sign && <p>С печатью</p>}
          {item.stamp && <p>С печатью и подписью</p>}
        </div>
      )}
    </div>
  );
};

export default UserActivities;
