import { useEffect, useState } from 'react'
import UserActivities from '../components/UserActivities'
import Wrapper from '../components/Wrapper'
import { useAuth } from '../hooks/useAuth'
import FilterSorter from '../components/FilterSorter'

const Profile = () => {
  const context = useAuth()
  const [userData, setUserData] = useState([])
  const [showData, setShowData] = useState([])
  const [filters, setFilters] = useState([])
  const [filtered, setFiltered] = useState([])

  const innerCB = (el) => {
    return setUserData(
      userData.filter((e) => {
        return e.requestText !== el
      })
    )
  }

  const filterActivities = (filterBy) => {
    filters.includes(filterBy)
      ? setFilters([...filters].filter((el) => el !== filterBy))
      : setFilters([...filters, filterBy])

    userData.forEach((el) => {
      filters.forEach((f) => {
        if (el[f]) {
          setFiltered([...userData].filter((el) => el === el[f]))
        }
      })
    })
  }
  const sorter = (type) => {
    console.log(type + 'sorter from profile page')
  }

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
          .then((data) => data.json())
          .then((data) => {
            setUserData(data.flat())
            setFiltered(data.flat())
          })
      } catch (e) {
        console.log(e)
      } finally {
      }
    }
    fetchUserData()
  }, [context])

  return (
    <div className="App">
      <Wrapper>
        <p>{filters}</p>
        <div
          className="activities_wrapper"
          onClick={() => {
            context.refreshState()
          }}
        >
          {!userData[0]?.Default && userData.length !== 0 && (
            <div className="filter_sorter">
              <FilterSorter filter={filterActivities} sorter={sorter} />
            </div>
          )}
          {userData.length === 0 && <h1>Загрузка</h1>}
          {userData[0]?.Default && <h1>Нет активностей</h1>}
          {userData[0] !== 'Default' &&
            !filtered.length &&
            userData.map((el) => (
              <UserActivities
                item={el}
                key={el.timeStamp}
                innerCB={innerCB}
                className="user_activities_list"
              />
            ))}
          {!userData[0]?.Default &&
            filtered.length &&
            filtered.map((el) => (
              <UserActivities
                item={el}
                key={el.timeStamp}
                innerCB={innerCB}
                className="user_activities_list test_block"
              />
            ))}
        </div>
      </Wrapper>
    </div>
  )
}

export default Profile
