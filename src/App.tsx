import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AppHeader } from './cmps/app-header';
import { User } from './interfaces/user';
import routes from './routes';
import { userService } from './services/user.service';
import { useAppDispatch, useAppSelector } from './store/store.hooks';
import { setToken, setTokenUpdatedTime, setUser, setUsers } from './store/user/user.reducer';


function App() {
  useGetUsers()
  // useRefreshToken()
  return (
    <div className="App">
      <AppHeader/>
      <Routes>
        {routes.map(r => {
          return <Route key={r.path} path={r.path} element={<r.component />} />
        })}
      </Routes>
    </div>
  );
}

const useGetUsers = () => {

  const token = useAppSelector(state => state.user.token)
  const tokenTime = useAppSelector(state => state.user.tokenTime)
  const username = useAppSelector(state => state.user.username)
  const dispatch = useAppDispatch()
  const checkTokenTime = tokenTime.updatedTime ? ((Date.now() - tokenTime.updatedTime) / 1000 / 60) : 0
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) navigate('/login')
    getUsers()
   
  }, [token])

  const getUsers = async () => {
    try {
      if (token) {
        const users = await userService.getUsers(token)
        console.log('users:', users)
        dispatch(setUsers(users))
        // setUsers(users)
        const currUser = users.find((u: User) => u.username === username)
        dispatch(setUser(currUser))
      }
    } catch (err) {
      // if (token && checkTokenTime >= 5) {
      //   const newToken = await userService.refreshToken(token)
      //   dispatch(setToken(newToken))
      //   dispatch(setTokenUpdatedTime(Date.now()))
      //   console.log('refreshing token');

      console.log('err:', err)
    }
  }

}


export default App;
