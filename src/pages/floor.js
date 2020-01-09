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
    display: 'flex'
  },

  styleMenu: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    border: '1px solid black',
    borderRadius: '5px',
    marginLeft: '10px',
    marginRight: '10px',
    backgroundColor: '#4F4F4F',
    height: '600px'
  },

  title: {
    fontSize: '35px',
    textAlign: "center",
    marginTop: '20px',
    marginBottom: '30px',
    color: 'black',
  },

  btnPosition: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: '30px',
  },

  btnMenu: {
    backgroundColor: "#FFDE59",
    borderRadius: "6px",
    border: "none",
    width: "150px",
    height: "60px",
    fontSize: "20px",
    fontWeight: "bold",

    ':hover': {
      backgroundColor: "#FFFF66",
      color: "black"
    },
  },

  styleTotal: {
    fontSize: "20px",
    fontWeight: "bold",
    marginTop: "5px",
    marginBottom: "10px",
    marginLeft: "180px"
  },

  btnSend: {
    color: "black",
    backgroundColor: "#FFDE59",
    fontSize: "20px",
    fontWeight: "bold",
    borderRadius: "6px",
    border: "none",
    width: "130px",
    height: "60px",
    marginLeft: "180px",

    ':hover': {
      backgroundColor: "#FFFF66",
      color: "black",
      cursor: "pointer",
    },
  },

  inputPosition: {
    display: "flex",
    justifyContent: "space-around"
  },

  inputMenu: {
    borderRadius: "6px",
    width: "170px",
    height: "35px",
    textAlign: "center"
  },

  btnItensPosition: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    height: "20%",
    width: "90%",
    marginLeft: "5%",
  },

  listItens: {
    fontSize: "20px",
    fontWeight: "bold",
    marginTop: "20px",
    overflow: "auto",
    width: "90%",
    height: "345px",
    marginLeft: "20px",
  },
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

  const categoryItens = category === 'Lanches' ? itensLunch : itensBreakfast

  function addItem(item, extra) {
    const itemIndex = order.findIndex((el) => el.id === item.id && el.extra === extra);
    if (itemIndex === -1) {
      setOrder([...order, { ...item, count: 1, extra }]);
    } else {
      const newOrder = [...order];
      newOrder[itemIndex].count += 1;

      setOrder(newOrder);
    }
    const extraPrice = extra ? 1 : 0;
    setTotal(total + (item.Price + extraPrice))
  }

  function removeItem(item) {
    const index = (order.indexOf(item));
    const extraPrice = item.extra ? 1 : 0;
    
    order.splice(index, 1);
    setOrder([...order]);
    setTotal(total - ((item.Price + extraPrice) * item.count))
  }

  function minusItem(item, extra) {
    const itemIndex = order.findIndex((el) => el.id === item.id && el.extra === extra);
    const itemCount = order[itemIndex];

    if (itemCount.count === 1) {
      removeItem(itemCount)
    } else {
      itemCount.count += -1;
      setOrder([...order]);
    }
    const extraPrice = extra ? 1 : 0;
    setTotal(total - (item.Price + extraPrice))
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
          setTotal(0);
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
            title={"Café da Manhã"}
          />

          <Button className={css(styles.btnMenu)}
            handleClick={(e) => {
              setCategory("Lanches");
              e.preventDefault();
            }}
            title={"Almoço/Jantar"}
          />
        </div>

        <div className={css(styles.btnItensPosition)}>
          {categoryItens.map((item) => <Menu
            key={item.id}
            item={item}
            addItem={addItem} />)}
        </div>
      </div>

      <div className={css(styles.styleMenu)}>
        <h1 className={css(styles.title)}>Resumo do Pedido</h1>
        <div className={css(styles.inputPosition)}>
          <Input className={css(styles.inputMenu)} holder='Nome' type='text' value={client}
            handleChange={e => setClient(e.currentTarget.value)}
          />

          <Input className={css(styles.inputMenu)}
            holder='Mesa'
            type='text'
            value={table}
            handleChange={e => setTable(e.currentTarget.value)}
          />
        </div>

        <div className={css(styles.listItens)}>
          {order.map((item) => <Order
            key={item.id}
            item={item}
            addItem={addItem}
            minusItem={minusItem}
            removeItem={removeItem} />)}
        </div>

        <div className={css(styles.styleTotal)}>
          Total {total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        </div>

        <Button className={css(styles.btnSend)}
          handleClick={(e) => {
            sendOrder();
            e.preventDefault()
          }} title={"Enviar"} />
      </div>
    </div>
  )
}
export default ShowMenu;