import { makeAutoObservable, toJS } from "mobx";
import { fetchCategoriesData } from "../http/categoryApi";
import { fetchSubCategories } from "../http/subCategoryApi";

export default class CatalogStore {
    constructor(){
        this._catalogСategoriesData = []
        this._catalogSubСategories = []
        this._isLoaded = false

        makeAutoObservable(this)
    }
 
    setCatalogСategories(catalogСategories){ 
        this._catalogСategoriesData = catalogСategories; 
    }

    setCatalogSubСategories(catalogSubСategories){ 
        this._catalogSubСategories = catalogSubСategories; 
    }

    setIsCatalogLoaded(isLoaded) {
        this._isLoaded = isLoaded;
    }

    get catalogСategories(){
        return this._catalogСategoriesData;
    }

    get catalogSubСategories(){
        return this._catalogSubСategories;
    }

    get isLoaded() {
        return this._isLoaded;
    }

    clearStore() {
        this._catalogСategoriesData = [];
        this._catalogSubСategories = [];
        this._isLoaded = false; 
    }

    async getCatalogCategoriesData(){
        try {
            const response = await fetchCategoriesData();
            this.setCatalogСategories(response);

            this.setIsCatalogLoaded(true); 
        } catch (error){
            this.setIsCatalogLoaded(false);
            throw error
        }
    } 

    async getCatalogSubCategories(){
        try {
            const response = await fetchSubCategories();

            this.setCatalogSubСategories(response);
        } catch (error){
            throw error
        }
    } 
    
    async checkCategoryExists(categoryName){
        return this._catalogСategoriesData.some(category => category.name === categoryName);
    }

    async getSubCategoriesForCategory(categoryName) {
        const category = this._catalogСategoriesData.find(category => category.name === categoryName);
        return category ? toJS(this._catalogSubСategories.filter(subCategory => subCategory.categoryId === category.id)) : [];
    }

    async getCategoryDataByName(categoryName) {
        const category = this._catalogСategoriesData.find(category => category.name === categoryName);
        return category;
    }

    getRandomDataName(type) {
        if (type === "category" && this._catalogСategoriesData.length > 0) {
            const randomIndex = Math.floor(Math.random() * this._catalogСategoriesData.length);
            return this._catalogСategoriesData[randomIndex].categoryName;
        } 
        
        if (type === "subCategory" && this._catalogСategoriesData.length > 0) {
            const randomIndex = Math.floor(Math.random() * this._catalogСategoriesData.length);
            return this._catalogСategoriesData[randomIndex].subCategories.subCategoryName;
        }

        return null;
    }
}