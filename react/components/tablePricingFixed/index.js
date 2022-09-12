import React, {useEffect, useState} from 'react';
import { useProduct } from 'vtex.product-context'
import ToolTip from './ToolTip'
import styles from './index.css'

const initOptions = ["menor","mayor", "cantidad"]

const TablePricingFixed = ({}) => {

    const [loading, setLoading] = useState(false)

    const [fixedPrices, setFixedPrices] = useState({})

    const contextProduct = useProduct()

    const {
        selectedItem:{
            itemId,
            sellers
        }
    } = contextProduct

    const {
        commertialOffer:{
            AvailableQuantity
        }
    } = sellers[0]

    const handleClick = e =>{
        console.log(e)
        preventDefault()
    }
    useEffect(()=>{
        const getFixedPrices = async () =>{
            const endpoint = `https://debarricasar.myvtex.com/_v/pricing/fixed/${itemId}`
            const data = await fetch(endpoint)
            const fixedPricesFetch = await data.json()
            setLoading(true)
            setFixedPrices(fixedPricesFetch)
        }
        getFixedPrices()
    },[])

    return (
        <div className={styles.tablePrice} onClick={(e)=>handleClick}>
            {fixedPrices.hasOwnProperty('fixedPrices') && (
                <div className={styles.pricesContainer}>
                    <div className={styles.fixedprice}>
                        <div>
                            <span className={styles.priceTitle}>Por {initOptions[0]} </span>
                            <span>x1mts.</span>            
                        </div>
                        <div className={styles.price}>
                            ${fixedPrices?.basePrice}
                        </div>
                    </div>
                    {
                        fixedPrices?.fixedPrices?.map((FixedPrice,index)=>index<=1?(
                            <div key={index} className={styles.fixedprice}>
                                <div>
                                    <span className={styles.priceTitle}>Por {initOptions[index+1]} </span>
                                    <span>x{FixedPrice.minQuantity}mts.</span>
                                </div>
                                <div className={styles.price}>
                                    ${FixedPrice.value}
                                </div>
                            </div>
                        ):<></>)
                    }
                </div>
            )}
            {!loading && (
                <div style={{width:"100%",height:"110px", marginBottom:"6px"}}>
                    <div className={styles.skeleton} style={{width:"100%",height:"33px", marginBottom:"5px"}}></div>
                    <div className={styles.skeleton} style={{width:"100%",height:"33px"}}></div>
                    <div className={styles.skeleton} style={{width:"100%",height:"33px",marginTop:"5px"}}></div>
                </div>
            )}
            {(loading && !fixedPrices.hasOwnProperty('fixedPrices')) && (<div className={styles.tableEmpty} style={{width:"100%",height:"110px", marginBottom:"6px"}}></div>)}
            {AvailableQuantity==0 && <div style={{width:"100%",height:"40px"}}></div>}
        </div>
    )
}
export default TablePricingFixed