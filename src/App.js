import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Wrapper } from './styles.js'
import { mainRoutes } from 'assets/Routes'

toast.configure()

function App() {
  return (
    <>
      <Router>
        <Wrapper>
          <Switch>
            {mainRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))}
          </Switch>
        </Wrapper>
      </Router>
    </>
  )
}

export default App
