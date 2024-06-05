import Cart from "./Cart";
import { ref, set, push, child, update, onValue } from 'firebase/database'

import { db } from '../../firebase.config'

class DiscountManager {
    constructor() {
        this.arrDiscount = [];
    }

    getAllDiscount = () => {
        const discountRef = ref(db, "Discount/");
        onValue(discountRef, (snapshot) => {
            const data = snapshot.val();
            this.arrDiscount = Object.values(data || {});
            // console.log(this.arrDiscount)
            return this.arrDiscount;
        });
    };


} export default DiscountManager;