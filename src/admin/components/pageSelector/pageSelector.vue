<template>
  <nav class="pageSelector-component">
    <div class="container pageSelector-container">
      <ul class="pageSelector-list">
        <li :class="['pageSelector-item', {active: link.active}]" v-for="link in links" :key="link.id">
          <a :href="`/${link.alias}`" class="pageSelector-link">{{link.title}}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
const links = [
  {id: 0, title: "About", alias: "about", active: true},
  {id: 1, title: "Projects", alias: "projects", active: false},
  {id: 2, title: "Reviews", alias: "reviews", active: false}
];

export default {
  data() {
    return {
      links
    }
  },
}
</script>
<style lang="postcss" scoped src="./pageSelector.pcss">
  
</style>