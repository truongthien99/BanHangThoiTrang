import Cart from "./Cart";
import { ref, set, push, child, update, onValue } from 'firebase/database'

import { db } from '../../firebase.config'

class BillManager {
    constructor() {
        this.arrBill = [];
    }

    getAllBillData = (username) => {
        const dbRef = ref(db);
        const billRef = ref(db, "Bill/");
        onValue(billRef, (snapshot) => {
            const data = snapshot.val();
            this.arrBill = Object.values(data || {}).filter(item => item.username === username);
            return this.arrBill;
        });
    }

}

export default BillManager;