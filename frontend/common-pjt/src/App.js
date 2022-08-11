import { Route, Switch, BrowserRouter} from 'react-router-dom';
import './App.css';
import Login from './components/auth/login/Login';
import Pledge from './components/auth/Pledge';
import Signup from './components/auth/signup/Signup';
import Main from './components/main/Main';
import UpdateProfile from './components/main/profile/UpdateProfile';
import Mode from './components/mode/Mode';
import Waiting from './components/Waiting';
import Meeting from './components/meeting/Meeting';
import Countdown from './components/Countdown';
import Vote from './components/Vote';
import Result from './components/Result';
import PrivateRoute from './lib/PrivateRoute';
import PublicRoute from './lib/PublicRoute';

function App() {
  
  return (
    <BrowserRouter>
      <Switch>



        {/* <Route path="/" element={<PublicRoute component={<Login />} />}/> */}
        <Route exact path="/" component={Login}/>
        {/* <Route path="/pledge" element={<PublicRoute component={<Pledge />} />}/> */}
        <Route exact path="/pledge" component={Pledge}/>
        {/* <Route path="/signup" element={<PublicRoute component={<Signup />} />}/> */}
        <Route exact path="/signup" component={Signup}/>
        
        {/* main이랑 profile에 파라미터가 필요할까? */}
        {/* <Route path="/main" element={<PrivateRoute component={<Main />}/>}/> */}
        <Route exact path="/main" component={Main}/>
        {/* <Route path="/profile" element={<PrivateRoute component={<UpdateProfile />}/>}/> */}
        <Route exact path="/profile" component={UpdateProfile}/>

        {/* <Route path="/mode" element={<PrivateRoute component={<Mode />} />}/> */}
        <Route exact path="/mode" component={Mode}/>
        {/* <Route path="/waiting" element={<PrivateRoute component={<Waiting />} />}/> */}
        <Route exact path="/waiting" component={Waiting}/>
        {/* <Route path="/meeting" element={<PrivateRoute component={<Meeting />} />}/> */}
        <Route exact path="/meeting" component={Meeting}/>
        {/* <Route path="/countdown" element={<PrivateRoute component={<Countdown />} />}/> */}
        <Route exact path="/countdown" component={Countdown}/>
        {/* <Route path="/vote" element={<PrivateRoute component={<Vote />} />}/> */}
        <Route exact path="/vote" component={Vote}/>
        {/* <Route path="/result" element={<PrivateRoute component={<Result />} />}/> */}
        <Route exact path="/result" component={Result}/>
      
      </Switch>
    </BrowserRouter>
  );
};

export default App;