import { makeAutoObservable } from "mobx";

import { addProductToBasket, fetchBasket, removeProductFromBasket, updateProductQuantityInBasket } from "../http/basketApi";
import ContentBlockTitleSimple from "../components/ContentBlocks/ContentBlockTitleSimple/ContentBlockTitleSimple";

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
    
    async addProduct(userId, productId, quantity) {
        this.setLoading(true);
        try {
            const newBasketItem = await addProductToBasket(userId, productId, quantity);
            this._basket.push(newBasketItem);
        } catch (error) {
            console.error("Error adding product to basket: ", error.message);
        } finally {
            this.setLoading(false);
        }
    }

    async fetchUserBasket(userId) {
        this.setLoading(true);
        try {
            const basket = await fetchBasket(userId);
            this.setBasket(basket);
        } catch (error) {
            console.error("Error fetching basket: ", error.message);
        } finally {
            this.setLoading(false);
        }
    }

    async removeProduct(userId, productId) {
        this.setLoading(true);
        try {
            await removeProductFromBasket(userId, productId);

            this.setBasket(this._basket.filter(product => product.id !== productId));

        } catch (error) {
            console.error("Error removing product from basket: ", error.message);
        } finally {
            this.setLoading(false);
        }
    }

    async updateQuantity(userId, productId, quantity) {
        this.setLoading(true);
        try {
            const updatedItem = await updateProductQuantityInBasket(userId, productId, quantity);
            
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