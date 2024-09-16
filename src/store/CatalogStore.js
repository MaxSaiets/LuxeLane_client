import { makeAutoObservable, toJS } from "mobx";
import { fetchCategoriesData } from "../http/categoryApi";
import { fetchSubCategories } from "../http/subCategoryApi";

export default class CatalogStore {
    constructor(){
        this._catalogСategoriesData = []
        this._catalogSubСategories = []

        makeAutoObservable(this)
    }
 
    setCatalogСategories(catalogСategories){ 
        this._catalogСategoriesData = catalogСategories; 
    }

    setCatalogSubСategories(catalogSubСategories){ 
        this._catalogSubСategories = catalogSubСategories; 
    }

    get catalogСategories(){
        return this._catalogСategoriesData;
    }

    get catalogSubСategories(){
        return this._catalogSubСategories;
    }

    clearStore() {
        this._catalogСategoriesData = [];
        this._catalogSubСategories = [];
    }

    async getCatalogCategoriesData(){
        try {
            const response = await fetchCategoriesData();

            this.setCatalogСategories(response);
        } catch (error){
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
}