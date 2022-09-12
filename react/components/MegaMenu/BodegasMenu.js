import React, {useMemo, Fragment} from "react";
import { inlineOptions } from "./utils";
import styles from "./index.css";
import {Link} from 'vtex.render-runtime';

const orderColumns = ({options, columnLimit, moreLink}) => {
    const c1 = {items:[], showMore: false, link:''};
    const l1 = columnLimit;        
    let lastIndex = 0;          
    //PRIMERA COLUMNA    
    for(var index=0; index<options.length; index++){
        if(index < l1){
            if(c1.items.length < columnLimit){
                c1.items.push(options[index]);
                lastIndex = index;        
            }
        }else{
            break;
        }        
    }
    
    // if(options.length >= 44){       
    //     c1.showMore = true;
    //     c1.link = moreLink;
    // }
    return [c1];
}


const BodegaMenu = (props) => {
    const {category, showMoreLink} = props;
    const childrens = category || [];    
    const lineOptions = inlineOptions(childrens);
    const columns = orderColumns({options: lineOptions, columnLimit: 230, moreLink: showMoreLink});
    const listaExcluir = [
        "2000001",
        "2000002",
        "2000003",
        "2000015",
        "2000019",
        "2000023",
        "2000025",
        "2000027",
        "2000030",
        "2000031",
        "2000033",
        "2000035",
        "2000040",
        "2000041",
        "2000043",
        "2000044",
        "2000046",
        "2000048",
        "2000051",
        "2000052",
        "2000056",
        "2000063",
        "2000066",
        "2000067",
        "2000072",
        "2000073",
        "2000076",
        "2000079",
        "2000082",
        "2000083",
        "2000084",
        "2000087",
        "2000093",
        "2000096",
        "2000098",
        "2000099",
        "2000104",
        "2000105",
        "2000106",
        "2000108",
        "2000112",
        "2000117",
        "2000120",
        "2000127",
        "2000130",
        "2000133",
        "2000135",
        "2000189"
    ]
    const data = useMemo(() => {
        const sortColumn = columns?.map((colum) => (
            colum?.items?.sort(function(a, b){
                if(a.name < b.name) { return -1; }
                if(a.name > b.name) { return 1; }
                return 0;
            })
        ))[0]
        
        const filteredColumns = sortColumn?.filter((fill) => listaExcluir?.includes(`${fill?.id}`) && fill?.name)
        console.log(sortColumn)
        return filteredColumns ?? []
    },[columns, listaExcluir])

    return(
        <div className={styles.mmContainerBodegas}>
            <div className={styles.mmColumnBodegas}>
                <ul>
                    {data && data.length ? data?.map(item => {
                        const linkStyle = item.hasChildren == 1 ? `level${item.level}` : '';

                        return(
                            <li className={styles[linkStyle]}>
                                <Link to={item.slug}>{item.name}</Link>
                            </li>
                        )
                    }):<Fragment/>}
                </ul>
            </div>                  
        </div>
    );
};

export default BodegaMenu;