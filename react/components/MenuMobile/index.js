import React, { useState, useMemo } from "react";
import styles from "./MenuMobile.css";
import { Link } from "vtex.render-runtime";
import {useQuery} from 'react-apollo'
import { Collapsible } from "vtex.styleguide";
import BRANDS from '../../graphql/getRBrands.gql';

const MenuMobile = ({ categories }) => {
  const [open, setOpen] = useState("");
  const {loading: loadingBrands, error: errorBrands, data: dataBrands} = useQuery(BRANDS);
  const dataArray = dataBrands?.brands
  const listaExcluir = [
    "Alma 4",
    "Amarula",
    "Angostura",
    'Aperol',
    'Avarizza',
    'Bavaria',
    'Bear Beer',
    'Wapisa',
    'Casa Pirque',
    'Clynelish',
    'Cointreau',
    'DAB',
    'Dufftown',
    'Estrella Damm',
    'Estrella Galicia',
    'Faxe',
    'Finca Beth',
    'Finca la Igriega',
    'Finca la Luz',
    'Grupo Peñaflor',
    'Grupo Pernod Ricard',
    'Hennessy',
    'Kaiserdom',
    'Malibu',
    'POMMERY',
    'Scapa',
    'Smirnoff',
    'Tanqueray',
    'Absolut',
    'BODEGAS TRES BLASONES SA',
    'CAMUS',
    'CANADIAN CLUB',
    'CHIVAS REGAL',
    'FERNET BRANCA',
    'GLENFIDDICH',
    'GLENLIVET',
    'GRAND MARNIER',
    'HAVANA CLUB',
    "HENDRICK'S",
    'J&B',
    'JAMESON',
    'JIM BEAM',
    'JOHNNIE WALKER',
    "MAKER'S MARK",
    'PATRON',
    'WHYTE MACKAY',
    'BAILEYS',
    'BEEFEATER',
    'BEEFEATER',
    'GORDONS',
    'PRINCIPE DE LOS APOSTOLES',
    'ZACAPA',
    'KETEL ONE',
    'SOBIESKI',
    "BUCHANAN'S",
    'CRAGGANMORE',
    'TALISKER',
    'DANZKA',
    'GRAND OLD PARR',
    'CAOL ILA',
    'GLENKINCHIE',
    'BULLEIT',
    'LONGMORN',
    'BALLANTINES',
    'MACALLAN',
    'TULLAMORE',
    'BRUICHLADDICH',
    'MACKMYRA',
    'JAGERMEISTER',
    'SHERIDANS',
    'De Barricas',
    'EL GARAGE DE ALDO SRL',
    'JIJIJI',
    'CHE VINS',
    'ANIMAL',
    'BOHEMIA',
    'VONDOM',
    'WINEFROZ',
  ]
  const data = useMemo(() => {
    const filteredColumns = dataArray?.filter((fill) => !listaExcluir?.includes(fill?.name) && fill?.name)
    filteredColumns?.sort(function(a, b) {  if(a.name < b.name) { return -1; } if(a.name > b.name) { return 1; } return 0;})

    return filteredColumns ?? []
  },[dataArray, listaExcluir])

  if(errorBrands) return <div>{JSON.stringify(errorBrands)}</div>

  if(loadingBrands) return <div>Cargando...</div>
  return (
    <>
      <ul className={styles.containerMenuMobile}>
        {categories?.map((list) => {
          return (
            <>
              <li
                className={
                  open == list.name
                    ? styles.SubContainerOpen
                    : styles.SubContainerClose
                }
              >
                <Collapsible
                  key={list.id}
                  header={<span className={styles.openName}>{list.name}</span>}
                  align="right"
                  onClick={
                    open == list.name
                      ? () => setOpen("")
                      : () => setOpen(list.name)
                  }
                  isOpen={open === list.name ? true : false}
                >
                  {list?.hasChildren && (
                    <div className={styles.desplegableColor}>
                      {list.name.toLowerCase() === "bodegas" ?
                          <SubCategoriaUno
                            childrens={data}
                            link={list.href}
                          />
                          
                        :
                          <SubCategoriaUno
                            childrens={list.children}
                            link={list.href}
                          />
                      }
                    </div>
                  )}
                </Collapsible>
              </li>
            </>
          );
        })}
      </ul>
    </>
  );
};

