import React from 'react'
import {useQuery} from 'react-apollo'
import styles from './index.css'
import {Link, useRuntime} from 'vtex.render-runtime'
import CATEGORIES from '../../graphql/getCategories.gql'
import BRANDS from '../../graphql/getRBrands.gql';
import DropDown from './Desplegable'
import ColumnDropdown from './ColumnDropdown';
import Bodega from './BodegasMenu';
import Region from './MenuOptions/Regiones';

let categoriesArray

const MegaMenu = ({categories, itemsPerColumn}) =>{    
    const {loading, error, data} = useQuery(CATEGORIES)
    categoriesArray = data?.categories;    
    const columnLimit = 15;    
    const {loading: loadingBrands, error: errorBrands, data: dataBrands} = useQuery(BRANDS);

    return (
        <div className={styles.megaMenu}>
            <nav className={styles.navigator}>
                <ul>
                    {categories?.map((newCategorie,index)=>(
                        <li key={index} className={styles.departament}>
                            <div className={styles.titleDepartament}>
                                <span>
                                    {newCategorie?.href?(
                                            <Link to={newCategorie.href?.toLowerCase()}>
                                                {newCategorie?.name}
                                            </Link>
                                        )
                                        :newCategorie?.name
                                    }
                                </span>
                            </div>
                            {newCategorie?.hasChildren && (
                                <>
                                {
                                    (newCategorie.name.toLowerCase() !== 'regiones' &&
                                    newCategorie.name.toLowerCase() !== 'más' &&
                                    newCategorie.name.toLowerCase() !== 'bodegas') &&
                                    <div className={styles.dropDown + ' '  + newCategorie?.name?.trim()}>
                                        <ColumnDropdown childrens={newCategorie?.children} columnLimit={itemsPerColumn}/>
                                    </div>
                                }

                                {newCategorie.name.toLowerCase() == 'bodegas' &&                                    
                                    <div className={styles.dropDown + ' '  + newCategorie?.name?.trim()}>
                                        <Bodega category={dataBrands?.brands} showMoreLink={newCategorie.href}/>
                                    </div>
                                }
                                {newCategorie.name.toLowerCase() == 'regiones' &&
                                    <div className={styles.dropDown + ' '  + newCategorie?.name?.trim()}>
                                        <Region category={newCategorie} />
                                    </div>
                                }
                                {newCategorie.name.toLowerCase() == 'más' &&
                                    <div className={styles.dropDown + ' '  + newCategorie?.name?.trim()}>
                                        <Region category={newCategorie} />
                                    </div>
                                }                                
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
            
        </div>
    )
}

MegaMenu.getSchema = () =>{
    return{
        title:"Mega Menu",
        description:"Defina sus nuevos items del Mega Menu",
        type:"object",
        properties:{
            itemsPerColumn:{
                title: "Número de elementos por columna",
                type: "number",
                default: 15
            },
            categories:{
                title:"Nuevas categorías",
                type:"array",
                default:categoriesArray,
                items:{
                    title:"Nuevo item",
                    type:"object",
                    properties:{
                        name:{
                            title:"Nombre del nuevo item",
                            type:"string"
                        },
                        href:{
                            title:"Link del item",
                            type:"string"
                        },                      
                        hasChildren:{
                            title:"Activar hijos",
                            type:"boolean"
                        },
                        children:{
                            title:"Nueva sub categoría",
                            type:"array",
                            items:{
                                title:"Nuevo item",
                                type:"object",
                                properties:{
                                    name:{
                                        title:"Nombre del nuevo item",
                                        type:"string"
                                    },
                                    href:{
                                        title:"Link del item",
                                        type:"string"
                                    },
                                    image:{
                                        title:"Imagen del elemento",
                                        type:"string",
                                        widget:{
                                            'ui:widget':'image-uploader'
                                        }
                                    },
                                    column:{
                                        title: "Ingrese el número de columna donde se ubicará la categoría",
                                        type: "number",
                                        default: 0
                                    },                                    
                                    hasChildren:{
                                        title:"Activar hijos",
                                        type:"boolean"
                                    },
                                    children:{
                                        title:"Nueva sub categoría",
                                        type:"array",
                                        items:{
                                            title:"Nuevo item",
                                            type:"object",
                                            properties:{
                                                name:{
                                                    title:"Nombre del nuevo item",
                                                    type:"string"
                                                },
                                                href:{
                                                    title:"Link del item",
                                                    type:"string"
                                                },
                                                image:{
                                                    title:"Imagen del elemento",
                                                    type:"string",
                                                    widget:{
                                                        'ui:widget':'image-uploader'
                                                    }
                                                },
                                                column:{
                                                    title: "Ingrese el número de columna donde se ubicará la categoría",
                                                    type: "number",
                                                    default: 0
                                                },                                                  
                                                hasChildren:{
                                                    title:"Activar hijos",
                                                    type:"boolean"
                                                },
                                                children:{
                                                    title:"Última sub-categoría",
                                                    type:"array",
                                                    items:{
                                                        title:"Nuevo item",
                                                        type:"object",
                                                        properties:{
                                                            name:{
                                                                title:"Nombre del nuevo item",
                                                                type:"string"
                                                            },
                                                            href:{
                                                                title:"Link del item",
                                                                type:"string"
                                                            },
                                                            image:{
                                                                title:"Imagen del elemento",
                                                                type:"string",
                                                                widget:{
                                                                    'ui:widget':'image-uploader'
                                                                }
                                                            },
                                                            column:{
                                                                title: "Ingrese el número de columna donde se ubicará la categoría",
                                                                type: "number",
                                                                default: 0
                                                            }                                                            
                                                        }
                                                    }
                                                }                                                
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } 
}
export default MegaMenu