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
// 获取产品detail
function addCart(productId) {
  return Vue.prototype.axios.post("/carts", {
    productId,
    selected: true
  });
}


export { getCartCount, getUserInfo, getDetailById, addCart }