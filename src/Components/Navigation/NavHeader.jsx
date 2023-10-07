import { Link } from 'react-router-dom';
import './NavHeader.scss';

// NavHeader
const NavHeader = (props) => {

    return (
        <div className='NavHeader'>
            <div className='SideBarButton'>
                {/* Cause side bar to entirely disappear / re-appear */}
                $$
            </div>
            {/* Maybe put all player icons in the header... would need to push a context out of player icons or something */}
            <div className='TypeFight'>
                <Link to={"/"} className='Title'>TypeFight</Link>
            </div>
        </div>
    )
}

export default NavHeader;