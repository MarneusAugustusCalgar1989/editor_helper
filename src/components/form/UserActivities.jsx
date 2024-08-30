import { useEffect } from 'react';
import styles from '../../styles/UserActivities.module.css';

const UserActivities = ({ item }) => {
  useEffect(() => {
    document.querySelector('.' + styles.request_container).innerHTML =
      item.requestText;
  }, [item.requestText]);

  return (
    <div className={styles.user_activities}>
      <h1>{item.adress}</h1>
      <p>
        {item.type} от {item.fromWho}
      </p>
      <div className={styles.request_container}></div>
      {item.sign && <p>С печатью</p>}
      {item.stamp && <p>С печатью и подписью</p>}
    </div>
  );
};

export default UserActivities;
