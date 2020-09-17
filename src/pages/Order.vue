<template>
  <div>
    <router-view />
    <nav-footer />
  </div>
</template>

<script>
import NavFooter from "./../components/NavFooter";
export default {
  name: "nav-home",
  components: { NavFooter },
};
</script>

<style>
</style>