import { Route, Routes } from 'react-router-dom';
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

const App = () => {
  
  return (
    <Routes>
      <Route path="/" element={<PublicRoute component={<Login />} />}/>
      {/* <Route path="/" element={<Login />}/> */}
      <Route path="/pledge" element={<PublicRoute component={<Pledge />} />}/>
      {/* <Route path="/pledge" element={<Pledge />}/> */}
      <Route path="/signup" element={<PublicRoute component={<Signup />} />}/>
      {/* <Route path="/signup" element={<Signup />}/> */}
      
      {/* main이랑 profile에 파라미터가 필요할까? */}
      <Route path="/main" element={<PrivateRoute component={<Main />}/>}/>
      {/* <Route path="/main" element={<Main />}/> */}
      <Route path="/profile" element={<PrivateRoute component={<UpdateProfile />}/>}/>
      {/* <Route path="/profile" element={<UpdateProfile />}/> */}

      <Route path="/mode" element={<PrivateRoute component={<Mode />} />}/>
      {/* <Route path="/mode" element={<Mode />}/> */}
      <Route path="/waiting" element={<PrivateRoute component={<Waiting />} />}/>
      {/* <Route path="/waiting" element={<Waiting />}/> */}
      <Route path="/meeting" element={<PrivateRoute component={<Meeting />} />}/>
      {/* <Route path="/meeting" element={<Meeting />}/> */}
      <Route path="/countdown" element={<PrivateRoute component={<Countdown />} />}/>
      {/* <Route path="/countdown" element={<Countdown />}/> */}
      <Route path="/vote" element={<PrivateRoute component={<Vote />} />}/>
      {/* <Route path="/vote" element={<Vote />}/> */}
      <Route path="/result" element={<PrivateRoute component={<Result />} />}/>
      {/* <Route path="/result" element={<Result />}/> */}
    
    </Routes>
  );
};

export default App;