import React from 'react';
import { StyleSheet, css } from 'aphrodite'
import Button from './Button'

const styles = StyleSheet.create({
  btnItens: {
    width: '150px',
    height: '50px',
  }
})

function Menu(props) {
  return (
    <div key={props.item.id}>
      <Button
        className={css(styles.btnIntens)}
        Name={props.item.Name}
        Price={props.item.Price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        handleClick={() => props.addItem(props.item)}
      />
    </div>
  )
}

export default Menu;