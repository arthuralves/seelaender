<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md6 lg5 xl4>
      <v-card>
        <v-toolbar dark color="blue darken-3">
          <v-toolbar-title> Acesso ao Sistema </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-text-field
            v-model="email"
            autofocus
            color="accent"
            label="Email"
            required
          >
          </v-text-field>
          <v-text-field
            v-model="password"
            type="password"
            color="accent"
            label="Password"
            required
          >
          </v-text-field>
          <v-flex class="red--text" v-if="errorM">
            {{ errorM }}
          </v-flex>
        </v-card-text>
        <v-card-actions class="px-3 pb-3">
          <v-flex text-xs-right>
            <v-btn @click="ingresar()" color="primary">Acessar</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      errorM: null,
    };
  },
  methods: {
    ingresar() {
      axios
        .post("usuarios/login", { email: this.email, password: this.password })
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          this.$store.dispatch("guardarToken", data.tokenReturn);
          this.$store.dispatch("guardarUsuario", data.user);
          this.$router.push({ name: "home" });
        })
        .catch((error) => {
          console.log(error);
          this.errorM = null;
          if (error.response.status == 404) {
            this.errorM = "Não existe o usuário ou a senha está incorreta.";
          } else {
            this.errorM = "Ocorreu um erro no servidor.";
          }
        });
    },
  },
};
</script>