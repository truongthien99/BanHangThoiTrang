import Cart from "./Cart";
import { ref, set, push, child, update, onValue } from 'firebase/database'

import { db } from '../../firebase.config'
import { getAuth } from "firebase/auth";


class CartManager {

  constructor() {
    this.arrPro = [];
  }

  getArrPro() {
    return this.arrPro;
  }

  setArrPro(value) {
    this.arrPro = value;
  }

  addCart(id, username, name, color, price, quantity, size, img) {
    const newCart = new Cart(id, username, name, color, price, quantity, size, img);
    this.arrPro.push(newCart);
  }


  removeCart(id) {
    for (let i = 0; i < this.arrPro.length; i++) {
      if (this.arrPro[i].getid() === id) {
        this.arrPro.splice(i, 1);
        return;
      }
    }
  }

  getTotalValue() {
    let totalValue = 0;
    for (let i = 0; i < this.arrPro.length; i++) {
      totalValue += this.arrPro[i].price * this.arrPro[i].quantity;
    }
    return totalValue;
  }

  getAllData(username) {
    const dbRef = ref(db);
    const CartRef = ref(db, "Cart/");
    onValue(CartRef, (snapshot) => {
      const data = snapshot.val();
      this.arrPro = Object.values(data || {}).filter(item => item.username === username);
      // console.log(this.arrPro)
    });
  };





  updateData({ id, username, name, color, price, quantity, size, img }) {
    const updates = {};
    updates["Cart/" + id] = {
      price: price,
      username: username,
      img: img,
      color: color,
      size: size,
      name: name,
      quantity: quantity,
    };
    update(ref(db), updates)
      .then(() => {
        return console.log("Data updated successfully");
      })
      .catch((error) => {
        return console.log("Data updated failed", error);
      });
  }




}

export default CartManager;