function SubCategoriaUno({ childrens: listas, link: ruta }) {
  const [open, setOpen] = useState(0);

  return (
    <>
      <li className={styles.marcado}>
        <Link to={ruta}>Ver Todos </Link>{" "}
      </li>
      {listas.map((a) => {
        if(a.name.toLowerCase() !== "imagen"){
          return(
            <li key={a.name}>
              <Collapsible
                header={
                  a?.hasChildren == true ? (
                    <span
                      className={
                        open == a.name ? styles.subActivo : styles.subInactivo
                      }
                    >
                      {a.name}
                    </span>
                  ) : (
                    <div className={styles.linksMobileName}>
                      <Link to={a.href || a.slug}>{a.name}</Link>
                    </div>
                  )
                }
                align="right"
                onClick={
                  open == a.name ? () => setOpen(0) : () => setOpen(a.name)
                }
                isOpen={open === a.name ? true : false}
              >
                {a?.hasChildren && <SubCategoriaDos childrens={a.children} />}
              </Collapsible>
            </li>
          )
        }
      })}
    </>
  );
}

function SubCategoriaDos({ childrens: subcategorias }) {
  return (
    <>
      {subcategorias.map((c) => {
        if(c.name.toLowerCase() !== "imagen"){
          return(
            <ul className={styles.lastLevel} key={c.name}>
              <div className={styles.linksMobileName}>
                <Link to={c.href}>{c.name}</Link>
              </div>
            </ul>
          )
        }
      })}
    </>
  );
}

MenuMobile.schema = {
  title: "Menu Mobile",
  description: "Defina sus nuevos items del Mega Menu",
  type: "object",
  properties: {
    categories: {
      title: "Nuevas categorías",
      type: "array",
      items: {
        title: "Nuevo item",
        type: "object",
        properties: {
          name: {
            title: "Nombre del nuevo item",
            type: "string",
          },
          href: {
            title: "Link del item",
            type: "string",
          },
          hasChildren: {
            title: "Activar hijos",
            type: "boolean",
          },
          children: {
            title: "Nueva sub categoría",
            type: "array",
            items: {
              title: "Nuevo item",
              type: "object",
              properties: {
                name: {
                  title: "Nombre del nuevo item",
                  type: "string",
                },
                href: {
                  title: "Link del item",
                  type: "string",
                },
                image: {
                  title: "Imagen del elemento",
                  type: "string",
                  widget: {
                    "ui:widget": "image-uploader",
                  },
                },
                hasChildren: {
                  title: "Activar hijos",
                  type: "boolean",
                },
                children: {
                  title: "Nueva sub categoría",
                  type: "array",
                  items: {
                    title: "Nuevo item",
                    type: "object",
                    properties: {
                      name: {
                        title: "Nombre del nuevo item",
                        type: "string",
                      },
                      href: {
                        title: "Link del item",
                        type: "string",
                      },
                      image: {
                        title: "Imagen del elemento",
                        type: "string",
                        widget: {
                          "ui:widget": "image-uploader",
                        },
                      },
                      hasChildren: {
                        title: "Activar hijos",
                        type: "boolean",
                      },
                      children: {
                        title: "Última sub-categoría",
                        type: "array",
                        items: {
                          title: "Nuevo item",
                          type: "object",
                          properties: {
                            name: {
                              title: "Nombre del nuevo item",
                              type: "string",
                            },
                            href: {
                              title: "Link del item",
                              type: "string",
                            },
                            image: {
                              title: "Imagen del elemento",
                              type: "string",
                              widget: {
                                "ui:widget": "image-uploader",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default MenuMobile;
