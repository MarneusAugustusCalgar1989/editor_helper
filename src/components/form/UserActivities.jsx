import styles from '../../styles/UserActivities.module.css';
import { useAuth } from '../../hooks/useAuth';

const UserActivities = ({ item }) => {
  const context = useAuth();

  const createInnerHtml = item => {
    return { __html: item };
  };

  const removeActivity = async e => {
    const findIndex = e.target.parentNode.parentNode.querySelector(
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
    }).then(data => console.log(data));
  };

  return (
    <div>
      {!item && <h1>Загрузка</h1>}

      {item.Default && (
        <h1 className={styles.no_activity}>Пока нет активности</h1>
      )}

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
