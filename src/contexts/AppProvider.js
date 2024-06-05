import React, { createContext, useState, useEffect } from 'react';
import { getAllCartData, getAllDiscountData } from '../apis/firebaseComponent'; // Các hàm API để lấy dữ liệu từ Firebase
import { CartManager, DiscountManager, BillManager } from '../models';

import { getAuth } from "firebase/auth";



export const AppContext = createContext();
export const email = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const userEmail = user.email
    return userEmail;
}
export const AppProvider = ({ children }) => {
    const cartData = new CartManager;
    const discountData = new DiscountManager;
    const billData = new BillManager;
    let auth = getAuth();
    let user = auth.currentUser;



    useEffect(() => {
        const interval = setInterval(() => {
            auth = getAuth();
            user = auth.currentUser;
            if (user) {
                // emailUser = user.email;
                cartData.getAllData(user.email);
                discountData.getAllDiscount();
                billData.getAllBillData(user.email);
                // console.log("userEmail", user.email);

                // console.log("aaaaaaa", cartData.emailUser);
                // console.log("if")
            } else {
                // console.log("else")
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [children]);

    return (
        <AppContext.Provider value={{ cartData, discountData, billData, user }}>
            {children}
        </AppContext.Provider>
    );
};
