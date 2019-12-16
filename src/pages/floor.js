import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import firestoreApp from '../utils/firebase';
import Button from '../components/button';
//import Input from '../components/input';

const styles = StyleSheet.create({
    styleMenu: {
        display: "flex",
        flexDirection: "column",
        width: "50%"
    },
    title: {
        width: "10%",
        fontSize: "30px",
        marginTop: "15%",
        marginLeft: "100px"
    },
    btn: {
        padding: "6px",
    },
    btnBreakfast: {
        color: "red",
        width: "20%"

    },
    btnLunch: {
        color: "blue",
        width: "20%"

    },
})

function ShowMenu(category) {
    const [item, setItem] = useState([]);

    useEffect(() => {
        firestoreApp
            .collection("Menu")
            .where("category", "==", category)
            .onSnapshot((snapshot) => {
                const docMenu = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setItem(docMenu);
            })
    }, [category])
    return item;
}

function Floor() {
    const [category, setCategory] = useState("Café da manhã");
    const menu = ShowMenu(category);

    return (
        <div className={css(styles.styleMenu)}>
            <h1 className={css(styles.title)}>Menu</h1>
            <div className={css(styles.btn)}>
                <Button className={css(styles.btnBreakfast)} handleClick={(e) => { setCategory("Café da manhã"); e.preventDefault() }}
                    title={"Café da Manhã"} />
                <Button className={css(styles.btnLunch)} handleClick={(e) => { setCategory("Lanches"); e.preventDefault() }}
                    title={"Almoço/Jantar"} />
            </div>
            {menu.map((item) =>
                <div key={item.id}>
                    <div className="App">
                        {item.Name}
                        {"R$" + item.Price + ",00"}
                    </div>
                </div>
            )}
        </div>
    )
}


export default Floor;











