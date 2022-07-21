<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">404 你所導向的路徑不存在喔~~</h1>
    <h1 v-else>發生了不可預期的錯誤，oh~ no~</h1>
    <nuxt-link to="/">返回首頁</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'blog' // you can set a custom layout for the error page
}
</script>
