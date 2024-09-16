import { makeAutoObservable } from "mobx";

import { addProductToBasket, fetchBasket, removeProductFromBasket, updateProductQuantityInBasket } from "../http/basketApi";

export default class BasketStore {
    constructor(){
        this._basket = []; 
        this._isLoading = false;

        makeAutoObservable(this);
    }

    setLoading(bool) {
        this._isLoading = bool;
    }

    setBasket(basket) {
        this._basket = basket;
    }

    get basket() {
        return this._basket;
    }
    get isLoading() {
        return this._isLoading;
    }
    get basketCount() {
        return Array.isArray(this._basket) ? this._basket.length : 0;
    }
    
    get totalAmount() {
        return this._basket.reduce((total, product) => {
            return total + (product.price * product.quantity);
        }, 0);
    }
    
    clearStore() {
        this._basket = [];
        this._isLoading = false;
    }

    async addProduct(productId, quantity) {
        this.setLoading(true);
        try {
            const newBasketItem = await addProductToBasket(productId, quantity);
            this._basket.push(newBasketItem);
        } catch (error) {
            console.error("Error adding product to basket: ", error.message);
        } finally {
            this.setLoading(false);
        }
    }

    async fetchUserBasket() {
        this.setLoading(true);
        try {
            const basket = await fetchBasket();
            this.setBasket(basket);
        } catch (error) {
            console.error("Error fetching basket: ", error.message);
        } finally {
            this.setLoading(false);
        }
    }

    async removeProduct(productId) {
        this.setLoading(true);
        try {
            await removeProductFromBasket(productId);

            this.setBasket(this._basket.filter(product => product.id !== productId));

        } catch (error) {
            console.error("Error removing product from basket: ", error.message);
        } finally {
            this.setLoading(false);
        }
    }

    async updateQuantity(productId, quantity) {
        this.setLoading(true);
        try {
            const updatedItem = await updateProductQuantityInBasket(productId, quantity);
            
            const newBasket = this._basket.map(product =>
                product.id === updatedItem.id
                    ? { ...product, quantity: updatedItem.quantity }
                    : product
            );
            this.setBasket(newBasket);
           
        } catch (error) {
            console.error("Error updating product quantity in basket: ", error.message);
        } finally {
            this.setLoading(false);
        }
    } 
}