import React from 'react';
import {useProduct} from 'vtex.product-context'

const ProductAvailability = ({Availability,NoAvailability}) => {
    
    const {
        selectedItem:{
            sellers
        }
    } = useProduct()

    const AvailableQuantity = sellers[0]?.commertialOffer?.AvailableQuantity

    return (
        <>
            {AvailableQuantity>0?<Availability />:<NoAvailability />}
        </>
    )
}

export default ProductAvailability