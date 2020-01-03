import React from 'react';
import { StyleSheet, css } from 'aphrodite'
import Button from './Button'

const styles = StyleSheet.create({
  styleOrder: {
    width: "50%",
  },
  btnAdd: {
    color: "red",
  },

  listItem: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "15px"
  }
})

function Order(props) {
  return (
    <div className={css(styles.styleOrder)}>
      <div key={props.item.id}>
        <div className={css(styles.listItem)}>
          <span>{props.item.Name}</span>
          {props.item.Price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          <Button className={css(styles.btnRemove)}
            handleClick={(e) => {
              props.minusItem(props.item);
              e.preventDefault();
            }}
            title={"-"}
          />
          {props.item.count}
          <Button className={css(styles.btnAdd)}
            handleClick={(e) => {
              props.addItem(props.item);
              e.preventDefault();
            }}
            title={"+"}
          />
          <Button className={css(styles.btnAdd)}
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