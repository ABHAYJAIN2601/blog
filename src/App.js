import logo from './logo.svg'
import './App.css'
import BlogList from './Components/Blog/BlogList';
import LoginPage from './Components/LoginPage/LoginPage';
import { useEffect ,useState } from 'react';
import { Provider, connect } from 'react-redux'
import store from './Redux/store';
import { BrowserRouter, Route, Switch, useNavigate } from 'react-router-dom';
import SignUp from './Components/SignUp';
import MainPage from './Components/MainPage';
import 'bootstrap/dist/css/bootstrap.css';

function App () {
  const [user, setUser] = useState('');
  let protectedRoutes;
  // let navigate = useNavigate();
  useEffect(() => {
    const user  = localStorage.getItem('username');
    if(user) {
      setUser(user);
      // navigate('/dashboard');
    }
  }, []);
  return (
    <Provider store={store}>
     
    <BrowserRouter>
    <div className='App'>
     <MainPage/>
    </div>
    </BrowserRouter>
    </Provider>
  )
}

export default App;
