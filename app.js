const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const header = $(".header");
const banner = $(".banner");
const btnBannerLeft = $(".banner-arrow__left");
const btnBannerRight = $(".banner-arrow__right");
const btnCloseCart = $(".btn-close-cart");
const cartIcon = $(".cart-icon");
const overlay = $(".overlay");
const addToCartBtn = $$(".btn-addToCart");

// Open Cart
function openCart() {
  cartIcon.onclick = function () {
    overlay.classList.add("open");
  };
  btnCloseCart.onclick = function () {
    overlay.classList.remove("open");
  };
}
openCart();

// scroll header
function handleBackgroundHeader() {
  const headerHeight = header.offsetHeight;
  window.onscroll = function () {
    if (window.scrollY >= headerHeight || window.pageYOffset >= headerHeight) {
      header.classList.add("bg-white");
    } else {
      header.classList.remove("bg-white");
    }
  };
}
handleBackgroundHeader();

// handle slider
function handleSlider() {
  const slides = [
    "assets/img/banner/slider4.jpg",
    "assets/img/banner/slider5.jpg",
    "assets/img/banner/slider6.jpg",
  ];
  let index = 0;
  btnBannerRight.onclick = function () {
    index++;
    if (index < slides.length) {
      banner.style.background = `url("${slides[index]}") no-repeat center/cover`;
    } else {
      index = 0;
      banner.style.background = `url("${slides[index]}") no-repeat center/cover`;
    }
  };
  btnBannerLeft.onclick = function () {
    index--;
    if (index >= 0) {
      banner.style.background = `url("${slides[index]}")`;
    } else {
      index = slides.length - 1;
      banner.style.background = `url("${slides[index]}")`;
    }
  };
}
handleSlider();

// Add To Cart
addToCartBtn.forEach(function (button, index) {
  button.addEventListener("click", function (e) {
    const btnItem = e.target;
    const product = btnItem.parentElement.parentElement;
    const productImg = product.querySelector("img").src;
    const productName = product.querySelector("p").innerText;
    const productPrice = product.querySelector(".product-price span").innerText;
    addToCart(productImg, productName, productPrice);
    removeFromCart();
    handleProduct();
    amountItem();
  });
});

function addToCart(productImg, productName, productPrice) {
  const addLi = document.createElement("li");
  const liContent = `<li class="cart-item flex justify-between p-6">
  <img
    class="w-[87] h-[87px]"
    src=${productImg}
    alt="/"
  />
  <div class="flex flex-col justify-around py-1">
    <p>${productName}</p>
    <p class="flex justify-between text-[14px]">
    <span>
        <i
        class="btn-decrease text-[12px] hover:text-red-300 cursor-pointer duration-200 fa-solid fa-minus"
        ></i>
        <span class="product-quantity px-3">1</span>
        <i
        class="btn-add-more text-[12px] hover:text-green-600 cursor-pointer duration-200 fa-solid fa-plus"
        ></i>
    </span>
    </p>
    <p class="text-[16px] font-semibold">
        $ <span class="product-price_num">${productPrice}</span>
    </p>
  </div>
  <div class="btn-removeFromCart">
    <i
      class="cursor-pointer hover:text-red-600 duration-200 fa-regular fa-circle-xmark"
    ></i>
  </div>
</li>`;
  addLi.innerHTML = liContent;
  const cartList = document.querySelector(".cart-list");
  cartList.append(addLi);

  totalPrice();
}

// Remove From Cart
function removeFromCart() {
  const cartItem = $$(".cart-item");
  for (var i = 0; i < cartItem.length; i++) {
    const btnRemoveFromCart = $$(".btn-removeFromCart i");
    btnRemoveFromCart[i].addEventListener("click", function (e) {
      const btnRemoveFromCartClicked = e.target;
      const itemDelete = btnRemoveFromCartClicked.parentElement.parentElement;
      itemDelete.remove();
      totalPrice();
    });
  }
}

// Total Price
function totalPrice() {
  const cartItem = $$(".cart-item");
  let totals = 0;

  for (var i = 0; i < cartItem.length; i++) {
    const productQuantity =
      cartItem[i].querySelector(".product-quantity").innerText;
    const productPriceInCart =
      cartItem[i].querySelector(".product-price_num").innerText;
    total = productQuantity * productPriceInCart;
    totals = totals + total;
  }
  const totalPriceInCart = $(".total-price");
  totalPriceInCart.innerHTML = totals;
}

// Increase/Decrease Item
function handleProduct() {
  const cartItem = $$(".cart-item");

  //   Increase Item
  for (let i = 0; i < cartItem.length; i++) {
    const btnIncrease = $$(".btn-add-more");
    const productQuantity = $$(".product-quantity");
    btnIncrease[i].addEventListener("click", (e) => {
      productQuantityClicked = e.target;
      amountProduct = productQuantityClicked.previousElementSibling.innerText;
      const newProductQuantity = Number(amountProduct) + 1;
      productQuantity[i].innerText = newProductQuantity;
      totalPrice();
    });
  }

  // Decrease Item
  for (let i = 0; i < cartItem.length; i++) {
    const btnDecrease = $$(".btn-decrease");
    const productQuantity = $$(".product-quantity");
    btnDecrease[i].addEventListener("click", (e) => {
      productQuantityClicked = e.target;
      amountProduct = productQuantityClicked.nextElementSibling.innerText;
      if (amountProduct > 0) {
        const newProductQuantity = Number(amountProduct) - 1;
        productQuantity[i].innerText = newProductQuantity;
        totalPrice();
      } else if (amountProduct < 0) {
        removeFromCart();
      }
    });
  }
}

// Amount Item

function amountItem() {
  const cartItem = $$(".cart-item");
  const totalCount = $(".cart-quantity");
  totalCount.innerText = cartItem.length;
}
