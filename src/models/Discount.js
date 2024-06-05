import { ref, set, push, child, update, onValue } from 'firebase/database'

import { db } from '../../firebase.config'

class Discount {
  constructor(id, code, percentage, status) {
    this.id = id;
    this.code = code;
    this.percentage = percentage;
    this.status = status;
  }





}

export default Discount;
