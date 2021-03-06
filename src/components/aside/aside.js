import React, {useState} from 'react';
import Navbar from './navbar';
// import Friends from './friends';
import {Squash as Hamburger} from 'hamburger-react'
import {useMediaQuery} from 'react-responsive'

import s from './Aside.module.sass';
import { connect } from 'react-redux';

const Aside = ({navbar, friends, isAuth, id}) => {

    const isMobile = useMediaQuery({maxWidth: 767});

    const unitedStyles = `${s.aside} ${s.onOpenStyle}`;

    const [isOpen, setOpen] = useState(false)

    const [asideStyle, setAsideStyle] = useState(s.aside)

    const onOpenMenu = () => {
        setAsideStyle(unitedStyles);
    }

    const onCloseMenu = () => {
        setAsideStyle(s.aside);
    }

    const closeAside = () => {
        setOpen(false);
        setAsideStyle(s.aside);
    }


    return (
        <div className={s.additionalWrapper}>
            <aside className={asideStyle} onBlur={isMobile ? closeAside : null}>
                {isMobile
                    ? <div className={s.hamburgerMenuIcon}>
                        <Hamburger
                            toggled={isOpen}
                            toggle={setOpen}
                            size={24}
                            duration={0.8}
                            onToggle={toggled => {if (toggled) {onOpenMenu();} else {onCloseMenu();}}} />
                    </div>
                    : null}
                <div className={s.navbarFriendsWrapper} >
                    <Navbar navbar={navbar} onClickMenuItem={closeAside} userId={id}/>
                    {/* {isAuth ? <Friends friendsData={friends} /> : ''} */}
                </div>
            </aside>
        </div>
    )
}

const mapStateToProps = ({aside: {navbar, friends}, auth: {isAuth, id}}) => ({navbar, friends, isAuth, id});

export default connect(mapStateToProps, {})(Aside);
