import Pages from '@/pages'
import Home  from '@/pages/home'
import Tip  from '@/pages/Tip'
import { Navigate, useRoutes } from 'react-router-dom'
function Route() {
  const element = useRoutes([
    {
      path: '/',
      element: <Pages/>,
      children: [
        {
          path: '/',
          element: <Navigate to={"/home"}/>
        },
        {
          path: '/home',
          element: <Home />
        },
        {
          path: '/tip',
          element: <Tip />
        }
      ]
    }
  ])
  return element
}

export default Route
