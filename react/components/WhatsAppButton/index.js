import React from "react";
import styles from "./index.css";

const WhatsAppButton = () => {
    return(
        <a        
            href="https://wa.me/5491165058817"
            target="_blank"
        >
            <img 
                className={styles.whatsAppLogo}
                src="https://sanisidrolonasar.vteximg.com.br/arquivos/Icon-WhatsApp.png"
            />
        </a>        
    );
}

export default WhatsAppButton;