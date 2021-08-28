let carts = document.querySelectorAll('.add-cart');
let products = [
    {
        name: "Blue printed shirt",
        tag: "Men's full sleeve cotton shirt",
        price: 650,
        inCart:0
    },
    {
        name: "Full sleeve comfort coat",
        tag: "Navy blue full sleeve coat",
        price: 2000,
        inCart: 0
    },
    {
        name: "Denim shirt",
        tag: "Men's full sleeve denim shirt",
        price: 920,
        inCart: 0
    },
    {
        name: "Gray&Blue Men T's",
        tag: "Men's full sleeve gray Tshirt",
        price: 650,
        inCart: 0
    },
    {
        name: "Black&Blue pattern T",
        tag: "Men's Tshirt",
        price: 600,
        inCart: 0
    },
    {
        name: "Ash T",
        tag: "Men's full sleeve cotton Tshirt",
        price: 450,
        inCart: 0
    },
    {
        name: "Peach party wear",
        tag: "women's party wear",
        price: 780,
        inCart: 0
    },
    {
        name: "Black gown",
        tag: "rose printed women's wear",
        price: 800,
        inCart: 0
    },
    {
        name: "Floor touch dress",
        tag: "women's green full dress",
        price: 1010,
        inCart: 0
    },
    {
        name: "Brown kurti top",
        tag: "women's designer top",
        price: 580,
        inCart: 0
    },
    {
        name: "Designer sleeve top",
        tag: "women's embroidary top",
        price: 700,
        inCart: 0
    },
    {
        name: "Puff top",
        tag: "women's hand puffed top",
        price: 610,
        inCart: 0
    },
    {
        name: "Blue belted dress",
        tag: "Kid's party dress",
        price: 550,
        inCart: 0
    },
    {
        name: "Yellow striped shirt",
        tag: "Kid's cotton shirt",
        price: 650,
        inCart: 0
    },
    {
        name: "Ethnic Party gown",
        tag: "Kid's party gown",
        price: 800,
        inCart: 0
    }
];

for (let i=0; i<carts.length; i++){
    carts[i].addEventListener('click', () =>{
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers){
        document.querySelector('.item__number span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if( productNumbers ){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.item__number span').textContent = productNumbers + 1;
    }else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.item__number span').textContent = 1;
    }

    setItems(product);
    
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }else{
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');
    console.log(cartCost);
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }else{
        localStorage.setItem("totalCost", product.price);
    }
    
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `

            <div class="product">
                <ion-icon name="trash-outline"></ion-icon>
                <span>${item.name}</span>
            </div>
            <div class="quantity">
                <ion-icon name="remove-circle-outline"></ion-icon>&nbsp;
                <span>${item.inCart}</span>&nbsp;
                <ion-icon name="add-circle-outline"></ion-icon>
            </div>
            <div class="item_price"><span>Rs. ${item.price}</span></div>
            <div class="total"><span>Rs. ${item.inCart * item.price}</span></div>
            `
        });

        productContainer.innerHTML += `
        <div class="Totalprice">
        <h4 class="totaltiltle">Cart Total:</h4>
        <h4 class="totalrupee">Rs. ${cartCost}</h4>
        </div>
        <div class="checkout"><button value="Checkout">Checkout</button></div>
        `
    }
}
displayCart();
onLoadCartNumbers();
