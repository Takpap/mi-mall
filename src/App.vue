<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  mounted() {
    this.getUser();
    this.getCartCount();
  },
  methods: {
    getUser() {
      this.axios.get("/user").then((res = {}) => {
        this.$store.dispatch("saveUsername", res.data.username);
      });
    },
    getCartCount() {
      this.axios.get("/carts/products/sum").then((res = {}) => {
        this.$store.dispatch("saveCartCount", res.data);
      });
    },
  },
};
</script>

<style lang="scss">
@import "./../public/scss/reset.scss";
@import "./../public/scss/config.scss";
@import "./../public/scss/button.scss";
</style>
