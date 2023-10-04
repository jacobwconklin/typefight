import './App.scss';
import NavHeader from './Components/Navigation/NavHeader';
import SideBar from './Components/Navigation/SideBar';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';

// Moving BrowserRouter up allows useNavigate to be used in the header

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <NavHeader />
        <div className='BelowHeader'>
          <div className='SideAndRouter full-size'>
            <SideBar />
               <Router />
            </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
