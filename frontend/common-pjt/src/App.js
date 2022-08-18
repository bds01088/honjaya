import { Route, Switch, BrowserRouter } from 'react-router-dom'
import './App.css'
import Login from './components/auth/login/Login'
import Pledge from './components/auth/Pledge'
import Signup from './components/auth/signup/Signup'
import Main from './components/main/Main'
import UpdateProfile from './components/main/profile/UpdateProfile'
import Mode from './components/mode/Mode'
import Waiting from './components/Waiting'
import Meeting from './components/meeting/Meeting'
import Countdown from './components/Countdown'
import PrivateRoute from './lib/PrivateRoute'
import PublicRoute from './lib/PublicRoute'
import Error from './components/Error'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path="/" component={Login} />
        <PublicRoute exact path="/pledge" component={Pledge} />
        <PublicRoute exact path="/signup" component={Signup} />
        <PrivateRoute exact path="/main" component={Main} />
        <PrivateRoute exact path="/profile" component={UpdateProfile} />
        <PrivateRoute exact path="/mode" component={Mode} />
        <PrivateRoute exact path="/waiting" component={Waiting} />
        <PrivateRoute exact path="/meeting" component={Meeting} />
        <PrivateRoute exact path="/countdown" component={Countdown} />
        <Route path="*" component={Error} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
