import React, { useState, useEffect } from 'react';
import db from '../utils/firebase';
import { StyleSheet, css } from 'aphrodite'
import OrderCard from '../components/OrderCard'
import Button from '../components/Button'


const styles = StyleSheet.create({
  waiterPage: {
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

  styleCard: {
    width: "80%",
    borderRadius: '5px',
    marginBottom: "8px",
    backgroundColor: '#C8C8C8',
    fontSize: '25px',
    textAlign: "center",
    color: 'black',
  },

  orderContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    overflow: 'auto',
    width: "100%",
    height: "480px"
  },

  title: {
    fontSize: '35px',
    textAlign: 'center',
    marginTop: '4%',
    color: 'black',
  },

  btnSend: {
    color: "black",
    backgroundColor: "#FFDE59",
    fontSize: "20px",
    fontWeight: "bold",
    borderRadius: "6px",
    border: '1px solid black',
    width: "180px",
    height: "40px",
    marginLeft: "20px",
    marginTop: "10px",

    ':hover': {
      backgroundColor: "#FFFF66",
      color: "black",
      cursor: "pointer",
    },
  },
})

function Kitchen() {
  const [done, setDone] = useState([]);
  const [delivered, setDelivered] = useState([]);

  useEffect(() => {

    db
      .collection("Orders")
      .orderBy("addTime", "asc")
      .get().then((snapshot) => {
        const order = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setDone(order.filter((doc) => doc.status === "done"));
        setDelivered(order.filter(doc => doc.status === "delivered"));
      })
  }, []);

  function orderDelivered(item) {

    db
      .collection("Orders")
      .doc(item.id)
      .update({
        status: "delivered",
        time: new Date().getTime()
      })
    const newDone = done.filter((el) => el.id !== item.id);
    setDone(newDone);

    const newDelivered = [...delivered, { ...item, status: "delivered" }];
    setDelivered(newDelivered)
  }

  return (
    <div className={css(styles.waiterPage)}>
      <div className={css(styles.cardContainer)}>

        <h1 className={css(styles.title)}>Pedidos Prontos</h1>

        <div className={css(styles.orderContainer)}>
          {done.map((item) =>
            <div key={item.id} className={css(styles.styleCard)}>
              <OrderCard
                table={item.table}
                client={item.client}
                total={item.total}
                order={item.order.map((item, index) => {
                  return (
                    <div key={index}>
                      {item.count} {item.Name} {item.extra}
                    </div>
                  )
                })}
              />
              <Button className={css(styles.btnSend)}
                handleClick={(e) => {
                  orderDelivered(item)
                  e.preventDefault()
                }} title={"Pronto"}
              />
            </div>
          )}
        </div>
      </div>

      <div className={css(styles.cardContainer)}>
        <h1 className={css(styles.title)}>Pedidos Entregues</h1>
        <div className={css(styles.orderContainer)}>
          {delivered.map((item) =>
            <div key={item.id}  className={css(styles.styleCard)}>
              <OrderCard
                table={item.table}
                client={item.client}
                total={item.total}
                orderDelivered={() => orderDelivered(item)}
                order={item.order.map((item, index) => {
                  return (
                    <div key={index}>
                      {item.count} {item.Name} {item.extra}
                    </div>
                  )
                })}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Kitchen;