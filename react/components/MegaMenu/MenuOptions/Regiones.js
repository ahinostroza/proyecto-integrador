import React from "react";
import { inlineOptions } from "../utils";
import {Link} from 'vtex.render-runtime';
import styles from '../index.css';

const orderColumns = ({options}) => {
    const c1 = {items:[], showMore: false, link:''};
    const c2 = {items:[], showMore: false, link:''};
                
    let lastIndex = 0;          
    //PRIMERA COLUMNA    
    for(var index = lastIndex; index<options.length; index++){        
        if(options[index].column == 1){            
            c1.items.push(options[index]);
            lastIndex = index;              
        }
        else{
            break;
        }                
    }        
    
    for(var index=lastIndex+1; index<options.length; index++){        
        if(options[index].column == 2){            
            c2.items.push(options[index]);
            lastIndex = index;              
        }
        else{
            break;
        }                
    } 
   
    return [c1, c2];
}

const Region = (props) => {
    const {category, columnLimit} = props;    
    const childrens = category.children || [];
    const lineOptions = inlineOptions(childrens, false);    
    const categories = lineOptions.filter(el => el.column == 3);
    const lastCategory = categories[categories.length - 1];    
    const columns = orderColumns({options: lineOptions, columnLimit});    

    return(
        <div className={styles.regionContainer}>
            {columns.map(col => (
                <div className={`${styles.mmColumn} ${styles.firstColumns}`}>
                    <ul>
                        {col?.items?.map(item=>{
                            const linkStyle = item.level == 1 ? `level1` : '';                            
                            return(
                                <li className={styles[linkStyle]}>
                                    <Link to={item.href}>{item.name}</Link>
                                </li>
                            )
                        })}
                        {/*col.showMore && 
                            <span className={styles.showMore}><Link to={col.link} >Ver más</Link></span>
                        */}
                    </ul>
                </div>
            ))}
            <div className={styles.cuartaColumna}>
                {lastCategory?.image &&
                    <img className={styles.image} src={lastCategory.image} />
                }
            </div>
            <div></div>
        </div>
    );
}

export default Region;