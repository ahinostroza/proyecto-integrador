import React from 'react'
import {Link} from 'vtex.render-runtime'
import Categorie from './Categorie';
import styles from './index.css'

const SubCategorie =({childrens:categories})=>{
    return(
        <>
            <ul>
                {categories?.map((c)=>(
                    <li key={c.id}>
                        <div className={c?.hasChildren ? styles.newCategory: ''}>
                            <Link to={c?.href?.toLowerCase()}>
                                <div className={styles.imgBlock}>
                                    {c?.name}
                                    <img src={c?.image}/>
                                </div>
                            </Link>
                        </div>
                        {c?.hasChildren && (
                            <ul className={styles.listSubCategories}>
                                {c.children?.map(s=>(
                                    <Categorie id={s?.id} name={s?.name} href={s?.href} image={s?.image}/>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </>
    )
}

{/*
const SubCategorie = ({id,name,href,image}) =>{
    return(
        <li key={id}>
            <Link to={href?.toLowerCase()}>
                <div className={styles.imgBlock}>
                    {name}
                    <img src={image}/>
                </div>
            </Link>
        </li>
    )
}*/}


export default SubCategorie