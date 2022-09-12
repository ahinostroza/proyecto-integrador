import React from "react";
import { useOrder } from 'vtex.order-placed/OrderContext';
import styles from './index.css'

const RowTitle  = () => {
    return(
        <div className={styles.rowTitle}>
            <div>&nbsp;&nbsp;&nbsp;Producto</div>
            <div className={styles.infoTitleContainer}>
                <div>      </div>
                <div>Precio</div>
                <div>Cantidad</div>
                <div>Total</div>
            </div>
        </div> 
    );   
}

const RowDetail = ({CurrencySimbol, item}) => {
    const price = (item.price/100).toFixed(2);
    const subtotal = (price * item.quantity).toFixed(2)
    return(
        <div className={styles.rowDetail}>            
            <img className={styles.itemImage} src={item.imageUrl.replace("55-55","550-550")}/>            
            <div className={styles.infoContainer}>
                <div className={styles.name}>{item.name}</div>
                <div className={styles.quantityContent}>
                    <span className={styles.quantityLabel}>Cantidad:&nbsp;</span>
                    <span className={styles.quantity}>{item.quantity} {item.measurementUnit!='un' && item.measurementUnit}</span>
                </div>
                <div className={styles.subtotal}>
                    <span>{CurrencySimbol} {subtotal}</span>
                </div>
            </div>
        </div>
    );
}

const CustomOrderPlaced = () => {
    const order = useOrder();
    const productDetail = order?.items;

    const date = new Date(order.deliveryParcels[0].shippingEstimateDate)
    return(
        <div className={styles.containerOrderGrid}>
            <div className={styles.container}>
                <div className={styles.containerShipping}>
                    <div>
                        <strong>
                            <span style={{color:"#424242"}}>ENVÍO {order.deliveryParcels[0].selectedSla.toUpperCase()}</span>
                        </strong>
                    </div>
                    <span style={{color:"#9E9E9E"}}>Hasta el {date.getDate()} de {date.toLocaleString('default', { month: 'long' })} de {date.getFullYear()}</span>
                </div>
                {order?.items.map((item, index)=>(
                    <RowDetail key={index} item={item} CurrencySimbol={'$'}/>
                ))}
            </div>
            <div>
               <div className={styles.containerInfoShipping}>
               <div class="vtex-rich-text-0-x-container vtex-rich-text-0-x-container--order-placed-card-title flex tl items-start justify-start t-body c-on-base">
                    <div class="vtex-rich-text-0-x-wrapper vtex-rich-text-0-x-wrapper--order-placed-card-title">
                        <p class="lh-copy vtex-rich-text-0-x-paragraph vtex-rich-text-0-x-paragraph--order-placed-card-title">
                            RECIBE
                        </p>
                    </div>
                </div>
                <div class="flex flex-column c-on-base">
                    <div class="vtex-profile-form-3-x-profileSummary">
                        <ul class="vtex-order-placed-2-x-customerInfoListContainer list pl0">
                            <li class="vtex-order-placed-2-x-customerInfoListEmail pv2 c-muted-2">
                                {order.deliveryParcels[0].address.receiverName}
                            </li>
                            <li class="vtex-order-placed-2-x-customerInfoListEmail pv2 c-muted-2">
                                {order.deliveryParcels[0].address.city}
                            </li>
                            <li class="vtex-order-placed-2-x-customerInfoListDocument pv2 c-muted-2">
                            {order.deliveryParcels[0].address.state}
                            </li>
                            <li class="vtex-order-placed-2-x-customerInfoListPhone pv2 c-muted-2">
                            {order.deliveryParcels[0].address.addressType}
                            </li>
                        </ul>
                    </div>
                </div>
               </div>
            </div>
        </div>
    );
}

export default CustomOrderPlaced;