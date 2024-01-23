import React, { useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Admin, Analytics, Dashboard, Home, Landing } from './pages'
import ProtectedRoute from './components/ProtectedRoute';


const App = () => {

  const [user, setUser] = useState();

  const login = () => {
    setUser({
      id: 1,
      name: "Miguel",
      permission: ['analize'],
      rol: ['admin']
    })
  }

  const logout = () => setUser(null);

  return (
    <BrowserRouter>
      <Navigation />

      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Log in</button>
      )}

      <Routes>
        <Route index element={<Landing />} />

        <Route element={<ProtectedRoute isAllowed={user} />}>
          <Route path='/home' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>

        <Route
          path='/analytics'
          element={
            <ProtectedRoute
              isAllowed={!!user && user.permission.includes('analize')}
              redirectTo="/home"
            >
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path='/admin'
          element={
            <ProtectedRoute
              isAllowed={!!user && user.rol.includes('admin')}
              redirectTo="/home"
            >
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>

  )
}

function Navigation() {
  return (
    <ul>
      <li>
        <Link to='/'>Landing</Link>
      </li>
      <li>
        <Link to='/home'>Home</Link>
      </li>
      <li>
        <Link to='/dashboard'>Dashboard</Link>
      </li>
      <li>
        <Link to='/analytics'>Analytics</Link>
      </li>
      <li>
        <Link to='/admin'>Admin</Link>
      </li>
    </ul>
  )
}

export default App
