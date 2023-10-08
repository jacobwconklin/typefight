import { Route, Routes } from 'react-router-dom';
import Home from './Components/Pages/Home/Home';
import './Router.scss';
import GameSelect from './Components/Pages/GameSelect/GameSelect';
import Playground from './Components/Pages/Testing/Playground/Playground';
import SimpleTypeGame from './Components/Pages/Testing/SimpleTypeGame/SimpleTypeGame';
import PlayScreen from './Components/Pages/PlayScreen/PlayScreen';

// TODO remove route games to GameSelect screen when I don't need to edit that screen anymore

// Router
const Router = (props) => {

    return (
        <div className='Router full-size'>
                <Routes>
                    {/* Play path may control a lot of the navigation via conditional rendering of the session, and then
                        the games instead of routing for each change in page */}
                    <Route path="play/:type/:code?" element={<PlayScreen />} />
                    <Route path="pg" element={<Playground />} />
                    <Route path="simple" element={<SimpleTypeGame />} />
                    <Route path="games" element={<GameSelect />} />
                    <Route path="home" element={<Home />} />
                    <Route path="*" element={<Home />} />
                </ Routes>
        </div>
    )
}

export default Router;