import UserActivities from '../components/form/UserActivities';
import Wrapper from '../components/Wrapper';
import { useAuth } from '../hooks/useAuth';

const Profile = () => {
  const context = useAuth();
  const testItems = [
    {
      name: 'name',
      text: 'text',
    },
    { name: 'second name', text: 'another text' },
  ];
  return (
    <div className='App'>
      <Wrapper>
        <h1>Привет, {context.username}!</h1>
        {testItems.map(el => (
          <UserActivities item={el} />
        ))}
      </Wrapper>
    </div>
  );
};

export default Profile;
