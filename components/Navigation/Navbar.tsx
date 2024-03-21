import React from "react"
import {Avatar, Logo} from "@/components"

const Navbar = (): React.ReactNode => {
    return (
        <nav style={style.nav}>
            <Logo />
            <Avatar />
        </nav>
    )
}

const style = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '55px',
        width: '100%',
        padding: '0px 12px',
        background: '#181818',
        borderBottom: '1px solid #282636'
    }
}

export default Navbar
