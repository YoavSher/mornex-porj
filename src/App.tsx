import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AppHeader } from './cmps/app-header';
import { User } from './interfaces/user';
import routes from './routes';
import { userService } from './services/user.service';
import { useAppDispatch, useAppSelector } from './store/store.hooks';
import { setUser, setUsers } from './store/user/user.reducer';


function App() {
  useGetUsers()
  return (
    <div className="App flex column">
      <AppHeader />
      <div className='main'>
        <Routes>
          {routes.map(r => {
            return <Route key={r.path} path={r.path} element={<r.component />} />
          })}

        </Routes>
      </div>
    </div>
  );
}

const useGetUsers = () => {

  const token = useAppSelector(state => state.user.token)
  const tokenTime = useAppSelector(state => state.user.tokenTime)
  const username = useAppSelector(state => state.user.username)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) navigate('/login')
    getUsers()

  }, [token])

  const getUsers = async () => {
    try {
      if (token) {
        const users = await userService.getUsers(token)
        dispatch(setUsers(users))
        const currUser = users.find((u: User) => u.username === username)
        dispatch(setUser(currUser))
      }
    } catch (err) {
      console.log('err:', err)
    }
  }

}


export default App;
