import React from 'react'
import {Link} from 'vtex.render-runtime'
import styles from './index.css'

const Categorie = ({id,name,href,image}) =>{
    return(
        <li key={id}>
            <Link to={href?.toLowerCase()}>
                <div className={styles.listSubCategories}>
                    {name}
                    <img src={image}/>
                </div>
            </Link>
        </li>
    )
}


export default Categorie;