import React, {useState, useEffect} from "react";
import {
    TabLayout,
    TabList,
    TabListItem,
    TabContent,
    TabContentItem
} from 'vtex.tab-layout';
import { useRuntime } from 'vtex.render-runtime'
import DownArrowSvg from '../../../assets/svg/down-arrow.svg';

import {useProduct} from 'vtex.product-context'

import styles from "./index.css";

const DrawOptions = ({id, label}) => {
    return(                
        <TabListItem tabId={id} label={label}></TabListItem>
    );
}

const DrawContent = ({id, content, Specifications, Description}) => {
    return(                
        <TabContentItem tabId={id}>            
            {Description && <Description collapseContent={false}/>}
            {Specifications && <Specifications/>}
            {content && <div dangerouslySetInnerHTML={{__html:content}}></div>}
        </TabContentItem>        
    );
}

const DropOption = ({label, content, defaultDrop=false, Specifications, Description}) => {
    const [dropdown, setDropdown] = useState(false);
    useEffect(()=>{ setDropdown(defaultDrop)},[]);

    return(
        <div>
            <div 
                className={dropdown ?  styles.tabMobileLabelShow : styles.tabMobileLabel}
                onClick={()=>setDropdown(!dropdown)}
            >
                <label>{label}</label>
                <img src={DownArrowSvg} className={!dropdown ? styles.iconDrop : styles.iconDropShow}/>
            </div>
                <div className={dropdown ? styles.dropContentShow : styles.dropContentHide}>
                {Description && <Description collapseContent={false}/>}
                {Specifications && <Specifications/>}
                {content && <div dangerouslySetInnerHTML={{__html:content}}></div>}
            </div>
        </div>
    );
}

const Tabs = ({Specifications, Description, tabs=[]}) => {
    const { deviceInfo } = useRuntime();
    const {
        product:{
            clusterHighlights
        },
        selectedItem:{
            
        }
    } = useProduct()
    return(
        <>
        {deviceInfo.type == "desktop" ?
            <div className={styles.tabsContent}>
                <TabLayout defaultActiveTabId={"uno"}>
                    <TabList>
                        <div className={styles.tabsMenu}>
                            <DrawOptions id={"dos"} label={"Descripción"}/>
                            <DrawOptions id={"uno"} label={"Información adicional"}/>
                            {tabs && tabs.map((tab,index)=>(
                                <DrawOptions id={index+2} label={tab?.tab}/>
                            ))}
                        </div>
                    </TabList>


                    <div className={styles.tabsContentLabels}>
                        <TabContent>
                            <DrawContent id={"dos"} Description={Description}/>
                            <DrawContent id={"uno"} Specifications={Specifications}/>
                            {tabs && tabs.map((tab,index)=>(
                                <DrawContent id={index+2} content={tab?.content}/>
                            ))}
                        </TabContent>
                    </div>
                </TabLayout>
            </div>
        :
            <div className={styles.tabsMobile}>                
                <DropOption label={"Descripción"} Description={Description} defaultDrop={true}/>
                <DropOption label={"Información adicional"} Specifications={Specifications}/>
                {tabs && tabs.map((tab, index)=>(
                    <DropOption key={index} label={tab.tab} content={tab.content}/>
                ))}
            </div>
        }
        </>
    );
}

Tabs.schema = {
    title: "Menu Tabs",
    description: "Tabs del detalle de producto",
    type: "object",
    properties: {
        tabs:{
            title: "Tabs",
            type: "array",
            items:{
                title: "Tab",
                type: "object",
                properties:{
                    tab: {
                        name: "Etiqueta del Tab",
                        type: "string"
                    },
                    content: {
                        name: "Contenido",
                        type: "string"
                    }
                }
            }
        }
    }
}

export default Tabs;