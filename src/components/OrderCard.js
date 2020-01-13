import React from 'react';
import { StyleSheet, css } from 'aphrodite'

const styles = StyleSheet.create({

  styleClient: {
    fontSize: "30px",
    fontWeight: "bold",
    marginBottom: "10px",
    marginTop: "10px"
  },

  time: {

  }
})

function OrderCard(props) {
  return (
    <>
      <div className={css(styles.styleClient)}>
        {props.client}
      </div>
      <div className={css(styles.time)}>
        {props.sendTime}
      </div>
      Mesa: {props.table}
      {props.order}

    </>
  )
}

export default OrderCard;