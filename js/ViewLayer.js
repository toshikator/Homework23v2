(()=>{
    const formConnector = document.getElementById('newElement');
    const productTitle = formConnector.title;
    const productManufacture = formConnector.manufacturer;
    const productPrice = formConnector.price;
    const productType = formConnector.type;
    const productSpecialParameter = formConnector.specialParameter;
    const nav = document.getElementById('nav');
    const section = document.getElementById('section');
    const sideNav = document.getElementById('side_nav');
    const content = document.querySelector('.content');
    const myStore = new Store('Lavka');

    const test0 = new Wine('buhlo','ssanina',100,14);
    const test1 = new Wine('buhlo1','ssanina polnaja',30,11);
    const test2 = new Wine('poilo ELITnoe','samogonshiki',150,19);
    const test3 = new Milk('milkSTD','burenka1',7.222222,3.6444444444);
    const test4 = new Milk('ecoMilk','burenkaECO',20,4.2);
    const test5 = new Milk('soiMilk','China',18,0.2);
    const test6 = new Chocolate('economy','unnamed',2,'who knows?');
    const test7 = new Chocolate('elite','Puratos',33,'extra dark fine chocolate');
    const test8 = new Chocolate('random gift','buhgalteria team',2,'the better way is have not this kind of goods');

    myStore.addProduct(test0);
    myStore.addProduct(test1);
    myStore.addProduct(test2);
    myStore.addProduct(test3);
    myStore.addProduct(test4);
    myStore.addProduct(test5);
    myStore.addProduct(test6);
    myStore.addProduct(test7);
    myStore.addProduct(test8);
    // console.log(myStore);

    // productType.addEventListener('change',()=>{
    //     productSpecialParameter.placeholder = Product.getSpecialParametersDatabase()[productType.value];
    //     (productType.value === 'chocolate')?productSpecialParameter.type = 'text':productSpecialParameter.type = 'number';
    // });

    $('#newElement #type').on('change',function (event) {
        // console.log('we are here');
        $('#newElement #special_parameter').attr('placeholder',(Product.getSpecialParametersDatabase()[$('#newElement #type').val()][0]));
        $('#newElement #special_parameter').attr('type',
            Product.getSpecialParametersDatabase()[$('#newElement #type').val()][1]);
    });


    // section.addEventListener('click', event =>{
    //     if (event.target.dataset.name === undefined){
    //
    //     }
    //     else if (event.target.dataset.name === 'all'){
    //         renderProducts(myStore.getAllProducts());
    //         changeActiveClassOnElement(event);
    //     } else{
    //         renderProducts(myStore.getProductsByType(event.target.dataset.name));
    //         changeActiveClassOnElement(event);
    //     }
    // });

    $('#section').on('click',function (event) {
        // console.log(event.target.parentElement.children);
        // $(event.target.parentElement.children).removeClass('active');
        if (event.target.closest('#side_nav')){
            // console.log('first option');
            $('#side_nav .active').removeClass('active');
            $(event.target).addClass('active');
        } else if(event.target.closest('#nav')){
            // console.log('second option');
            $('#nav .active').removeClass('active');
            $(event.target).addClass('active');
        }
        // $('#section .active').removeClass('active');
        // $(event.target).addClass('active');
        if (event.target.dataset.name === undefined){

        }else if (event.target.dataset.name === 'all'){
            renderProducts(myStore.getAllProducts());
        }else{
            // console.log($('#side_nav .active').attr('data-name'));
            renderProducts(myStore.getProductsByType($('#side_nav .active').attr('data-name')));
        }
    })


    // nav.addEventListener('click',event=>{
    //     if (event.target.id === 'productsLink'){
    //         console.log(myStore.getAllProducts());
    //         renderProducts(myStore.getAllProducts());
    //         formConnector.classList.add('hide');
    //         content.classList.remove('hide')
    //         sideNav.classList.remove('hide');
    //         changeActiveClassOnElement(event);
    //         for (let child of sideNav.firstElementChild.children) {
    //             child.classList.remove('active');
    //         }
    //         sideNav.firstElementChild.firstElementChild.classList.add('active');
    //     } else if(event.target.id === 'addLink'){
    //         formConnector.classList.remove('hide');
    //         formConnector.parentElement.style.justifyContent = 'center';
    //         content.classList.add('hide');
    //         sideNav.classList.add('hide');
    //         changeActiveClassOnElement(event);
    //     }
    // });

    $('#nav').on('click',function (event) {
        $('#nav .active').removeClass('active');
        $(event.target).addClass('active');
        if (event.target.id === 'productsLink'){
            $('#section form ').addClass('hide');
            $('#section #side_nav').removeClass('hide');
            $('#section .content').removeClass('hide');
        }else if(event.target.id === 'addLink'){
            $('#section #side_nav').addClass('hide');
            $('#section .content').addClass('hide');
            $('#section #newElement ').removeClass('hide');
        }
    })



    // function renderProducts(products) {
    //     content.innerHTML = '';
    //     products.forEach(product=>{
    //         let card = document.createElement('div');
    //         card.classList.add('card');
    //         card.innerHTML = `
    //             <h2>${product.constructor.name}</h2>
    //                 <h3>${product.titleGetter}</h3>
    //                 <h3>${product.manufactureGetter}</h3>
    //                 <h4>${product.specialParameterName}: ${product.specialParameterGetter}</h4>
    //                 <h4>Price: ${product.priceGetter}</h4>
    //         `;
    //         content.appendChild(card);
    //     });
    // }

    function renderProducts(products) {
            $('.content').html('') ;
            products.forEach(product=>{
                $('.content').append(`<div class="card">
                        <h2>${product.constructor.name}</h2>
                        <h3>${product.titleGetter}</h3>
                        <h3>${product.manufactureGetter}</h3>
                        <h4>${product.specialParameterGetter[0]}: ${product.specialParameterGetter[1]}</h4>
                        <h4>Price: ${product.priceGetter}</h4>
                </div>`);

            });
        }
    // function changeActiveClassOnElement(event) {
    //     Array.from(event.target.parentElement.children).forEach((node)=>{
    //         node.classList.remove('active');
    //     });
    //     event.target.classList.add('active');
    // }
    formConnector.addEventListener('submit',(eve)=>{
        // console.log('teestsse',productSpecialParameter);
        eve.preventDefault();
        // console.log('special: ', productSpecialParameter);
        let obj = {};
        switch (productType.value) {
            case 'milk':
                obj = new Milk(productTitle.value,
                    productManufacture.value,
                    productPrice.value,
                    productSpecialParameter.value);
                break;
            case 'wine':
                obj = new Wine(productTitle.value,
                    productManufacture.value,
                    productPrice.value,
                    productSpecialParameter.value);
                break;
            case 'chocolate':
                obj = new Chocolate(productTitle.value,
                    productManufacture.value,
                    productPrice.value,
                    productSpecialParameter.value);
                break;
            case 'butter':
                obj = new Butter(productTitle.value,
                    productManufacture.value,
                    productPrice.value,
                    productSpecialParameter.value);
                break;
            default: break;
       }
        myStore.addProduct(obj);
        console.log('store all');
        localStorage.setItem('ProductDatabase',JSON.stringify(myStore.getAllProducts()));
        const msg = document.createElement('div');
        msg.textContent = `Successfully added: ${formConnector.title.value}`;
        msg.classList.add('alert-success');
        formConnector.appendChild(msg);
        setTimeout(()=>{
            msg.classList.add('hide');
        },1800)
       // console.log('object: ',obj);
        console.log('store all:',myStore.getAllProducts());
    });





// $('li').attr('style','font-family:Arial');

    renderProducts(myStore.getAllProducts());
})()