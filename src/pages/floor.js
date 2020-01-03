import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import db from '../utils/firebase';
import growl from 'growl-alert'
import 'growl-alert/dist/growl-alert.css'
import Button from '../components/Button';
import Input from '../components/Input';
import Order from '../components/Order';
import Menu from '../components/Menu';

const styles = StyleSheet.create({
  floorPage: {
    display: 'flex',
  },
  styleMenu: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%'
  },
  title: {
    width: '10%',
    fontSize: '30px',
    marginTop: '15%',
    marginLeft: '25%',
  },
  btnPosition: {
    marginLeft: '10%',
    marginBottom: '5%',
  },
  btnMenu: {
    width: '150px',
    height: '50px',
  },
  orderPage: {
    display: 'flex',
  }
})

function ShowMenu() {
  const [category, setCategory] = useState("Café da manhã");
  const [client, setClient] = useState("");
  const [table, setTable] = useState("");
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const [itensBreakfast, setItensBreakfast] = useState([]);
  const [itensLunch, setItensLunch] = useState([]);

  useEffect(() => {
    db
      .collection("Menu")
      .get().then((snapshot) => {
        const docMenu = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setItensBreakfast(docMenu.filter(doc => doc.category === "Café da manhã"));
        setItensLunch(docMenu.filter(doc => doc.category === "Lanches"));
      })
  }, []);

  const categoryItens = category === "Lanches" ? itensLunch : itensBreakfast

  function addItem(item) {
    const itemIndex = order.findIndex((el) => el.id === item.id);
    if (itemIndex === -1) {
      setOrder([...order, { ...item, count: 1 }]);
    } else {
      const newOrder = [...order];
      newOrder[itemIndex].count += 1;
      setOrder(newOrder);
    }
    setTotal(total + (item.Price))
  }

  function removeItem(item) {
    const index = (order.indexOf(item));
    order.splice(index, 1);
    setOrder([...order]);
    setTotal(total - (item.Price * item.count))
  }

  function minusItem(item) {
    const itemIndex = order.findIndex((el) => el.id === item.id);
    const itemCount = order[itemIndex];

    if (itemCount.count === 1) {
      removeItem(itemCount)
    } else {
      itemCount.count += -1;
      setOrder([...order]);
    }
    setTotal(total - (item.Price))
  }

  function sendOrder() {
    if (client && table) {
      db
        .collection("Orders")
        .add({
          client,
          table,
          order,
          total
        })
        .then(() => {
          growl.success("Pedido enviado!");
          setClient("");
          setTable("");
          setOrder([]);
          setTotal([]);
        })
    } else {
      growl.warning("Preencha nome e mesa!")
    }
  }

  return (
    <div className={css(styles.floorPage)}>
      <div className={css(styles.styleMenu)}>
        <h1 className={css(styles.title)}>Menu</h1>
        <div className={css(styles.btnPosition)}>
          <Button className={css(styles.btnMenu)}
            handleClick={(e) => {
              setCategory("Café da manhã");
              e.preventDefault();
            }}
            title={"Café da Manhã"} />
          <Button className={css(styles.btnMenu)}
            handleClick={(e) => {
              setCategory("Lanches");
              e.preventDefault();
            }}
            title={"Almoço/Jantar"} />
        </div>
        <div className={css(styles.btnItens)}>
          {categoryItens.map((item) => <Menu
            key={item.id}
            item={item}
            addItem={addItem} />)}
        </div>
      </div>
      <div className={css(styles.styleMenu)}>
        <h1 className={css(styles.title)}>Pedido</h1>
        <Input class='input' type='text' value={client}
          handleChange={e => setClient(e.currentTarget.value)} holder='Nome'
        />
        <Input class='input' type='text' value={table}
          handleChange={e => setTable(e.currentTarget.value)} holder='Mesa'
        />
        {order.map((item) => <Order
          key={item.id}
          item={item}
          addItem={addItem}
          minusItem={minusItem}
          removeItem={removeItem} />)}
        <div>Total {total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</div>
        <Button className={css(styles.btnLunch)}
          handleClick={(e) => {
            sendOrder();
            e.preventDefault()
          }} title={"Enviar"} />
      </div>
    </div>
  )
}
export default ShowMenu;