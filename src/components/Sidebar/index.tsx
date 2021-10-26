import { useState } from 'react';
import { Link } from 'react-router-dom';
import Home from '@material-ui/icons/Home';



const MenuLeft = (): JSX.Element => {

    const [btnOpen, setBtnOpen] = useState<string>("bx-menu");
    const [open, setopen] = useState<boolean>(false);

    const closeMenu = () => {
        setopen(!open)
        menuBtnChange()
    }
    function menuBtnChange() {
        if (!open) {
            setBtnOpen("bx-menu-alt-right")
        } else {
            setBtnOpen("bx-menu")
        }
    }

    async function isLogout() {
        //await logiut()
    }
    return (
        <div className={`sidebar ${open ? "open" : ""}`}>
            <div className="logo-details">
                <div className="logo_name">Admin</div>
                <i className={`bx ${btnOpen}`} id="btn" onClick={closeMenu} ></i>
            </div>
            <ul className="nav-list">
                <li >
                    <Link to='/'>
                        <Home />
                        <span className="links_name">Home</span>
                    </Link>
                    <span className="tooltip">Home</span>
                </li>
                <li className="profile">
                    <div className="logout-btn" onClick={isLogout} style={{ borderRadius: "12px", borderBottom: "5px", height: "45px" }}>
                        <i className='bx bx-log-out'></i>
                        <span className="links_name">Logout</span>
                        <span className="tooltip">Logout</span>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default MenuLeft;