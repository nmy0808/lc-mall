import Vue from 'vue'
// 获取购物车数量
function getCartCount() {
  return Vue.prototype.axios.get("/carts/products/sum");
}
// 获取用户信息
function getUserInfo() {
  return Vue.prototype.axios.get("/user");
}
// 获取产品detail
function getDetailById(id) {
  return Vue.prototype.axios.get("/products/" + id);
}
// 添加到购物车
function addCart(productId) {
  return Vue.prototype.axios.post("/carts", {
    productId,
    selected: true
  });
}
// 获取购物车列表
function getCart() {
  return Vue.prototype.axios.get("/carts");
}
// 移除购物车某个产品
function removeCart(productId) {
  return Vue.prototype.axios.delete("/carts/" + productId);
}
// 更新购物车某个产品数量
function updateCart(productId, quantity ,selectedState=true) {
  return Vue.prototype.axios.put("/carts/" + productId, {
    quantity,
    selected: selectedState
  });
}
// 购物车全选中
function selectAll() {
  return Vue.prototype.axios.put("/carts/selectAll");
}
// 购物车全不选中
function unSelectAll() {
  return Vue.prototype.axios.put("/carts/unSelectAll");
}
export {
  getCartCount, getUserInfo, getDetailById, addCart, getCart, removeCart, updateCart, selectAll, unSelectAll,
}