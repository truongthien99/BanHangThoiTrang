// Cart.js

class Cart {
    constructor(id, username, name, color, price, quantity, size, img) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.color = color;
        this.price = price;
        this.quantity = quantity;
        this.size = size;
        this.img = img;
    }

    // Phương thức để giảm số lượng sản phẩm
    decreaseSoLuong() {
        if (this.soLuong > 1) {
            this.soLuong--;
        }
    }

    // Phương thức để tăng số lượng sản phẩm
    increaseSoLuong() {
        this.soLuong++;
    }
}

export default Cart;
