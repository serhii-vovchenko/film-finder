import s from './Navigation.module.css';
import clsx from 'clsx';

import { NavLink } from 'react-router-dom';

const Navigation = () => {
    const buildLinkClass = ({ isActive }) => {
        return clsx(s.link, isActive && s.active);
    };

    return (
        <div className={s.wrapper}>
            <ul className={s.navlist}>
                <li className={s.navlink}>
                    <NavLink to={'/'} className={buildLinkClass}>
                        Home
                    </NavLink>
                </li>
                <li className={s.navlink}>
                    <NavLink to={'/movies'} className={buildLinkClass}>
                        Movies
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Navigation;
