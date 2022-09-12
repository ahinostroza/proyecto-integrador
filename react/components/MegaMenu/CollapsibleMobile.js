import React, {useState} from 'react'
import { Collapsible } from 'vtex.styleguide';

const CollapsibleMobile = ({name}) => {
    const [isOpen,setIsOpen] = useState(false)
    return (
        <Collapsible
            header={
                <span className="c-action-primary hover-c-action-primary fw5">
                    {name}
                </span>
            }
            onClick={setIsOpen(!isOpen)}
            isOpen={isOpen}
        >
            <div className="mt4">
                {"HIJO"}
            </div>
        </Collapsible>
    )
}

export default CollapsibleMobile