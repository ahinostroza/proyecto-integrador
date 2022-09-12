import React from 'react'
import styles from './index.css'
import {Link} from 'vtex.render-runtime'

const SubCategorieCard = ({name,image,href,children}) =>{
    return (
        <div className={styles.card}>
            <Link to={href}>
                <div className={styles.cardImg}>
                    <img src={image}/>
                </div>
                <h3>{name}</h3>
            </Link>
            {children.length>0 && (
                <div className={styles.subcategories}>
                    {children.map((children,i)=>
                        {if(i<4){
                            return( 
                                <Link to={children.href}>
                                    {children.name}
                                </Link>
                            )
                        }
                        }
                    )}
                </div>
            )}
            <div className={styles.subcategoriesContainer}>
                <div className={styles.showMoreCategorie}>
                    <Link to={href}>
                        VER TODOS
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SubCategorieCard