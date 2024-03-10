<template>
  <aside>
    <header>
      <img alt="logo" class="logo" src="@/assets/logo.svg" />
    </header>
    <nav>
      <RouterLink :to="{ name: 'tasks' }">Рассылки</RouterLink>
      <RouterLink :to="{ name: 'clients' }">Клиенты</RouterLink>
      <RouterLink :to="{ name: 'analytics' }">Аналитика</RouterLink>
    </nav>
  </aside>
  <section>
    <header>
      <span>d.orlov777@gmail.com</span>
      <IconLogout />
    </header>
    <RouterView />
  </section>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import IconLogout from './components/icons/IconLogout.vue'
</script>

<style scoped>
aside {
  box-shadow: 0px 4px 3px 0px #e5e5e5;
  background-color: #f6f8fa;
  padding: 2em;
}

section {
  padding: 2em;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  margin-bottom: 3rem;
}

header span {
  font-size: 1em;
  font-weight: 700;
  text-align: left;
}

.logo {
  width: 100%;
  max-width: 200px;
  display: block;
}

nav {
  width: 100%;
  font-size: 1em;
  text-align: left;
}

nav a.router-link-exact-active {
  background-color: #fff;
  box-shadow: 0px 2px 1px 0px #00000005;
}

nav a.router-link-exact-active:hover {
  background-color: #fff;
}

nav a {
  display: block;
  padding: 0 1rem;
  border-radius: 1em;
  margin-top: 0.5em;
}

nav a:first-of-type {
  border: 0;
}

/* 



@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
