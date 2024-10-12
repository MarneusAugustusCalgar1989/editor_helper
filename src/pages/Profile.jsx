import { useEffect, useState } from 'react'
import UserActivities from '../components/UserActivities'
import Wrapper from '../components/Wrapper'
import { useAuth } from '../hooks/useAuth'
import FilterSorter from '../components/FilterSorter'
import testFetch from '../components/hoc/testFetch'
import envirConfig from '../components/envir_config/envirConfig'

const Profile = () => {
  const context = useAuth()
  useEffect(() => {
    testFetch(context.setServiceON, context)
  }, [context.user, context.serviceON, context])
  const [userData, setUserData] = useState([])
  const [filters, setFilters] = useState([])
  const [sorters, setSorters] = useState('newer')

  const innerCB = (el) => {
    return setUserData(
      userData.filter((e) => {
        return e.requestText !== el
      })
    )
  }

  if (userData) {
    userData.forEach((el) => (el.dateStamp = new Date(el.timeStamp)))
  }
  const filterActivities = (filterBy) => {
    if (filters.includes(filterBy)) {
      return setFilters([...filters].filter((el) => el !== filterBy))
    } else if (filters.length === 0) {
      return setFilters([filterBy])
    } else {
      return setFilters([...filters, filterBy])
    }
  }

  const sorter = (type) => {
    if (type === 'newer') {
      return setSorters('newer')
    } else if (type === 'older') {
      return setSorters('older')
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await fetch(envirConfig.serverURL + '/get_activities', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(context),
        })
          .then((data) => data.json())
          .then((data) => {
            setUserData(data.flat())
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
        <div className="activities_wrapper">
          {!userData[0]?.Default && userData.length !== 0 && (
            <div className="filter_sorter">
              <FilterSorter filter={filterActivities} sorter={sorter} />
            </div>
          )}
          {userData.length === 0 && <h1>Загрузка</h1>}
          {userData[0]?.Default && <h1>Нет активностей</h1>}
          {!userData[0]?.Default &&
            filters.length !== 0 &&
            userData
              .filter((el) => {
                for (let f in filters) {
                  if (el[filters[f]]) {
                    return el
                  }
                }
                return
              })
              .sort((a, b) => {
                if (sorters === 'newer') {
                  return b.dateStamp - a.dateStamp
                } else if (sorters === 'older') {
                  return a.dateStamp - b.dateStamp
                }
              })
              .map((el) => (
                <UserActivities
                  item={el}
                  key={el.timeStamp}
                  innerCB={innerCB}
                  className="user_activities_list"
                />
              ))}
          {!userData[0]?.Default &&
            filters.length === 0 &&
            userData
              .sort((a, b) => {
                if (sorters === 'newer') {
                  return b.dateStamp - a.dateStamp
                } else if (sorters === 'older') {
                  return a.dateStamp - b.dateStamp
                }
              })
              .map((el) => (
                <UserActivities
                  item={el}
                  key={el.timeStamp}
                  innerCB={innerCB}
                  className="user_activities_list"
                />
              ))}
        </div>
      </Wrapper>
    </div>
  )
}

export default Profile
