const UserActivities = ({ item }) => {
  return (
    <div className='user_activities'>
      <h1>{item.name}</h1>
      <p>{item.text}</p>
    </div>
  );
};

export default UserActivities;
