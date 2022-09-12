import styles from './index.css'

const ToolTip = ({minQuantity,labelTool}) =>{
    return (
        <div className={styles.tooltip}>
            <span className={styles.tooltipBtn}>?</span>
            <div className={styles.tooltipLabel}>
                <h5>Piezas de {minQuantity} mts.</h5>
                <p>
                    Precio aplicado a cantidades {labelTool}es de {minQuantity} mts.
                </p>
            </div>
        </div>
    )
}

export default ToolTip