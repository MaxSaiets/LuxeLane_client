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
    
    async fetchUserFavorites(userId) {
        this.setLoading(true);
        try {
            const favoritesList = await fetchUserFavorites(userId);
            this.setUserFavorites(favoritesList);
            console.log("User favorites list: ", JSON.stringify(this._userFavoritesList, null, 2));
        } catch (error) {
            console.error("Error fetching user favorites list: ", error.message);
        } finally {
            this.setLoading(false);
        }
    }
    
    async addFavoriteProduct(userId, productId) {
        this.setLoading(true);
        try {
            const favoriteProductData = await addToFavorites(userId, productId);
            action(() => {
                this._userFavoritesList.push(favoriteProductData);
            })();
        } catch (error) {
            console.error("Error adding product to favorite list: ", error.message);
        } finally {
            this.setLoading(false);
        }
    }

    async removeFavoriteProduct(userId, productId) {
        this.setLoading(true);
        try {
            await removeFromFavorites(userId, productId);
            action(() => {
                this.setUserFavorites(this._userFavoritesList.filter(product => product.id !== productId));
            })();
        } catch (error) {
            console.error("Error removing user favorite product: ", error.message);
        } finally {
            this.setLoading(false);
        }
    }

    async removeUserFavoriteList(userId) {
        this.setLoading(true);
        try {
            if (this._userFavoritesList.length === 0) {
                return;
            } else {
                await removeFavoriteList(userId);
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
