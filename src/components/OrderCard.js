import React from 'react';
import { StyleSheet, css } from 'aphrodite'
import Button from './Button'

const styles = StyleSheet.create({
  styleCard: {
    width: "80%",
    height: "130px",
    borderRadius: '5px',
    marginBottom: "8px",
    backgroundColor: '#C8C8C8',
    fontSize: '25px',
    textAlign: "center",
    color: 'black',
  },
  btnSend: {
    color: "black",
    backgroundColor: "#FFDE59",
    fontSize: "20px",
    fontWeight: "bold",
    borderRadius: "6px",
    border: '1px solid black',
    width: "110px",
    height: "40px",
    marginLeft: "20px",

    ':hover': {
      backgroundColor: "#FFFF66",
      color: "black",
      cursor: "pointer",
    },
  },
})

function OrderCard(props) {
  return (
    <div className={css(styles.styleCard)}>
      Mesa: {props.table} Cliente: {props.client} {props.order}
      {/* Total: {props.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} */}

      <Button className={css(styles.btnSend)}
            
            title={"Enviar"}
          />
    </div>
  )
}

export default OrderCard;