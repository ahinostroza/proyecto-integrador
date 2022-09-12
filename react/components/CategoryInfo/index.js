import React, {useState} from 'react'
import styles from './index.css'

import {useQuery} from 'react-apollo'
import CATEGORYINFO from '../../graphql/getCategory.gql'

import SubCategorieCard from './SubCategorieCard';

let subCategories = []

const CategoryInfo = (props) =>{
    const {params:{id, department},BlockSubCategories,AllProductOfCategorie} = props

    const { loading, error, data } = useQuery(CATEGORYINFO,{
        variables: { id }
    })

    subCategories = data?.category?.children;

    return loading?<></>:(
        <div className={styles.info}>
            <div className={styles.infoWrapper}>
                <h2 className={styles.InfoDepartment}>{department.replace('-',' ').replace("-"," ").replace("-"," ")}</h2>
                <div className={styles.CategoryChildrens}>
                    {data?.category?.hasChildren && (
                        <>
                            <div className={styles.limit}>
                                <BlockSubCategories>
                                    {data?.category?.children?.map(card=>(
                                        <SubCategorieCard
                                            name={card.name}
                                            image={props[card.name.toLowerCase().trim()]}
                                            href={card.href}
                                            children={card.children}
                                        />
                                    ))}
                                </BlockSubCategories>
                            </div>
                            
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

CategoryInfo.getSchema = () => {
    let base = {}
    let schemaCategoriesImages={}
    subCategories?.forEach((subCategory)=>{
        schemaCategoriesImages[`${subCategory.name.toLowerCase().trim()}`] = {
            title:`Imagen de ${subCategory.name}`,
            type:"string",
            widget:{
                'ui:widget': 'image-uploader'
            }   
        }
    })
    base = {
        properties:{
            ...base,
            ...schemaCategoriesImages
        }
    }
    return {
        title:"Card Categorie",
        type: "object",
        ...base 
    }
}

export default CategoryInfo