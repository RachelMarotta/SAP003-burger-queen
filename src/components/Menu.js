import React from 'react';
import { StyleSheet, css } from 'aphrodite'
import Button from './Button'

const styles = StyleSheet.create({
  btnItens: {
    display: "flex",
    justifyContent: "space-between",
    color: "#black",
    borderRadius: "6px",
    width: "160px",
    height: "80px",
    fontSize: "15px",
    fontWeight: "bold",
    marginTop: "15px",
    marginBottom: '2%',
    border: "2px solid #FFDE59",
    backgroundColor: "#545454",
 
    ':hover': {
      backgroundColor: "#FFDE59",
      color: "black",

    },
  },
})

function Menu(props) {
  return (
      <Button
        className={css(styles.btnItens)}
        Name={props.item.Name}
        Price={props.item.Price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        handleClick={(e) => {
          props.addItem(props.item);
          e.preventDefault();
        }}
      />
  )
}

export default Menu;