import { useEffect, useState } from 'react'
import envirConfig from './envir_config/envirConfig'

const UsersList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const resp = await fetch(envirConfig.serverURL + '/get_users', {
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
