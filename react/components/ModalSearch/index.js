import React, { useState, useEffect } from "react";
import { Icon } from "vtex.store-icons";
import styles from "../react#styles.css";

//<Search/> span ultimas busquedas
function DataStorage(props) {
  const { name } = props;
  return (
    <>
      <li className={styles.SearchLinksMobile}>{name}</li>
      <li className={styles.SearchLinksMobile}>{name}</li>
      <li className={styles.SearchLinksMobile}>{name}</li>
      <li className={styles.SearchLinksMobile}>{name}</li>
    </>
  );
}

function ManualStorage() {
  return (
    <>
      <ul className={styles.subtitleMenuMobile}>
        <li className={styles.ListTitlleMobile}>ÚLTIMAS BUSQUEDAS</li>
        <DataStorage name="ultimas busquedas" />
      </ul>
      <ul className={styles.LineDivMobile}></ul>

      <ul className={styles.subtitleMenuMobile}>
        <li className={styles.ListTitlleMobile}>MÁS BUSCADOS</li>
        <DataStorage name="mas buscados" />
      </ul>
    </>
  );
}

function ModalSearch({ Search }) {
  const [open, setOpen] = useState(false);
  useEffect(()=>{
    if (open == true) {
      if(window.document.body)window.document.body.style.overflow = "hidden";
    } else {
      if(window.document.body)window.document.body.style.overflow = "auto";
    }
  },[])

  return (
    <>
      <div className={styles.ModalSearchMobile} onClick={() => setOpen(!open)}>
        <Icon id="hpa-search" />
      </div>

      <div className={open == true ? styles.SearchOpen : styles.SearchClose}>
        <ul className={styles.FirstLisComponent}>
          <li className={styles.SearchComponentMobile}>
            <Search />
          </li>
          {/* <ManualStorage />*/}
        </ul>
        <ul
          className={styles.LastListComponent}
          onClick={() => setOpen(!open)}
        ></ul>
      </div>
    </>
  );
}

export default ModalSearch;
