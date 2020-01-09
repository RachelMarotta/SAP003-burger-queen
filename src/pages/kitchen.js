import React, { useState, useEffect } from 'react';
import db from '../utils/firebase';
import { StyleSheet, css } from 'aphrodite'
import OrderCard from '../components/OrderCard'

const styles = StyleSheet.create({
  kitchenPage: {
    display: 'flex'
  },

  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '50%',
    height: '600px',
    border: '1px solid black',
    borderRadius: '5px',
    marginLeft: '1%',
    marginRight: '1%',
    backgroundColor: '#4F4F4F',
  },
  
  orderContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    overflow: 'auto',
    width: "600px",
    height: "480px"
  },

  title: {
    fontSize: '35px',
    textAlign: 'center',
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
    <div className={css(styles.kitchenPage)}>
      <div className={css(styles.cardContainer)}>

        <h1 className={css(styles.title)}>Pedidos Pendentes</h1>
        
        <div className={css(styles.orderContainer)}>
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
      </div>

      <div className={css(styles.cardContainer)}>
        <h1 className={css(styles.title)}>Pedidos Prontos</h1>

      </div>
    </div>
  )
}

export default Kitchen;