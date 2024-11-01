// 模拟商品数据
const products = [
  {
    id: 1,
    name: "梅菜扣肉",
    price: 5.0,
    stock: 10,
    image: "./images/meicaikourou.jpg",
    ingredients: "猪肉、梅干菜、酱油、葱姜蒜、八角等",
    expiry: "冷藏3天，冷冻30天",
    storage: "冷冻保存，食用前解冻并微波加热3分钟",
  },
  {
    id: 2,
    name: "台式卤肉",
    price: 6.5,
    stock: 8,
    image: "./images/taisheluru.jpg",
    ingredients: "猪肉、卤肉粉、酱油、葱姜蒜、八角等",
    expiry: "冷藏3天，冷冻30天",
    storage: "冷冻保存，食用前解冻并微波加热3分钟",
  },
  {
    id: 3,
    name: "毛氏红烧肉",
    price: 7.0,
    stock: 12,
    image: "./images/maoshihongshaorou.jpg",
    ingredients: "猪肉、红烧肉粉、酱油、葱姜蒜、八角等",
    expiry: "冷藏3天，冷冻30天",
    storage: "冷冻保存，食用前解冻并微波加热3分钟",
  },
  {
    id: 4,
    name: "鱼香肉丝",
    price: 6.0,
    stock: 15,
    image: "./images/yuxiangrousi.jpg",
    ingredients: "猪肉、鱼香粉、���油、葱姜蒜、八角等",
    expiry: "冷3天，冷冻30天",
    storage: "冷冻保存，食用前解冻并微波加热3分钟",
  },
  {
    id: 5,
    name: "咖喱鸡肉",
    price: 6.5,
    stock: 10,
    image: "./images/galijirou.jpg",
    ingredients: "鸡肉、咖喱粉、酱油、葱姜蒜、八角等",
    expiry: "冷藏3天，冷冻30天",
    storage: "冷冻保存，食用前解冻并微波加热3分钟",
  },
  {
    id: 6,
    name: "辣子鸡",
    price: 7.5,
    stock: 8,
    image: "./images/laziji.jpg",
    ingredients: "鸡肉、辣子粉、酱油、葱姜蒜、八角等",
    expiry: "冷藏3天，冷冻30天",
    storage: "冷冻保存，食用前解冻并微波加热3分钟",
  },
  // 可以继续添加更多商品...
];

let cart = [];

function renderProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
            <img src="${product.image}" alt="${
      product.name
    }" onclick="showProductDetails(${
      product.id
    })" onerror="this.src='./images/placeholder.jpg'">
            <h3>${product.name}</h3>
            <p class="price">€${product.price.toFixed(2)}</p>
            <p class="stock">剩余 ${product.stock} 份</p>
            <div class="quantity-control">
                <button onclick="changeQuantity(${product.id}, -1)">-</button>
                <input type="number" value="0" min="0" max="${
                  product.stock
                }" id="quantity-${product.id}">
                <button onclick="changeQuantity(${product.id}, 1)">+</button>
            </div>
            <button class="add-to-cart" onclick="addToCart(${
              product.id
            })">加入购物车</button>
        `;
    productList.appendChild(productCard);
  });
}

function changeQuantity(productId, change) {
  const input = document.getElementById(`quantity-${productId}`);
  let newValue = parseInt(input.value) + change;
  newValue = Math.max(
    0,
    Math.min(newValue, products.find((p) => p.id === productId).stock)
  );
  input.value = newValue;
}

function addToCart(productId) {
  const quantity = parseInt(
    document.getElementById(`quantity-${productId}`).value
  );
  if (quantity > 0) {
    const product = products.find((p) => p.id === productId);
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
    };

    const existingItemIndex = cart.findIndex((item) => item.id === productId);
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push(cartItem);
    }

    updateCartTotal();
    // 移除以下行
    // alert("商品已添加到购物车！");

    // 可以添加一些视觉反馈，比如更新购物车图标或显示一个小提示
    // 例如：
    // showCartNotification();
  }
}

function updateCartTotal() {
  let total = 0;
  for (const item of cart) {
    total += item.price * item.quantity;
  }
  document.getElementById("cart-total").textContent = `总计: €${total.toFixed(
    2
  )}`;
}

function goToConfirmation() {
  if (cart.length > 0) {
    localStorage.setItem("cartData", JSON.stringify(cart));
    window.location.href = "confirmation.html";
  } else {
    alert("购物车为空，请先添加商品！");
  }
}

// 删除或注释掉这个事件监听器
// document.getElementById("checkout-btn").addEventListener("click", () => {
//   alert("跳转到确认订单页面");
// });

// 新增：显示商品详情的函数
function showProductDetails(productId) {
  const product = products.find((p) => p.id === productId);
  const modal = document.getElementById("product-modal");
  const modalImage = document.getElementById("modal-image");
  const modalTitle = document.getElementById("modal-title");
  const modalIngredients = document.getElementById("modal-ingredients");
  const modalExpiry = document.getElementById("modal-expiry");
  const modalStorage = document.getElementById("modal-storage");

  modalImage.src = product.image;
  modalImage.alt = product.name;
  modalTitle.textContent = product.name;
  modalIngredients.textContent = `配料：${product.ingredients}`;
  modalExpiry.textContent = `保质期：${product.expiry}`;
  modalStorage.textContent = `储存建议：${product.storage}`;

  modal.style.display = "block";
}

// 新增：关闭模态框的函数
function closeModal() {
  const modal = document.getElementById("product-modal");
  modal.style.display = "none";
}

// 新增：点击模态框外部关��模态框
window.onclick = function (event) {
  const modal = document.getElementById("product-modal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// 新增：为关闭按钮添加事件监听器
document.querySelector(".close").addEventListener("click", closeModal);

// 新增：为 Esc 键添加事件监听器
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});

// 初始化页面
renderProducts();

// 可以添加一个新的函数来提供视觉反馈
function showCartNotification() {
  const notification = document.createElement("div");
  notification.textContent = "已添加到购物车";
  notification.style.position = "fixed";
  notification.style.bottom = "20px";
  notification.style.right = "20px";
  notification.style.backgroundColor = "#4CAF50";
  notification.style.color = "white";
  notification.style.padding = "10px";
  notification.style.borderRadius = "5px";
  notification.style.opacity = "0";
  notification.style.transition = "opacity 0.5s";

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = "1";
  }, 100);

  setTimeout(() => {
    notification.style.opacity = "0";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 2000);
}
