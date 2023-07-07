// cart

let cartIcon=document.querySelector('#cart_icon');
let cart = document.querySelector('.cart');
let close_cart=document.querySelector('#close_cart');

// open cart
cartIcon.onclick = () => {
    cart.classList.add('active');

}
// close cart

close_cart.onclick = () => {
    cart.classList.remove('active');

}

// cart working js

if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded' , ready);
}else{
    ready();
}
// making function

function ready(){
    // remove items from cart
    let removeCartButtons = document.getElementsByClassName('cart_remove');
    console.log(removeCartButtons);
    for(var i=0; i<removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem)
    }

    // quantity change

    var quantityInputs = document.getElementsByClassName('cart_quantity');
    for(var i=0; i<quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener('change', quantitychanged);

    }

    var addCart=document.getElementsByClassName('add-cart');
    for(var i=0; i<addCart.length; i++){
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);

    }

    // buy button

    document.getElementsByClassName('btn_buy')[0].addEventListener('click', buyButtonClicked);
}

// buy button 
function buyButtonClicked(){
    alert('your order is placed');
    var cartContent = document.getElementsByClassName('cart_content')[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    upDateTotal();
}

// remove items from cart
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    upDateTotal();
}
// quantity change
function quantitychanged(event){
    var input = event.target;
    if(isNaN(input.value ) || input.value <=0 ){
        input.value=1;
    }
    upDateTotal();
}

// add to cart

function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product_title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var product_images = shopProducts.getElementsByClassName('product_images')[0].src;
    addProductToCart(title, price, product_images);
    upDateTotal();


}



function  addProductToCart(title, price, product_images){
    var cartShopBox=document.createElement('div');
    cartShopBox.classList.add('cart_box');
    var cartItems = document.getElementsByClassName('cart_content')[0];
    var cartItemNames=cartItems.getElementsByClassName('cart_product_title');

    for(var i=0; i<cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title){
            alert('you have already add this item to cart ');
            return;
        }
        
       
    }

    var cartBoxContent=`
<img src="${ product_images}" alt="" class="cart_img">
<div class="details_box">
   <div class="cart_product_title">${title}</div>
   <div class="cart_price">${price}</div>
   <input type="number" name="" value="1" class="cart_quantity">
</div>
<i class='bx bxs-trash-alt  cart_remove' ></i>

`;





cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName('cart_remove')[0].addEventListener('click', removeCartItem);
cartShopBox.getElementsByClassName('cart_quantity')[0].addEventListener('change', quantitychanged);
}

// update total
function upDateTotal(){
    var cartContent=document.getElementsByClassName('cart_content')[0];
    var cartBoxes = document.getElementsByClassName('cart_box');
    var total = 0;
    for(var i=0; i<cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart_price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart_quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('$',''));
        var quantity = quantityElement.value ;
        total = total + (price * quantity);
    }
        // if price contain some cents value
           total=Math.round(total*100)/100;
           
        document.getElementsByClassName('total_price')[0].innerText = '$'+total;

  
}