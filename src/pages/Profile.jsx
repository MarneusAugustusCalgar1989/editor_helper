import { useEffect, useState } from 'react';
import UserActivities from '../components/form/UserActivities';
import Wrapper from '../components/Wrapper';
import { useAuth } from '../hooks/useAuth';

const Profile = () => {
  const context = useAuth();

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await fetch('http://213.59.156.172:3000/get_activities', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(context),
        })
          .then(data => data.json())
          .then(data => {
            setUserData(data.flat());
            console.log(userData);
          });
      } catch (e) {
        console.log(e);
      } finally {
        console.log('Fetched');
      }
    };
    fetchUserData();
  }, [context]);

  return (
    <div className='App'>
      <Wrapper>
        <h1>Привет, {context.username}!</h1>
        {userData.length === 0 && <h1>Пока нет активности</h1>}

        {userData.map(el => (
          <UserActivities item={el} key={el?.requestText || 0} />
        ))}
      </Wrapper>
    </div>
  );
};

export default Profile;
