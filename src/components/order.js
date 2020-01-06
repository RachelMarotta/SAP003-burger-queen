import React from 'react';
import { StyleSheet, css } from 'aphrodite'
import Button from './Button'

const styles = StyleSheet.create({
  listItem:{
    display:"flex",
    justifyContent:"space-between",
    fontSize:"20px",
    marginTop:"25px"
  },
  btnMinus: {
    backgroundColor:"#FF6859",
    color: "#00000",
    borderRadius:"20px",
    width: "30px",
    height:"30px",
    border:"none",
    fontSize:"25px",

    ':active': {
      position:"relative",
      top:"5px",
      boxShadow:"none",
    },
  },
  btnAdd: {
    fontSize:"25px",
    backgroundColor:"#59FFAA",
    borderRadius:"20px",
    border:"none",
    color: "#00000",
    width: "30px",
    height:"30px",

    ':active': {
      position:"relative",
      top:"5px",
      boxShadow:"none",
    },
  },
  btnRemove: {
    width:"30px",
    height:"30px",
    borderRadius:"20px",
    backgroundColor:"#FFDE59",
    border:"none",
  }
})

function Order(props) {
  return (
      <div key={props.item.id}>
        <div className={css(styles.listItem)}>
          <span>{props.item.Name}</span>
          {props.item.Price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          <Button className={css(styles.btnMinus)}
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
          <Button className={css(styles.btnRemove)}
            handleClick={(e) => {
              props.removeItem(props.item);
              e.preventDefault();
            }}
            title={"🗑️"}
          />
        </div>
      </div>
  )
}

export default Order;