import Vue from "vue";
import Router from "vue-router";
import store from "./store";
import Home from "./views/Home.vue";
import Categoria from "./components/Categoria.vue";
import Login from "./components/Login.vue";
import Usuario from "./components/Usuario.vue";
import Produto from "./components/Produto.vue";

Vue.use(Router);

var router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        administrador: true,
        estoque: true,
        vendedor: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        libre: true,
      },
    },
    {
      path: "/categoria",
      name: "categoria",
      component: Categoria,
      meta: {
        administrador: true,
        estoque: true,
      },
    },
    {
      path: "/usuario",
      name: "usuario",
      component: Usuario,
      meta: {
        administrador: true,
      },
    },
    {
      path: "/produto",
      name: "produto",
      component: Produto,
      meta: {
        administrador: true,
      },
    }
  ],
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.libre)) {
    next();
  }
  //  else if (store.state.usuario) {
  //   console.log('entrooo')
  //   console.log(store.state.usuario.role)
  //   next()
  // }
  else if (store.state.usuario && store.state.usuario.role == "Administrador") {
    if (to.matched.some((record) => record.meta.administrador)) {
      next();
    }
  } else if (store.state.usuario && store.state.usuario.role == "Vendedor") {
    if (to.matched.some((record) => record.meta.vendedor)) {
      next();
    }
  } else if (store.state.usuario && store.state.usuario.role == "Estoque") {
    if (to.matched.some((record) => record.meta.estoque)) {
      next();
    }
  } else {
    console.log(store.state.usuario);
    next({ name: "login" });
  }
});
export default router;
