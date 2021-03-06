import React, { useState, useEffect } from 'react';
import db from '../utils/firebase';
import { StyleSheet, css } from 'aphrodite'
import OrderCard from '../components/OrderCard'
import Button from '../components/Button'
import growl from 'growl-alert'
import 'growl-alert/dist/growl-alert.css'


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
    width: '80%',
    borderRadius: '5px',
    marginBottom: '8px',
    backgroundColor: '#C8C8C8',
    fontSize: '25px',
    textAlign: 'center',
    color: 'black',
  },

  orderContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    overflow: 'auto',
    width: '100%',
    height: '480px'
  },

  title: {
    fontSize: '35px',
    textAlign: 'center',
    marginTop: '4%',
    color: 'black',
  },

  btnSend: {
    color: 'black',
    backgroundColor: '#FFDE59',
    fontSize: '20px',
    fontWeight: 'bold',
    borderRadius: '6px',
    border: '1px solid black',
    width: '180px',
    height: '40px',
    marginLeft: '20px',
    marginTop: '25px',

    ':hover': {
      backgroundColor: '#FFFF66',
      color: 'black',
      cursor: 'pointer',
    },
  },

  styleTotal: {
    marginTop: '20px',
    fontWeight: 'bold'
  }
})

const option = {
  fadeAway: true,
  fadeAwayTimeout: 2000,
};

function Waiter() {
  const [done, setDone] = useState([]);
  const [delivered, setDelivered] = useState([]);

  useEffect(() => {

    db
      .collection("Orders")
      .orderBy("sendTime", "asc")
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

    const newDelivered = [...delivered, { ...item, status: "delivered", time: new Date().getTime() }];
    setDelivered(newDelivered)

    growl.success({ text: "Pedido Entregue!", ...option });
  }

  function time(readyTime, orderTime) {
    const diffTime = ((readyTime.getTime() - orderTime.getTime()) / 1000) / 60;

    return `${Math.abs(Math.round(diffTime))} min`;
  }

  return (
    <div className={css(styles.waiterPage)}>
      <div className={css(styles.cardContainer)}>

        <h1 className={css(styles.title)}>Pedidos Prontos</h1>

        <div className={css(styles.orderContainer)}>
          {done.map((item) =>
            <div key={item.id} className={css(styles.styleCard)}>
              <OrderCard
                sendTime={new Date(item.sendTime).toLocaleTimeString("pt-BR")}
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
                }} title={"Entregar"}
              />
            </div>
          )}
        </div>
      </div>

      <div className={css(styles.cardContainer)}>
        <h1 className={css(styles.title)}>Pedidos Entregues</h1>
        <div className={css(styles.orderContainer)}>
          {delivered.map((item) =>
            <div key={item.id} className={css(styles.styleCard)}>
              <OrderCard
                sendTime={time(new Date(item.time), new Date(item.sendTime))}
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
              <div className={css(styles.styleTotal)}>
                Total: {item.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Waiter;