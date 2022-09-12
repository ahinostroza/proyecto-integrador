import React from 'react'
import styles from './index.css'
import SubCategorie from './SubCategorie'
import {Link} from 'vtex.render-runtime'

const DropDown =({childrens:categories})=>{
    return(
        <>
            <ul>
                {categories?.map((c)=>(                                        
                    <li key={c.id}>
                        <div className={styles.titleCategorie}>
                            <Link to={c?.href?.toLowerCase()}>
                                <div className={styles.imgBlock}>
                                    {c?.name}
                                    <img src={c?.image}/>
                                </div>
                            </Link>
                        </div>
                        {c?.hasChildren && (
                            <ul>
                                <SubCategorie childrens={c?.children}/>                                
                            </ul>
                        )}
                    </li>                    
                ))}
            </ul>
        </>
    )
}

export default DropDown