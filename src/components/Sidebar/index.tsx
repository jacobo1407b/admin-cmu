import { useState, FunctionComponent, Fragment } from 'react';
import { IRuta } from 'types';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';
import useLogout from 'hooks/logout';


interface ISidebar {
    items: IRuta[],
    open: boolean
}
const MenuLeft: FunctionComponent<ISidebar> = ({ open, items }): JSX.Element => {

    const {logout} = useLogout()
    const [menuItems] = useState(items)
    const [active, setactive] = useState<any>(0)

    async function isLogout() {
        logout()
    }

    function select(id: any) {
        var element = document.getElementById(active);
        element?.setAttribute('class', "")
        var element2 = document.getElementById(id);
        element2?.setAttribute('class', "active")
        setactive(id)
    }
    return (
        <>
            <input type="checkbox" id="nav-toggle" checked={open} />
            <div className="sidebar">
                <div className="sidebar-brand">
                    <h2>
                        <span className="lab la-accusoft"></span>
                        {open ? null : "Administrador"}

                    </h2>
                </div>
                <div className="sidebar-menu">
                    <ul>
                        {menuItems.map((values, i: any) => (
                            <Fragment key={values.id}>
                                {values.id === 5 ? null : (
                                    <li key={values.id} onClick={() => select(i)} >
                                        <Link to={values.path} id={i} className="">
                                            <Menu.Item
                                                name={values.name}
                                            >
                                                <h2>
                                                    <Icon name={values.icon} />
                                                    {open ? null : values.name}
                                                </h2>

                                            </Menu.Item>
                                        </Link>
                                    </li>
                                )}

                            </Fragment>
                        ))}
                        <li onClick={isLogout} >
                            <a href='/#'>
                                <Menu.Item
                                    name='Logout'
                                >
                                    <h2>
                                        <Icon name='key' />
                                        {open ? null : 'Logout'}
                                    </h2>

                                </Menu.Item>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default MenuLeft;
