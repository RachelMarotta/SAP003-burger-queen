import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite'
import Button from './Button'

const styles = StyleSheet.create({
  btnItens: {
    // display: "flex",
    // justifyContent: "space-between",
    color: "#black",
    borderRadius: "6px",
    border: "none",
    width: "140px",
    height: "80px",
    fontSize: "15px",
    fontWeight: "bold",
    marginTop: "15px",
    marginBottom: '2%',
    backgroundColor: "#C8C8C8",

    ':hover': {
      backgroundColor: "#FFDE59",
      color: "black",

    },
  },
  modalBackground: {
    position: "absolute",
    backgroundColor: "#000000aa",
    width: "100%",
    top: 0,
    left: 0,
    height: "100%",
  },
  modal: {
    width: "200px",
    background: "white",
    borderRadius: "10px",
    padding: "10px",
    position: "relative",
    margin: "250px auto",

  }
})

function Menu(props) {
  const [show, setShow] = useState(false);
  const [selectedExtra, setSelectedExtra] = useState("");

  if (props.item.Type !== "Hambúrgueres") {
    return (
      <Button
        className={css(styles.btnItens)}
        Name={props.item.Name}
        Price={props.item.Price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        handleClick={(e) => {
          props.addItem(props.item);
          e.preventDefault();
        }}
      />
    );
  } else {
    return (
      <div className={css(styles.cardContainer)}>
        <Button
          className={css(styles.btnItens)}
          Name={props.item.Name}
          Price={props.item.Price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          handleClick={(e) => {
            setShow(!show)
          }}
        />
        {
          show
            ? <div className={css(styles.modalBackground)} onClick={() => setShow(!show)} >
              <div className={css(styles.modal)} onClick={(e) => e.stopPropagation()}>
                {props.item.Extras.map((extra, index) => {
                  return (
                    <div key={index}>
                      <label>{extra.Name}</label>
                      <input type="radio" value={extra.Name} onChange={() => setSelectedExtra(extra.Name)} checked={extra.Name === selectedExtra} />
                    </div>
                  )
                })
                }
                <Button className={css(styles.btnAdd)}
                  handleClick={(e) => {
                    props.addItem(props.item, selectedExtra);
                    e.preventDefault();
                    setShow(!show);
                    setSelectedExtra("")
                  }}
                  title={"Adicionar"}
                />
              </div>
            </div>
            : null

        }
      </div>
    );
  }
}

export default Menu;