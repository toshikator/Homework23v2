class Store {
    #storeInfo = {};
    #products = [];
    #productType = Product.getAvailableProductNames();
    #productTypeList=[];
    productTypeListGetter(){
        let arr = [];
        arr = this.#products.reduce((accumulator,value)=>{
            return accumulator.push(value.typeGetter);
        },[])
        console.log(arr);
    }

    constructor(name = 'default store', productDatabaseInit = []) {
        this.nameSetter = name;
        this.#products = (JSON.parse(JSON.stringify(productDatabaseInit)));
    }
    set nameSetter(value){
        if (typeof value === "string") {
            this.#storeInfo['storeName'] = value;
        } else {
            console.error('ERROR!!! Try to set not a string to name of the store');
        }
    }
    addProduct(product){
        // console.log(product);
        if (product instanceof Product && !this.#products.includes(product)){
            this.#products.push(product);
        } else {
            console.error('ERROR!!! Trying to add incorrect instance to products, or add existing  product');
        }
    }
    getAllProducts(){
        return this.#products.map(value => value);
    }
    getProductsByType(typeToShow){
        if (this.#productType.includes(String(typeToShow))) {
            return this.#products.filter((product) => {
                return product.constructor.name.toLowerCase() === typeToShow;
            });
        } else {
            console.error('ERROR!!! Trying to get incorrect type of product');
            return '~!!!ERROR, here is incorrect DATA!!!~';
        }
    }
}

// const store1 = new Store('lolo');
// store1.addProduct(new Milk('mlk1','mfg1',9,3.3));
// console.log(store1);
// store1.productTypeListGetter();