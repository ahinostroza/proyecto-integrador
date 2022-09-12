import React,{useState, useRef, useEffect} from 'react'
import {useQuery} from 'react-apollo'
import {Collapsible} from 'vtex.styleguide'

import mobile from './mobile.css'
import './index.css'

import {Link, useRuntime} from 'vtex.render-runtime'

import CATEGORIES from '../../graphql/getCategories.gql'
import { IconMenu } from 'vtex.store-icons'


let categoriesArray

const MegaMenuMobile = ({newCategories,Logo}) =>{
    const {loading, error, data} = useQuery(CATEGORIES)
    
    const [open,setOpen] = useState(false)
    const [categoryLevel,setCategoryLevel] = useState("")
    const [departamentLevel,setDepartamentLevel] = useState("")

    const levelCategory = useRef()
    const levelSubCategory = useRef()
    const nav = useRef()
    const navContainer = useRef()
    
    categoriesArray = data?.categories

    const handleOpen = () => setOpen(!open)
    
    useEffect(()=>{
        if(open){
            if(nav.current)nav.current.style.transform = 'translate(0)'
        }else{
            if(nav.current)nav.current.style = null
        }
    })

    const handleNav = (level,name,isBack) =>{
        const navTime = setTimeout(()=>nav.current.classList.remove('levelthree'),350)
        if(isBack){
            if(level==0){
                if(navContainer.current)navContainer.current.style.transform = 'translateX(0)'
            }
            if(level==1){
                if(navContainer.current)navContainer.current.style.transform = 'translateX(-100%)'
            }
            if(level==2){
                if(navContainer.current)navContainer.current.style.transform = 'translateX(-200%)'
            }
            setTimeout(()=>{
                if(level==0){
                    setCategoryLevel('')
                    setDepartamentLevel('')
                }
                if(level==1){
                    if(levelCategory.current) levelCategory.current.style.overflowY = 'auto'
                    setDepartamentLevel(name)
                    setCategoryLevel('')
                }
                if(level==2){
                    if(levelSubCategory.current) levelSubCategory.current.style.overflowY = 'auto'
                    setCategoryLevel(name)
                }
            },350)
            return
        }
        if(level==0){
            setCategoryLevel('')
            setDepartamentLevel('')
            if(navContainer.current)navContainer.current.style.transform = 'translateX(0)'
        }
        if(level==1){
            setDepartamentLevel(name)
            setCategoryLevel('')
            //levelCategory.current.style.overflowY = 'auto'
            if(navContainer.current)navContainer.current.style.transform = 'translateX(-100%)'
        }
        if(level==2){
            nav.current.classList.add('levelthree')
            clearTimeout(navTime)
            //levelSubCategory.current.style.overflowY = 'auto'
            setCategoryLevel(name)
            if(navContainer.current)navContainer.current.style.transform = 'translateX(-200%)'
        }
    }
    const [isOpen,setIsOpen] = useState({})
    const handleCollapsible = (name) => {
        if (!name) return
        const newObject = {}
        newObject[name] = !isOpen[name]
        if(newObject[name] == undefined) newObject[name] = true
        setIsOpen({...isOpen,...newObject}) 
    }
    return !loading && (
        <div className={mobile.megaMenu}>
            <div className={mobile.iconContainer} onClick={handleOpen}>
                <IconMenu id="hpa-hamburguer-menu"/>
            </div>
            <nav className={mobile.navigatorMobile} ref={nav} style={{transform:'translateX(-100%)'}}>
                <div className={mobile.headerMobile}>
                    <Logo/>
                    <div onClick={handleOpen}>
                        <IconMenu id="sti-close--line"/>
                    </div>
                </div>
                <ul>
                    {newCategories?.map((newCategorie,index)=>(
                        <>
                            <li key={index}>
                                <div>
                                    <div className={mobile.levelone}>
                                        {!newCategorie?.hasChildren?(
                                                <Link to={newCategorie.href} onClick={()=>handleOpen}>
                                                    <span className={mobile.titlelevelone}>{newCategorie?.name}</span>
                                                </Link>
                                            )
                                            :(
                                                <Collapsible
                                                    align="right"
                                                    header={
                                                        <span className="c-action-primary hover-c-action-primary fw5">
                                                            {newCategorie?.name}
                                                        </span>
                                                    }
                                                    onClick={()=> handleCollapsible(newCategorie?.name) }
                                                    isOpen = {isOpen[newCategorie?.name]}
                                                >
                                                    <div>
                                                        {(newCategorie?.hasChildren) && (
                                                            <>
                                                                {newCategorie?.children.map((el,indice)=>(
                                                                    <li key={indice}>
                                                                    <div>
                                                                        <div>
                                                                            {!el?.hasChildren?(
                                                                                    <Link to={el.href} onClick={()=>handleOpen}>
                                                                                        <span>{el?.name}</span>
                                                                                    </Link>
                                                                                )
                                                                                :(
                                                                                    <Collapsible
                                                                                        align="right"
                                                                                        header={
                                                                                            <span className="c-action-primary hover-c-action-primary fw5">
                                                                                                {el?.name}
                                                                                            </span>
                                                                                        }
                                                                                        onClick={()=> handleCollapsible(el?.name) }
                                                                                        isOpen = {isOpen[el?.name]}
                                                                                    >
                                                                                        <div>
                                                                                            {(el?.hasChildren) && (
                                                                                                <ul el={mobile.dropDown} ref={levelSubCategory}>
                                                                                                    {el?.children.map((element,i)=>(
                                                                                                        <li key={i} className={mobile.departament}>
                                                                                                            <div className={mobile.titleDepartament}>
                                                                                                                <div>
                                                                                                                    {!element?.hasChildren?(
                                                                                                                            <Link to={element.href}>
                                                                                                                                <span>{element?.name}</span>
                                                                                                                            </Link>
                                                                                                                        )
                                                                                                                        :<span>{element?.name}</span>
                                                                                                                    }
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </li>
                                                                                                    ))}
                                                                                                </ul>
                                                                                            )}
                                                                                        </div>
                                                                                    </Collapsible>
                                                                                )
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                ))}
                                                            </>
                                                        )}
                                                    </div>
                                                </Collapsible>
                                            )
                                        }
                                    </div>
                                </div>
                                <ul className={mobile.dropDown} ref={levelCategory} style={{overflowY:'auto'}}>
                                    
                                </ul>
                            </li>
                        </>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

MegaMenuMobile.getSchema = () =>{
    return{
        title:"Categorías",
        description:"Defina sus nuevos items del Mega Menu",
        type:"object",
        properties:{
            newCategories:{
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
export default MegaMenuMobile