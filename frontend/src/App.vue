<template>
  <v-app id="app">
    <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.mdAndUp" app v-model="drawer">
      <v-list dense>
        <template>
          <v-list-tile :to="{ name: 'home' }">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-title> Inicio </v-list-tile-title>
          </v-list-tile>
        </template>
        <template>
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title> Armazém </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'categoria' }">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title> Categorias </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: '' }">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title> Produtos </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
        <template>
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title> Compras </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: '' }">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title> Entradas </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: '' }">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title> Fornecedores </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
        <template>
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title> Vendas </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: '' }">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title> Vendas </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: '' }">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title> Clientes </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
        <template>
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title> Acessos </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'usuario' }">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Usuarios
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
        <template>
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title> Consultas </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: '' }">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title> Consulta Compras </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: '' }">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title> Consulta Ventas </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="blue darken-3" dark app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Armazém do Teg</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="logout()" icon v-if="logged"> <v-icon>logout</v-icon> Logout </v-btn>
      <v-btn :to="{ name: 'login' }" icon v-else> <v-icon>login</v-icon> Login </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-slide-y-transition mode="out-in">
          <router-view />
        </v-slide-y-transition>
      </v-container>
    </v-content>

    <v-footer dark height="auto">
      <v-layout justify-center>
        <v-flex text-xs-center>
          <v-card flat tile color="primary" class="white--text">
            <v-card-text class="white--text pt-0">
              Made with ❤️ by Arthur Alves &copy;2022
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: true,
    };
  },
  computed: {
    logged() {
      return this.$store.state.usuario;
    },
    isAdministrador() {
      return this.$store.state.usuario && this.$store.state.usuario.role == "Administrador";
    },
    isEstoque() {
      return this.$store.state.usuario && this.$store.state.usuario.role == "Estoque";
    },
    isVendedor() {
      return this.$store.state.usuario && this.$store.state.usuario.role == "Vendedor";
    },
  },
  created() {
    this.$store.dispatch("autoLogin");
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>
