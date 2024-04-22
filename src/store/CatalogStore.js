import { makeAutoObservable, toJS } from "mobx";
import { fetchCategories } from "../http/categoryApi";
import { fetchSubCategories } from "../http/subCategoryApi";

export default class CatalogStore {
    constructor(){
        this._catalogСategories = []
        this._catalogSubСategories = []

        makeAutoObservable(this)
    }

    setCatalogСategories(catalogСategories){ 
        this._catalogСategories = catalogСategories; 
    }

    setCatalogSubСategories(catalogSubСategories){ 
        this._catalogSubСategories = catalogSubСategories; 
    }

    get catalogСategories(){
        return this._catalogСategories;
    }

    get catalogSubСategories(){
        return this._catalogSubСategories;
    }

    async getCatalogCategories(){
        try {
            const response = await fetchCategories();

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
        return this._catalogСategories.some(category => category.name === categoryName);
    }

    async getSubCategoriesForCategory(categoryName) {
        const category = this._catalogСategories.find(category => category.name === categoryName);
        return category ? toJS(this._catalogSubСategories.filter(subCategory => subCategory.categoryId === category.id)) : [];
    }

    async getCategoryDataByName(categoryName) {
        const category = this._catalogСategories.find(category => category.name === categoryName);
        return category;
    }
}