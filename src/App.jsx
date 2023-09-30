import './App.scss';
import NavHeader from './Components/Navigation/NavHeader';
import SideBar from './Components/Navigation/SideBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Pages/Home/Home';
import './Router.scss';
import GameSelect from './Components/Pages/GameSelect/GameSelect';
import Playground from './Components/Pages/Playground/Playground';
import SimpleTypeGame from './Components/Pages/SimpleTypeGame/SimpleTypeGame';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='BelowHeader'>
          <div className='SideAndRouter'>
            <SideBar />
                <Routes>
                    <Route path="pg" element={<Playground />} />
                    <Route path="simple" element={<SimpleTypeGame />} />
                    <Route path="games" element={<GameSelect />} />
                    <Route path="home" element={<Home />} />
                    <Route path="*" element={<Home />} />
                </ Routes>
            </div>
          <NavHeader />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
