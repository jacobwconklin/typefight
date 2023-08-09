import './App.scss';
import NavHeader from './Components/Navigation/NavHeader';
import SideBar from './Components/Navigation/SideBar';
import Router from './Router';

const App = () => {
  return (
    <div className="App">
      <div className='BelowHeader'>
        <div className='SideAndRouter'>
          <SideBar />
          <Router />
        </div>
      </div>
      <NavHeader />
    </div>
  );
}

export default App;
