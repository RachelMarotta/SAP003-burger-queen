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
  return (
    <div key={props.item.id}>
      <div className={css(styles.orderList)}>
        <span>{props.item.Name} </span>
        {props.item.Price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}

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