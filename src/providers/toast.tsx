"use client"
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";


export default function ToastProvider({children}:{children:ReactNode}){
    return (
        <>
        {children}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                toastStyle={{ zIndex: 99999 }}
            />
        </>
    )
}