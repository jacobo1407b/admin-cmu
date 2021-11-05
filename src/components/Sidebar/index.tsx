import { useState, FunctionComponent, Fragment } from 'react';
import { IRuta } from 'types';
import { Link } from 'react-router-dom';
import { Icon, Menu, Sidebar } from 'semantic-ui-react'



interface ISidebar {
    items: IRuta[],
    open: boolean,
    setopen: any
}
const MenuLeft: FunctionComponent<ISidebar> = ({ open, items, setopen }): JSX.Element => {
    const [menuItems] = useState(items)

    return (
        <>

            <Sidebar
                as={Menu}
                animation='overlay'
                icon='labeled'
                inverted
                onHide={() => setopen(false)}
                vertical
                visible={open}
                width='thin'
            >
                {menuItems.map((poste) => (
                    <Fragment key={poste.id}>
                        {poste.name === "Perfil" ? null : (
                            <Link to={poste.path}>
                                <Menu.Item >
                                    <Icon name={poste.icon} />
                                    {poste.name}
                                </Menu.Item>
                            </Link>

                        )}
                    </Fragment>
                ))}
            </Sidebar>
        </>
    )
}

export default MenuLeft;


/**
 *
 * <>
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
 */