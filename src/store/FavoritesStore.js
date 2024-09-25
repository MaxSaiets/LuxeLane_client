import { makeAutoObservable, action } from "mobx";
import { addToFavorites, fetchUserFavorites, removeFromFavorites, removeFavoriteList } from "../http/favoritesApi";

export default class FavoritesStore {
    constructor(){
        this._userFavoritesList = []; 
        this._isLoading = false;

        makeAutoObservable(this, {
            setLoading: action,
            setUserFavorites: action,
            fetchUserFavorites: action,
            addFavoriteProduct: action,
            removeFavoriteProduct: action,
            removeUserFavoriteList: action
        });
    }

    setLoading(bool) {
        this._isLoading = bool;
    }

    setUserFavorites(favoritesList) {
        this._userFavoritesList = favoritesList;
    }

    get userFavoriteList() {
        return this._userFavoritesList;
    }

    get isLoading() {
        return this._isLoading;
    }

    get hasUserFavoritesList() {
        return this._userFavoritesList.length > 0;
    }

    get favoriteListCount() {
        return Array.isArray(this._userFavoritesList) ? this._userFavoritesList.length : 0;
    }
    
    clearStore() {
        this.setUserFavorites([]);
        this.setLoading(false);
    }
    async fetchUserFavorites({ productDataCount, fetchAllProducts }) {
        this.setLoading(true);
        try {
            const favoritesList = await fetchUserFavorites({ productDataCount, fetchAllProducts });
            this.setUserFavorites(favoritesList);
        } catch (error) {
            console.error("Error fetching user favorites list: ", error.message);
        } finally {
            this.setLoading(false);
        }
    }
    
    async addFavoriteProduct(productId) {
        this.setLoading(true);
        try {
            const favoriteProductData = await addToFavorites(productId);
            action(() => {
                this._userFavoritesList.push(favoriteProductData);
            })();
        } catch (error) {
            console.error("Error adding product to favorite list: ", error.message);
        } finally {
            this.setLoading(false);
        }
    }

    async removeFavoriteProduct(productId) {
        this.setLoading(true);
        try {
            await removeFromFavorites(productId);
            action(() => {
                this.setUserFavorites(this._userFavoritesList.filter(product => product.id !== productId));
            })();
        } catch (error) {
            console.error("Error removing user favorite product: ", error.message);
        } finally {
            this.setLoading(false);
        }
    }

    async removeUserFavoriteList() {
        this.setLoading(true);
        try {
            if (this._userFavoritesList.length === 0) {
                return;
            } else {
                await removeFavoriteList();
                action(() => {
                    this.setUserFavorites([]);
                })();
            }
        } catch (error) {
            console.error("Error removing user favorite list: ", error.message);
        } finally {
            this.setLoading(false);
        }
    }
}
