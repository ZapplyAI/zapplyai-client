import React from "react"
import ExploreIcon from '@mui/icons-material/Explore';

interface DialogIconProps {
    iconName: string
}

const DialogIcon  = ( { iconName } : DialogIconProps ) : React.ReactNode => {
    return (
        <div style={style.iconContainer}>
            <ExploreIcon style={style.iconSvg}/>
        </div>
    )
}

const style = {
    iconContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: "40px",
        width: "40px",
        background: '#282636',
        borderRadius: '8px'
    },
    iconSvg: {
        height: "25px",
        width: "25px",
        color: '#000000'
    }
}

export default DialogIcon
