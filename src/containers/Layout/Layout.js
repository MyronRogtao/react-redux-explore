import React, { useState } from "react";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import classes from './Layout.module.css';

const Layout = (props) => {
    const [showSideDrawer, setSideDrawer] = useState(false);

    const sideDrawerCloseHandler = () => setSideDrawer(false)

    const drawerToggleHandler = () => setSideDrawer(currentState => !currentState);

    return (
        <React.Fragment>
            <Toolbar drawerToggleClicked={drawerToggleHandler}/>
            <SideDrawer isOpen={showSideDrawer} closed={sideDrawerCloseHandler}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </React.Fragment>
    );
} 

export default Layout;