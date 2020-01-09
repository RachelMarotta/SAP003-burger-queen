import React from 'react';
import { StyleSheet, css } from 'aphrodite'
import Button from './Button'

const styles = StyleSheet.create({
  orderList: {
    marginTop: "2%",
    textAlign: "center",
    backgroundColor: "#707070"
  },
  btnAddMinus: {
    fontWeight: 'bold',
    height: '40px',
    width: '40px',
    borderRadius: "20px",
    border: "none",
    fontSize: "20px",
  },
  optionList: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "3%",
  }
})

function Order(props) {
  const extraPrice = props.item.extra ? 1 : 0;
  const itemPrice = props.item.Price + extraPrice;

  return (
    <div>
      <div className={css(styles.orderList)}>
        <span>{props.item.Name}</span>
        <span> - {props.item.extra}</span>
        {itemPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}

        <div className={css(styles.optionList)}>
          <Button className={css(styles.btnAddMinus)}
            handleClick={(e) => {
              props.minusItem(props.item);
              e.preventDefault();
            }}
            title={"-"}
          />

          {props.item.count}

          <Button className={css(styles.btnAddMinus)}
            handleClick={(e) => {
              props.addItem(props.item);
              e.preventDefault();
            }}
            title={"+"}
          />

          <Button className={css(styles.btnAddMinus)}
            handleClick={(e) => {
              props.removeItem(props.item);
              e.preventDefault();
            }}
            title={"🗑️"}
          />
        </div>
      </div>
    </div>
  )
}

export default Order;