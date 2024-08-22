import { makeAutoObservable } from "mobx";
import { addRecentlyViewedItem, removeRecentlyViewedList, removeRecentlyViewedProduct, fetchRecentlyViewedProducts } from "../http/recentlyViewedApi";

export default class RecentlyViewedStore {
    constructor() {
        this._recentlyViewedProducts = [];
        this._isLoading = false;

        makeAutoObservable(this);
    }

    setLoading(bool) {
        this._isLoading = bool;
    }

    setRecentlyViewedProducts(products) {
        this._recentlyViewedProducts = products;
    }

    get recentlyViewedProducts() {
        return this._recentlyViewedProducts;
    }

    get isLoading() {
        return this._isLoading;
    }
    
    get hasRecentlyViewedProducts() {
        return this._recentlyViewedProducts.length > 0;
    }

    async addRecentlyViewedProduct({userId, productId}) {
        this.setLoading(true);
        try {
            const productExists = this._recentlyViewedProducts.some(item => item.productId === productId);
            if (productExists) {
                return;
            } else {
                const product = await addRecentlyViewedItem({ userId, productId });
                this._recentlyViewedProducts.push(product);
            }
        } catch (error) {
            console.error("Error adding recently viewed product: ", error.message);
        } finally {
            this.setLoading(false);
        }
    }

    async fetchRecentlyViewedProducts({userId, allInformation}) {
        this.setLoading(true);
        try {
            const products = await fetchRecentlyViewedProducts({ userId, allInformation });
            this.setRecentlyViewedProducts(products);
        } catch (error) {
            console.error("Error fetching recently viewed products: ", error.message);
        } finally {
            this.setLoading(false); 
        }
    }

    async removeRecentlyViewedProduct(userId, productId) {
        this.setLoading(true);
        try {
            await removeRecentlyViewedProduct({ userId, productId });
            this.setRecentlyViewedProducts(this._recentlyViewedProducts.filter(product => product.id !== productId));
        } catch (error) {
            console.error("Error removing recently viewed product: ", error.message);
        } finally {
            this.setLoading(false);
        }
    }

    async removeRecentlyViewedList(userId) {
        this.setLoading(true);
        try {
            await removeRecentlyViewedList({ userId });
            this.setRecentlyViewedProducts([]);
        } catch (error) {
            console.error("Error removing recently viewed list: ", error.message);
        } finally {
            this.setLoading(false);
        }
    }
}
