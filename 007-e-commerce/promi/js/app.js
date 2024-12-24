const products = [
  {
    id: 1,
    name: "Gaming Laptop",
    price: 1500,
    image: "./assets/images/product-placeholder.webp",
    categories: ["Laptops", "Gaming"],
  },
  {
    id: 2,
    name: "Wireless Mouse",
    price: 50,
    image: "./assets/images/product-placeholder.webp",
    categories: ["Accessories", "Peripherals"],
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    price: 100,
    image: "./assets/images/product-placeholder.webp",
    categories: ["Accessories", "Peripherals"],
  },
  {
    id: 4,
    name: "External Hard Drive",
    price: 120,
    image: "./assets/images/product-placeholder.webp",
    categories: ["Storage", "Accessories"],
  },
  {
    id: 5,
    name: "Graphics Card",
    price: 500,
    image: "./assets/images/product-placeholder.webp",
    categories: ["Components", "Gaming"],
  },
  {
    id: 6,
    name: "Portable SSD",
    price: 200,
    image: "./assets/images/product-placeholder.webp",
    categories: ["Storage", "Accessories"],
  },
  {
    id: 7,
    name: "Gaming Monitor",
    price: 300,
    image: "./assets/images/product-placeholder.webp",
    categories: ["Monitors", "Gaming"],
  },
  {
    id: 8,
    name: "All-in-One Printer",
    price: 150,
    image: "./assets/images/product-placeholder.webp",
    categories: ["Peripherals", "Printers"],
  },
];

const productGrid = document.getElementById("product-grid");

const renderProducts = (products) => {
  const productCards = products.map((product) => {
    const productCard = getProductCard(product);
    return productCard;
  });

  productGrid.append(...productCards);
};

const getProductNameComponent = (productName) => {
  const productNameComponent = document.createElement("h3");
  productNameComponent.className = "text-lg font-semibold";
  productNameComponent.innerText = productName;
  return productNameComponent;
};
const getProductPriceComponent = (productPrice) => {
  const productPriceComponent = document.createElement("p");
  productPriceComponent.className = "text-grey-700";
  productPriceComponent.innerText = `$${productPrice}`;
  return productPriceComponent;
};
const getProductImageComponent = (product) => {
  const prodcutImageComponent = document.createElement("img");
  prodcutImageComponent.className = "w-full mb-4";
  prodcutImageComponent.src = product.image;
  prodcutImageComponent.alt = product.name;
  return prodcutImageComponent;
};
//add to cart button
const getAddToCartBtn = () => {
  const addToCartBtn = document.createElement("button");
  addToCartBtn.className =
    "bg-blue-500 hover:bg-blue-700 text-white font bold py-2 px-4 rounded mt-2";
  addToCartBtn.innerText = "Add to Cart";

  return addToCartBtn;
};
//Card function
const getProductCard = (product) => {
  const productCard = document.createElement("div");
  productCard.className = "bg-white p-4 rounded shadow";
  const productImageComponent = getProductImageComponent(product);
  const productNameComponent = getProductNameComponent(product.name);
  const productPriceComponent = getProductPriceComponent(product.price);
  const addToCartBtn = getAddToCartBtn();
  productCard.append(
    productImageComponent,
    productNameComponent,
    productPriceComponent,
    addToCartBtn
  );
  return productCard;
};
renderProducts(products);
