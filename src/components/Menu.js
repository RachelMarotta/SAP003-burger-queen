import React from 'react';
import { StyleSheet, css } from 'aphrodite'
import Button from './Button'

const styles = StyleSheet.create({
  btnItens: {
    display: "flex",
    justifyContent: "space-between",
    color: "#1C1C1C",
    backgroundColor: "#FFFAF0",
    borderRadius: "15px",
    width: "160px",
    height: "60px",
    fontSize: "15px",
    fontWeight: "bold",
    marginTop: "15px",

    ':active': {
      position: "relative",
      top: "5px",
      boxShadow: "none",
    },

    ':hover': {
      backgroundColor: "#FFDE59",
      color: "#000000",

    },
  },
})

function Menu(props) {
  return (
    <div key={props.item.id}>
      <Button
        className={css(styles.btnItens)}
        Name={props.item.Name}
        Price={props.item.Price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        handleClick={(e) => {
          props.addItem(props.item);
          e.preventDefault();
        }}
      />
    </div>
  )
}

export default Menu;