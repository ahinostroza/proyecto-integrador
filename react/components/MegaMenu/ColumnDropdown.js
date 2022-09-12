import React from "react";
import styles from "./index.css";
import {Link} from 'vtex.render-runtime';
import SubCategorie from './SubCategorie';

const orderElements = (elements) => {
    const noChildren = elements.filter(el => !el.hasChildren);
    const hasChildren = elements.filter(el => el.hasChildren);
    //return [].concat(noChildren, hasChildren);
    return elements;
}

const inlineOptions = (elements) => {

    const lineArray = [];
    const orderArray = orderElements(elements);
    orderArray.forEach(element => {        
        element.level = 1;
        lineArray.push(element);            
        if(element.hasChildren && element.hasChildren==true){
            const level2Children = orderElements(element.children);
            level2Children.forEach(el => {                
                el.level=2;
                lineArray.push(el)                        
                if(el.hasChildren && el.hasChildren == true){                            
                    const level3Children = orderElements(el.children);
                    level3Children.forEach(ultimo => {                            
                        ultimo.level=3;
                        lineArray.push(ultimo);                                
                    });                            
                }
            });
        }
    });

    return lineArray;
}

const orderColumns = ({options, columnLimit}) => {
    const c1 = {items:[], showMoreStyle: '', showMore: false, link:'none'};
    const c2 = {items:[], showMoreStyle: '', showMore: false, link:'none'};
    const c3 = {items:[], showMoreStyle: '', showMore: false, link:'none'};
    const c4 = {items:[], showMoreStyle: '', showMore: false, link:'none'};

    const l1 = columnLimit;
    const l2 = columnLimit * 2;
    const l3 = columnLimit * 3;
    const l4 = columnLimit * 4;
        
    
    let hasBreak=false;
    let i1=0; let i2=0; let i3=0; let i4=0;
    let currentLevel = 1;    
    let lastIndex = 0;    
    let r1 = 0; let r2 = 0; let r3 = 0;
    
    let linkTemp = 'nada';
    //PRIMERA COLUMNA    
    for(var index=i1; index<options.length; index++){
        if(index < l1){
            if(c1.items.length < columnLimit){
                c1.items.push(options[index]);
            }
            
            if(options[index].level == 1 || options[index].level < currentLevel){
                linkTemp = options[index].href;
            }
        }
        else{
            if(index == l1+1){
                c1.showMore = true;                
            }
            if((index != l1) && (options[index].level > currentLevel)){                
                hasBreak = true;                
                break;                
            }else{                
                i1 = index;
                r1 += 1;
            }
        }
        currentLevel = options[index].level;
        lastIndex = index;        
    }
            
    currentLevel = 1;
    c1.link = linkTemp;    
    //c1.showMoreStyle = linkTemp.split("/")[0];
    c1.showMoreStyle = linkTemp.split("/").length >= 3 ? linkTemp.split("/")[2] : "";
    lastIndex = !hasBreak ? lastIndex+1 : lastIndex;
    hasBreak = false;

        
    // SEGUNDA COLUMNA
    for(var index=i1 == 0 ? lastIndex : i1; index<options.length; index++){        
        const limite = l2+r1;
        if(index < limite){            
            if(c2.items.length < columnLimit && !options[index].href.includes(c1.link)){
             c2.items.push(options[index]);
            }
            if(options[index].level == 1 || options[index].level < currentLevel){
                linkTemp = options[index].href;
            }            
        }
        else{
            if(index == limite+1){
                c2.showMore = true;
            }            
            if((index != l2) && (options[index].level > currentLevel)){
                hasBreak = true;
                break;                
            }else{
                i2 = index;
                r2 += 1;
            }
        }
        currentLevel = options[index].level;
        lastIndex = index;        
    }
        
    currentLevel = 1;
    c2.link = linkTemp;    
    c2.showMoreStyle = linkTemp.split("/").length >= 3 ? linkTemp.split("/")[2] : "";
    lastIndex = !hasBreak ? lastIndex+1 : lastIndex;
    hasBreak = false;
    
    // TERCERA COLUMNA
    for(var index = i2 > i1 ? i2 : lastIndex; index<options.length; index++){
        const limite = l3+r2+4; //SUME CUATRO PARA SOLUCIONAR RÁPIDAMENTE EL REQUERIMIENTO...        
        if(index < limite){            
            if(c3.items.length<columnLimit && !options[index].href.includes(c2.link)){                                
                c3.items.push(options[index]);
            }
            if(options[index].level == 1 || options[index].level < currentLevel){
                linkTemp = options[index].href;
            }
        }
        else{
            if(index == limite+1){
                c3.showMore = true;
            }            
            if((index != l3) && (options[index].level > currentLevel)){
                hasBreak = true;
                break;                
            }else{
                i3 = index;
                r3 += 1;
            }
        }
        currentLevel = options[index].level;
        lastIndex = index;
    }    
    
    currentLevel = 1;
    c3.link = linkTemp;    
    c3.showMoreStyle = linkTemp.split("/").length >= 3  ? linkTemp.split("/")[2] : "";
    lastIndex = !hasBreak ? lastIndex+1 : lastIndex;
    hasBreak = false;

    //CUARTA COLUMNA
    for(var index= i3 > i2 ? i3 : lastIndex; index<options.length; index++){
        const limite = l4+r3;
        if(index < limite){
            if(c4.items.length<columnLimit && !options[index].href.includes(c3.link)){
                c4.items.push(options[index]);
            }
            if(options[index].level == 1 || options[index].level < currentLevel){
                linkTemp = options[index].href;
            }
        }
        else{
            if(index == limite+1){
                c4.showMore = true;
            }            
            if((index != l4) && (options[index].level > currentLevel)){
                hasBreak = true;
                break;                
            }else{
                i4 = index;
            }
        }
        currentLevel = options[index].level;
        lastIndex = index;
    }

    c4.link = linkTemp;
    
    return [c1, c2, c3, c4]
}
const ColumnDropdown = (childrens=[]) => {
    const elements = childrens.childrens;
    const lineOptions = inlineOptions(elements);
    const columns = orderColumns({options: lineOptions, columnLimit: 11});

    return(        
        <div className={columns[3].items.length == 0 ? styles.mmContainer3col : styles.mmContainer}>
        {columns.map(col => {

            return <div className={styles.mmColumn}>
                        <ul>
                            {col?.items?.sort()?.map(item=>{                        
                                const linkStyle = item.level == 1 ? 'level1' : item.hasChildren ? `level${item.level}` : '';                  
                                //const linkStyle = item.hasChildren ? `level${item.level}` : '';                        
                                return(
                                    <li className={styles[linkStyle]}><Link to={item.href}>{item.name}</Link></li>
                                )
                            })}
                            {col.showMore && 
                                <span className={`${styles.showMore} ${styles[col.showMoreStyle]}`}><Link to={col.link} >Ver más</Link></span>
                            }
                        </ul>
                    </div>
        })}        
        </div>
    );
}

export default ColumnDropdown;