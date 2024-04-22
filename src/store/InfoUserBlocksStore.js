import { makeAutoObservable } from "mobx";

export default class InfoUserBlocksStore {
    constructor(){
        this._blockAboutCompanyData = [
            { href: "#", text: "About the company" }, 
            { href: "#", text: "Vacancies" }, 
            { href: "#", text: "Contacts" }, 
            { href: "#", text: "All categories" }, 
            { href: "#", text: "Contacts" }, 
            { href: "#", text: "All categories" }, 
        ]
        this._blockHelpData = [
            { href: "#", text: "Delivery" }, 
            { href: "#", text: "Credit" }, 
            { href: "#", text: "Guarantees" }, 
            { href: "#", text: "Product return" }, 
            { href: "#", text: "Guarantees" }, 
            { href: "#", text: "Product return" }, 
        ]

        makeAutoObservable(this)
    }

    setBlockAboutCompany(blockAboutCompanyData){
        this._blockAboutCompany = blockAboutCompanyData; 
    }
    setBlockHelpData(blockHelpData){
        this._blockHelpData = blockHelpData; 
    }

    get blockAboutCompanyData(){
        return this._blockAboutCompanyData;
    }
    get blockHelpData(){
        return this._blockHelpData;
    }
}