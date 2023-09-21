import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Pages/Home/Home';
import './Router.scss';
import GameSelect from './Components/Pages/GameSelect/GameSelect';
import Playground from './Components/Pages/Playground/Playground';

// Router
const Router = (props) => {

    return (
        <div className='Router'>
            <BrowserRouter>
                <Routes>
                    <Route path="pg" element={<Playground />} />
                    <Route path="games" element={<GameSelect />} />
                    <Route path="home" element={<Home />} />
                    <Route path="*" element={<Home />} />
                </ Routes>
            </BrowserRouter>
        </div>
    )
}

export default Router;