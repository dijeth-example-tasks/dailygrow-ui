<template>
  <aside>
    <header>
      <RouterLink class="logo" :to="{ name: 'index' }">
        <img alt="logo" src="@/assets/logo.svg" />
      </RouterLink>
    </header>
    <nav>
      <RouterLink :to="{ name: 'tasks' }">Рассылки</RouterLink>
      <RouterLink :to="{ name: 'clients' }">Клиенты</RouterLink>
      <RouterLink :to="{ name: 'analytics' }">Аналитика</RouterLink>
      <RouterLink :to="{ name: 'about' }">О приложении</RouterLink>
    </nav>
  </aside>
  <section>
    <header>
      <span>{{ user }}</span>
      <button class="logout" v-show="isAuthorize()" @click="handleLogout">
        <IconLogout />
      </button>
    </header>
    <RouterView />
  </section>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import IconLogout from './components/icons/IconLogout.vue'
import { isAuthorize, useUser } from './store'
import { logoutService } from './services/authService'

const user = useUser()
const router = useRouter()

const handleLogout = async () => {
  await logoutService()
  router.push({ name: 'index' })
}
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

img {
  width: 100%;
  max-width: 100%;
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

nav a:hover {
  background-color: #fff;
}

.logout {
  display: block;
  border: 0;
  padding: 0;
  background-color: transparent;
  cursor: pointer;
}
</style>
