const products = [
  {
    id: 1,
    name: 'Gaming Laptop',
    price: 1500,
    image: 'https://via.placeholder.com/150',
    categories: ['Laptops', 'Gaming'],
  },
  {
    id: 2,
    name: 'Wireless Mouse',
    price: 50,
    image: 'https://via.placeholder.com/150',
    categories: ['Accessories', 'Peripherals'],
  },
  {
    id: 3,
    name: 'Mechanical Keyboard',
    price: 100,
    image: 'https://via.placeholder.com/150',
    categories: ['Accessories', 'Peripherals'],
  },
  {
    id: 4,
    name: 'External Hard Drive',
    price: 120,
    image: 'https://via.placeholder.com/150',
    categories: ['Storage', 'Accessories'],
  },
  {
    id: 5,
    name: 'Graphics Card',
    price: 500,
    image: 'https://via.placeholder.com/150',
    categories: ['Components', 'Gaming'],
  },
  {
    id: 6,
    name: 'Portable SSD',
    price: 200,
    image: 'https://via.placeholder.com/150',
    categories: ['Storage', 'Accessories'],
  },
  {
    id: 7,
    name: 'Gaming Monitor',
    price: 300,
    image: 'https://via.placeholder.com/150',
    categories: ['Monitors', 'Gaming'],
  },
  {
    id: 8,
    name: 'All-in-One Printer',
    price: 150,
    image: 'https://via.placeholder.com/150',
    categories: ['Peripherals', 'Printers'],
  },
];
const CART_KEY= 'e-commerce-cart';

const productGrid = document.getElementById('product-grid');
const cartMessage = document.getElementById('cart-message');
const cartItemList = document.getElementById('cart-items');
const cartItemsPrice = document.getElementById('total-price');
const checkoutButton = document.getElementById('checkout-btn');

