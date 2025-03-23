import { create } from "zustand";
import { guadarPedidos } from "../type/types";

interface CartStore {

    Carrito: guadarPedidos[]; 
    setCarrito: (nuevoCarrito: guadarPedidos[]) => void; 

}

const useCartStore = create<CartStore>((set) => ({

    Carrito:[],
    setCarrito: (nuevoCarrito) => set({ Carrito: nuevoCarrito }),

}))

export default useCartStore;