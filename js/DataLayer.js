
class Product {
    static getSpecialParametersDatabase() {
        return JSON.parse(JSON.stringify(Product.#specialParametersDatabase));
    }
    static getAvailableProductNames() {
        return JSON.parse(JSON.stringify(Object.keys(Product.#specialParametersDatabase)));
    }
    static #amountOfInstances = 0;
    static getAmountOfInstances() {
        return this.#amountOfInstances
    }
    static #specialParametersDatabase ={
        milk: ['fat','number',1],
        chocolate: ['kind','string'],
        wine: ['alcohol','number',0],
        butter: ['volume','number',2],
    }
    #id;
    #title;
    #manufacture;
    #price;
    #specialParameter = [];
    specialParameterSetter(value = '') {
        const specs = Product.getSpecialParametersDatabase()[(this.constructor.name).toLowerCase()];
        // console.log(specs);
        if (specs[1] === 'number'){
            this.#specialParameter[0] = specs[0];
            this.#specialParameter[1] = Number(value).toFixed(Number(specs[2]))
        } else if(specs[1] === 'string'){
            this.#specialParameter[0] = specs[0];
            this.#specialParameter[1] = value.toString();
        } else console.error('unknown product type, check it');

    }

    specialParameterNameGetter() {
        return  Product.getSpecialParametersDatabase()[this.constructor.name.toLowerCase()][0];
    }
    constructor(title = 'defaultTitle',
                manufacture = 'defaultManufacture',
                price = 0) {
        this.titleSetter = title;
        this.manufactureSetter = manufacture;
        this.priceSetter = price;
        this.#id = Product.#amountOfInstances++;
    }
    get specialParameterName() {
        return this.#specialParameter[0];
    }
    get specialParameterGetter(){ return JSON.parse(JSON.stringify(this.#specialParameter)); }
    // get idGetter(){ return this.#id; }
    get titleGetter(){ return this.#title; }
    get typeGetter(){ return this.constructor.name;}
    get priceGetter(){ return this.#price; }
    get manufactureGetter(){ return this.#manufacture; }
    set titleSetter(value){
        if (typeof value === "string") {
            this.#title = value;
        } else {
            console.error('ERROR!!! Trying to set not a string to title');
        }
    }
    set manufactureSetter(value){
        if (typeof value === "string") {
            this.#manufacture = value;
        } else {
            console.error('ERROR!!! Trying to set not a string to manufacture');
        }
    }
    set priceSetter(value){
        if (!Number.isNaN(Number(value)) && value !== undefined && (!Number.isNaN(Number(value) >= 0))){
            this.#price = Number(value).toFixed(2);
        } else{
            console.error('ERROR!!! Trying to set not a number to price');
        }
    }
}
class Milk extends  Product{
    constructor(title, manufacture, price, specialParameter) {
        super(title, manufacture, price);
        this.specialParameterSetter(specialParameter);
    }
}
class Chocolate extends Product{
constructor(title, manufacture, price, specialParameter) {
    super(title, manufacture, price);
    this.specialParameterSetter(specialParameter);
}
}
class Wine extends  Product{
    constructor(title, manufacture, price, specialParameter) {
        super(title, manufacture, price);
        this.specialParameterSetter(specialParameter);
    }
}
class Butter extends  Product{
    constructor(title, manufacture, price, specialParameter) {
        super(title, manufacture, price);
        this.specialParameterSetter(specialParameter);
    }
}

// const test1 = new Milk('milk11','mfg1',13,3.66666);
// console.log(test1);
// const test2 = new Wine('wine1','mfg2',23,15.151515);
// console.log(test2);
// const test3 = new Chocolate('choko1','mfg3',33,'extra fine dark');
// console.log(test3);