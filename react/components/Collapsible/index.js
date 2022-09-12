import React, {useState} from 'react'
import { Collapsible } from "vtex.styleguide";
import { Icon } from 'vtex.store-icons'
import styles from './index.css'

const CollapsibleContainer = ({children,Header}) => {
    const [open, setOpen] = useState(false)
    return (
        <Collapsible
            header={
                <div className={styles["collapsible--collapsible-container"]}>
                    <Header/>
                    <Icon size={12} id="nav-caret--down"/>
                </div>
            }
            align="right"
            onClick={()=>{setOpen(!open)}}
            isOpen={open}
            >
                <div className={styles["collapsible--collapsible-content"]}>
                    {children}
                </div>
        </Collapsible>
    )
}

export default CollapsibleContainer