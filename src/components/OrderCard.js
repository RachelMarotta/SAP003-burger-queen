import React from 'react';
import { StyleSheet, css } from 'aphrodite'

const styles = StyleSheet.create({

  styleCard: {
    display: 'flex',
    flexDirection: 'column',
  },

  tableCustomer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '4%'
  },

  strongClient: {
    fontSize: '30px',
    fontWeight: 'bold',
  }
})

function OrderCard(props) {
  return (
    <div className={css(styles.styleCard)}>
      <div className={css(styles.tableCustomer)}>
        <div> Mesa: {props.table} </div>
        <div className={css(styles.strongClient)}> {props.client} </div>
        {props.sendTime}
      </div>
      {props.order}
    </div>
  )
}

export default OrderCard;