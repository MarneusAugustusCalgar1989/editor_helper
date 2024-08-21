import Wrapper from '../components/Wrapper';
import { useAuth } from '../hooks/useAuth';

const Profile = () => {
  const context = useAuth();
  return (
    <div className='App'>
      <Wrapper>
        <h1>Привет, {context.username}!</h1>
      </Wrapper>
    </div>
  );
};

export default Profile;
