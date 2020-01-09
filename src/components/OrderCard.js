import React from 'react';
import { StyleSheet, css } from 'aphrodite'


const styles = StyleSheet.create({
  styleCard: {
    width: "80%",
    borderRadius: '5px',
    marginBottom: "2%",
    marginLeft: '10%',
    marginRight: '1%',
    backgroundColor: '#C8C8C8',
    fontSize: '25px',
    textAlign: "center",
    color: 'black',
  }
})

function OrderCard(props) {
  return (
    <div className={css(styles.styleCard)}>
      Mesa: {props.table} Cliente: {props.client}	Pedido: {props.order}
      Total: {props.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
    </div>
  )
}

export default OrderCard;