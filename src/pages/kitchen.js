import React, { useState, useEffect } from 'react';
import db from '../utils/firebase';

function Kitchen() {

  useEffect(() => {

    db
      .collection("Orders")
      .get().then((snapshot) => {
        const docOrders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
      })
  }, []);

  return (
    <h1>banana</h1>
  )
}

export default Kitchen;