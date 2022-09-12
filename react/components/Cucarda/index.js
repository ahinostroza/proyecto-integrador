import React from "react";
import { useProduct } from "vtex.product-context";
import styles from "../react#styles.css";

//console.log(useProduct("product")["product"]["clusterHighlights"][0]["id"]);

function Cucardas() {
  const {
    product: { clusterHighlights, priceRange },
  } = useProduct();

  let highPrice = priceRange["sellingPrice"]["highPrice"];
  let lowPrice = priceRange["listPrice"]["highPrice"];
  let aumento = highPrice - lowPrice;
  let oldValue = (aumento!=0 && lowPrice!=0)?aumento / lowPrice:0;
  let porcentaje = oldValue!=0?Math.round(oldValue * 100):0;

  return (
    <>
      <ul className={styles.containerCucardas}>
        {
          porcentaje!=0 &&(
            <li className={styles.cucarda25}>
              <p className={styles.descuentoPorciento}> {porcentaje}% <div>OFF</div></p>
            </li>
          )
        }

        {clusterHighlights?.map((a) => (
          <li className={a.id == "138" ? styles.cucarda4x3 : styles.cucarda2x1}>
            <p className={styles.marginFixed}>{a.name}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Cucardas;
