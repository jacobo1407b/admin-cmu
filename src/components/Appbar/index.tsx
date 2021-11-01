import { FunctionComponent } from 'react'
import { Avatar } from '@material-ui/core';
import { globalState, User } from 'types'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

interface IAppbar {
    pathP: string,
    setopen: any,
    open: boolean
}

const Appbar: FunctionComponent<IAppbar> = ({ pathP, setopen, open }) => {
    const user: User = useSelector((state: globalState) => state.user);


    return (
        <>
            <header className="header-custom">
                <h2>
                    <label onClick={() => setopen(!open)}>
                        <span className="las la-bars"></span>
                    </label>

                    Home
                </h2>
                <div className="user-wrapper">
                    <Link to={pathP} className="image-custom">
                        <Avatar alt="user" src={user.url} />
                    </Link>
                    <div>
                        <h4>{user.nombre} {user.a_paterno}</h4>
                        <small>{user.matricula}</small>
                    </div>
                </div>
            </header>
        </>
    )
}
export default Appbar;