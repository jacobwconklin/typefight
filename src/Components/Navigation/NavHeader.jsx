import './NavHeader.scss';

// NavHeader
const NavHeader = (props) => {

    // const navigate = ();

    return (
        <div className='NavHeader'>
            <div className='SideBarButton'>
                {/* Cause side bar to entirely disappear / re-appear */}
                X
            </div>
            <div className='TypeFight'>
                <h1>TypeFight</h1>
            </div>
        </div>
    )
}

export default NavHeader;