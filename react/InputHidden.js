import React, {useRef,useEffect} from 'react'
import {useProduct} from 'vtex.product-context'

const InputHidden = ({Input}) => {

    const context = useProduct()
    const input = useRef()

    const {
        selectedItem:{
            name
        }
    } = context

    useEffect(()=>{
        const inputHTML = input.current.querySelector('input')

        inputHTML.value = name
    })

    return <div ref={input}><Input/></div>
}

export default InputHidden