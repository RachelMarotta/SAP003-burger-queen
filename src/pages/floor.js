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
    fontFamily: 'Noto Sans JP sans-serif',
    // borderTop: '5px solid black'
  },
  styleMenu: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '50%',
    border: '1px solid #000000',
    borderRadius: '5px',
    marginLeft: '1%',
    marginRight: '1%',
    backgroundColor: '#4F4F4F'
  },
  title: {
    fontSize: '40px',
    textAlign: "center",
    marginTop: '4px',
    marginBottom: '30px',
    color: '#000000'
  },
  btnPosition: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: '30px',
  },
  btnMenu: {
    backgroundColor: "#FFFAF0",
    borderRadius: "6px",
    width: "170px",
    height: "70px",
    fontSize: "20px",
    fontWeight: "bold",

    // ':active': {
    //   position: "relative",
    //   top: "5px",
    //   boxShadow: "none",
    // },

    ':hover': {
      backgroundColor: "#FFDE59",
      color: "#000000"
    },
  },
  styleTotal: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  btnSend: {
    color: "#000000",
    backgroundColor: "#ffde59",
    fontSize: "20px",
    fontWeight: "bold",
    borderRadius: "6px",
    border: "none",
    width: "120px",
    height: "100px",

    // ':active': {
    //   position: "relative",
    //   top: "5px",
    //   boxShadow: "none",
    // },

    ':hover': {
      backgroundColor: "#F8CA12",
      color: "#000000",
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
    height: "100%",
    width: "90%px",
  },
  listItens: {
    marginTop: "20px",
    overflow: "auto",
    width: "90%",
    height: "100%",
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