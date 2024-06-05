import React from "react";
import { ShoppingCart, BillScreen, HomeScreen, WishListScreen } from "../Screen"; // Make sure this path is correct based on your project structure

const ScreenComponent = ({ screen, cartManager, discountManager }) => {
    console.log("screen", cartManager)
    if (screen === "SHOPPING_CART") {
        return <ShoppingCart cartManager={cartManager} />;
    } else if (screen === "WISHLIST_SCREEN") {
        return <WishListScreen />;
    } else if (screen === "BILL_SCREEN") {
        return <BillScreen />;
    } else {
        return <HomeScreen />;
    }
};

export default ScreenComponent;
