import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Pages/Home/Home';
import './Router.scss';

// Router
const Router = (props) => {

    return (
        <div className='Router'>
            <BrowserRouter>
                <Routes>
                    <Route path="home" element={<Home />} />
                    <Route path="*" element={<Home />} />
                </ Routes>
            </BrowserRouter>
        </div>
    )
}

export default Router;