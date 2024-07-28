import { useEffect, useState } from 'react'

const UsersList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const resp = await fetch('http://213.59.156.172:3000/get_users', {
        method: 'GET',
      })
      let usersArr = await resp.json()
      setUsers(usersArr)
    }

    getUsers()
  }, [])

  return (
    <div>
      <p>Список пользователей</p>
      {users.length > 1 && users.map((el) => <ul key={el}>{el}</ul>)}
    </div>
  )
}

export default UsersList