const saveCartItemsToLocalStorage =() =>{
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
const getCartItemsFromLocalStorage = () => { 
  const  cartData= localStorage.getItem(CART_KEY);
  if(!cartData){
    return [];
  }
  return JSON.parse(cartData); 
}

let cart = getCartItemsFromLocalStorage();

function getProductGrid(productArray) {
  productArray.forEach((productCard) => {
    const cardDiv = getproductCard(productCard);
    productGrid.appendChild(cardDiv);
  });
}
function findItemIndex(cart, productCard) {
  return cart.findIndex((cartItem) => {
    if (cartItem.id === productCard.id) {
      return true;
    }
    return false;
  });
}
function addItemsToCart(productCard) {
  const cartItemIndex = findItemIndex(cart, productCard);

  // cart.findIndex((cartItem)=>{
  //     if(cartItem.id===productCard.id){
  //         return true;
  //     }
  //     return false;
  // })
  if (cartItemIndex === -1) {
    cart.push({ ...productCard, quantity: 1 });
  } else {
    cart[cartItemIndex].quantity++;
  }
}
function getProductImage(productImage, productName) {
  const productImageComponent = document.createElement('img');
  productImageComponent.className = 'text-gray-700';
  productImageComponent.src = productImage;
  productImageComponent.alt = productName;
  productImageComponent.className = 'w-full';
  return productImageComponent;
}

function getProductTitle(productName) {
  const productTitleComponent = document.createElement('h3');
  productTitleComponent.className = 'text-lg font-semibold';
  productTitleComponent.innerText = productName;
  return productTitleComponent;
}

function getProductPrice(productPrice) {
  const productPriceComponent = document.createElement('p');
  productPriceComponent.className = 'text-gray-700';
  productPriceComponent.innerText = `$${productPrice}`;
  return productPriceComponent;
}
function getAddToProductButton(productCard) {
  const addToCartButton = document.createElement('button');
  addToCartButton.className =
    'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2';
  addToCartButton.innerText = 'Add to Cart';
  addToCartButton.addEventListener('click', () => {
    addItemsToCart(productCard);
    renderCart(cart);
  });
  return addToCartButton;
}

function getproductCard(productCard) {
  const cardDiv = document.createElement('div');
  cardDiv.className = 'bg-white rounded p-4 shadow';
  const productImageComponent = getProductImage(productCard.image);
  const productTitleComponent = getProductTitle(productCard.name);
  const productPriceComponent = getProductPrice(productCard.price);
  const addToCartButton = getAddToProductButton(productCard);

  cardDiv.append(
    productImageComponent,
    productTitleComponent,
    productPriceComponent,
    addToCartButton
  );
  return cardDiv;
}
function addRemoveCartbutton(cart, cartItem) {
  const cartItemIndex = findItemIndex(cart, cartItem);
  if (cartItemIndex !== -1) {
    cart.splice(cartItemIndex, 1);
    saveCartItemsToLocalStorage();//had to add it despite adding it to rendercart function.
    //  It is better approach that everything explicitly other than putting it in render cart function for all
    renderCart(cart);
  }
}
function getRemoveCartItem(cartItem) {
  const cartQuantityControlDiv = document.createElement('div');
  cartQuantityControlDiv.className = ' flex gap-4 justify-items-end';
  const quantityControls = document.createElement('div');
  quantityControls.className =
    ' flex items-center justify-center gap-2';

    const decreaseCartButton = document.createElement('button');
    decreaseCartButton.innerText = ' - ';
    decreaseCartButton.className =
      'text-xl w-[25px] h-[25px] bg-gray-500 text-white hover:bg-gray-800 rounded';
    decreaseCartButton.addEventListener('click', () => {
      if (cartItem.quantity > 1) {
        cartItem.quantity--;
        renderCart(cart);
      }
    });

    const quantityCartButton = document.createElement('p');
    quantityCartButton.innerText = cartItem.quantity;

  const increaseCartButton = document.createElement('button');
  increaseCartButton.innerText = ' + ';
  increaseCartButton.className =
    'w-[25px] h-[25px] bg-gray-500 text-white hover:bg-gray-800 rounded';
  increaseCartButton.addEventListener('click', () => {
    cartItem.quantity++;
    renderCart(cart);
  });

  quantityControls.append(
    decreaseCartButton,
    quantityCartButton,
    increaseCartButton,
  );
  const removeCartButton = document.createElement('button');
  removeCartButton.innerText = 'Remove';
  removeCartButton.className = 'hover:text-red-600';
  removeCartButton.addEventListener('click', () =>
    addRemoveCartbutton(cart, cartItem)
  );
  cartQuantityControlDiv.append(quantityControls, removeCartButton);

  return cartQuantityControlDiv;
}
function renderCart(cartArray) {
  cartItemList.innerText = '';

  if (cartArray.length === 0) {
    cartMessage.innerText = 'Your Cart is empty';
    cartItemsPrice.innerText = '';
    return;
  }
  else{
    cartMessage.innerText = '';
    cartArray.forEach((cartItem) => {
      const cartItems = document.createElement('li');
      cartItems.className = 'p-4 flex flex-col items-center gap-2 rounded-md bg-gray-200 mb-4';
      
      const cartImage = document.createElement('img');
      cartImage.src = cartItem.image;
      cartImage.alt = cartItem.name;
      cartImage.className = 'w-16 h-16'
      
      const cartItemsDetails = document.createElement('p');
      cartItemsDetails.innerText = `${cartItem.name} - $${cartItem.price}`;
      cartItems.append(cartImage, cartItemsDetails);
      cartItemList.appendChild(cartItems);
      const cartQuantityControlDiv = getRemoveCartItem(cartItem);
      cartItems.appendChild( cartQuantityControlDiv);
    });
  }
  const totalPrice = cartArray.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.price * currentItem.quantity;
  }, 0);

  cartItemsPrice.innerText = `Total Price: $${totalPrice}`;
  saveCartItemsToLocalStorage(cart);

  // if (cart.length > 0) {
  //   cartItemsPrice.innerText = `Total Price: $${totalPrice}`;
  // } else {
  //   cartItemsPrice.innerText = 'Cart is empty';
  // }
}

getProductGrid(products);
renderCart(cart);

/**const cartItemIndex = findItemIndex(cart);
  if (findItemIndex > -1) {
    cartItemsPrice.innerText = `Total Price: $${totalPrice}`;
  }**/