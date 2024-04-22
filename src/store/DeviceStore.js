// mobx - буде слідкувати за зміною цих змінних і при їх зміні компоненти будуть перерендуваться
import { makeAutoObservable } from "mobx";

export default class DeviceStore {
    constructor(){
        this._types = [] 
        this._brands = []
        this._devices = []
        this._selectedType = {} // який type вибраний 
        this._selectedBrand = {} // який brand вибраний 

        makeAutoObservable(this)
    }

    // Ections - це функції, які якось змінюють состояниє
    setTypes(types){
        this._types = types 
    }
    setBrands(brands){
        this._brands = brands 
    }
    setDevices(devices){
        this._devices = devices 
    }
    setSelectedType(selectedType){
        this._selectedType = selectedType
    }
    setSelectedBrand(selectedBrand){
        this._selectedBrand = selectedBrand
    }
    // get (викликається тількі тоді коли змінна яка була всередині зміниться)
    get types(){
        return this._types
    }
    get brands(){
        return this._brands
    }
    get devices(){
        return this._devices
    }
    get selectedType(){
        return this._selectedType
    }
    get selectedBrand(){
        return this._selectedBrand
    }
}