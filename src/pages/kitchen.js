import React, { useState, useEffect } from 'react';
import db from '../utils/firebase';
import { StyleSheet, css } from 'aphrodite'
import OrderCard from '../components/OrderCard'

const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '50%',
    border: '1px solid black',
    borderRadius: '5px',
    marginLeft: '1%',
    marginRight: '1%',
    backgroundColor: '#4F4F4F'
  },

  title: {
    fontSize: '35px',
    textAlign: "center",
    marginTop: '4%',
    marginBottom: '5%',
    color: 'black',
  },
})

function Kitchen() {
  const [kitchenOrder, setKitchenOrder] = useState([]);

  useEffect(() => {

    db
      .collection("Orders")
      .get().then((snapshot) => {
        const order = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setKitchenOrder(order);
      })
  }, []);

  return (
    <div className={css(styles.cardContainer)}>

      <h1 className={css(styles.title)}>Pedido</h1>

      {kitchenOrder.map((item) =>
        <OrderCard
          key={item.id}
          table={item.table}
          client={item.client}
          total={item.total}
          order={item.order.map((item, index) => {
            return (
              <div key={index}>
                {item.Name}
                {item.count}
              </div>
            )
          })}
        />
      )}
    </div>
  )
}

export default Kitchen;