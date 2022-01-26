<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Usuários</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Filtro" single-line hide-details></v-text-field>
        <v-spacer></v-spacer>

        <!-- CARD NOVO -->
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Novo</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md6>
                    <v-text-field v-model="nome" label="Nome"> </v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-select v-model="role" :items="roles" label="Papel"> </v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field v-model="email" label="Email"> </v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field type="password" v-model="password" label="Password"> </v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12 v-show="valida">
                    <div class="red--text" v-for="v in validaMensaje" :key="v" v-text="v"></div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" flat @click="salvar">Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- CARD ATIVA DESATIVA -->
        <v-dialog v-model="adModal" max-width="290">
          <v-card>
            <v-card-title class="headline" v-if="adAccion == 1">
              Ativar Item
            </v-card-title>
            <v-card-title class="headline" v-if="adAccion == 2">
              Desativar Item
            </v-card-title>
            <v-card-text>
              Você deseja <span v-if="adAccion == 1">ativar </span> <span v-if="adAccion == 2">desativar </span> o item
              {{ adNombre }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="activarDesactivarCerrar()" color="green darken-1" flat="flat">
                Cancelar
              </v-btn>
              <v-btn v-if="adAccion == 1" @click="activar()" color="orange darken-4" flat="flat">
                Ativar
              </v-btn>
              <v-btn v-if="adAccion == 2" @click="desactivar()" color="orange darken-4" flat="flat">
                Desativar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- CARD EXCLUSAO -->
        <v-dialog v-model="adModalDel" max-width="290">
          <v-card>
            <v-card-title class="headline"> Excluir item </v-card-title>
            <v-card-text> Deseja excluir esse item? </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="fecharModalDel()" color="green darken-1" flat="flat">
                Cancelar
              </v-btn>
              <v-btn @click="deletar()" color="orange darken-4" flat="flat">
                Excluir
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>

      <!-- DATA TABLE -->
      <v-data-table :headers="headers" :items="usuarios" :search="search" class="elevation-1">
        <template v-slot:items="props">
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">
              edit
            </v-icon>
            <v-icon small class="mr-2" @click="exibirModalDel(props.item)">
              remove
            </v-icon>
            <template v-if="props.item.ativo">
              <v-icon small @click="activarDesactivarMostrar(2, props.item)">
                block
              </v-icon>
            </template>
            <template v-else>
              <v-icon small @click="activarDesactivarMostrar(1, props.item)">
                check
              </v-icon>
            </template>
          </td>
          <td>{{ props.item.nome }}</td>
          <td>{{ props.item.role }}</td>
          <td>{{ props.item.email }}</td>
          <td>
            <div v-if="props.item.ativo">
              <span class="blue--text">Ativo</span>
            </div>
            <div v-else>
              <span class="red--text">Desativado</span>
            </div>
          </td>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="listar()">Resetear</v-btn>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      dialog: false,
      search: "",
      usuarios: [],
      headers: [
        { text: "Opções", value: "opcoes", sortable: false },
        { text: "Nome", value: "nome", sortable: true },
        { text: "Papel", value: "role", sortable: true },
        { text: "Email", value: "email", sortable: false },
        { text: "Ativo", value: "ativo", sortable: false },
      ],
      editedIndex: -1,
      _id: "",
      nombre: "",
      rol: "",
      roles: ["Administrador", "Estoque", "Vendedor"],
      tipo_documento: "",
      documentos: ["DNI", "RUC", "PASAPORTE", "CEDULA"],
      num_documento: "",
      direccion: "",
      telefono: "",
      email: "",
      password: "",
      valida: 0,
      validaMensaje: [],
      adModal: 0,
      adAccion: 0,
      adNombre: "",
      adId: "",
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo registro" : "Editar registro";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  created() {
    this.listar();
  },
  methods: {
    listar() {
      let me = this;
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get("usuarios/list", configuracion)
        .then(function(response) {
          me.usuarios = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    limpiar() {
      this._id = "";
      this.nombre = "";
      this.num_documento = "";
      this.direccion = "";
      this.telefono = "";
      this.email = "";
      this.password = "";
      this.valida = 0;
      this.validaMensaje = [];
      this.editedIndex = -1;
    },
    validar() {
      this.valida = 0;
      this.validaMensaje = [];
      if (!this.role) {
        this.validaMensaje.push("Selecione um papel.");
      }
      if (this.nome.length < 1) {
        this.validaMensaje.push("O nome de usuário deve ter mais de 1 caracter.");
      }
      if (this.email.length < 1) {
        this.validaMensaje.push("O email de usuário deve ter mais de 1 caracter.");
      }
      if (this.password.length < 1 || this.password.length > 64) {
        this.validaMensaje.push("A senha deve ter entre 1-64 caracteres.");
      }
      if (this.validaMensaje.length) {
        this.valida = 1;
      }
      return this.valida;
    },
    salvar() {
      let me = this;
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      if (this.validar()) {
        return;
      }
      if (this.editedIndex > -1) {
        //Código para editar
        axios
          .put(
            "usuarios/update",
            {
              _id: this._id,
              role: this.role,
              nome: this.nome,
              email: this.email,
              password: this.password,
            },
            configuracion
          )
          .then(function(response) {
            me.limpiar();
            me.close();
            me.listar();
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        //Código para guardar
        axios
          .post(
            "usuarios/add",
            {
              role: this.role,
              nome: this.nome,
              email: this.email,
              password: this.password,
            },
            configuracion
          )
          .then(function(response) {
            me.limpiar();
            me.close();
            me.listar();
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    editItem(item) {
      this._id = item._id;
      this.role = item.role;
      this.nome = item.nome;
      this.email = item.email;
      this.password = item.password;
      this.dialog = true;
      this.editedIndex = 1;
    },
    activarDesactivarMostrar(accion, item) {
      this.adModal = 1;
      this.adNombre = item.nombre;
      this.adId = item._id;
      if (accion == 1) {
        this.adAccion = 1;
      } else if (accion == 2) {
        this.adAccion = 2;
      } else {
        this.adModal = 0;
      }
    },
    activarDesactivarCerrar() {
      this.adModal = 0;
    },
    activar() {
      let me = this;
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .put("usuarios/activate", { _id: this.adId }, configuracion)
        .then(function(response) {
          me.adModal = 0;
          me.adAccion = 0;
          me.adNombre = "";
          me.adId = "";
          me.listar();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    desactivar() {
      let me = this;
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .put("usuarios/deactivate", { _id: this.adId }, configuracion)
        .then(function(response) {
          me.adModal = 0;
          me.adAccion = 0;
          me.adNombre = "";
          me.adId = "";
          me.listar();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    close() {
      this.dialog = false;
    },
    exibirModalDel(item) {
      this.adModalDel = 1;
      this.adId = item._id;
    },
    fecharModalDel() {
      this.adModalDel = 0;
    },
  },
};
</script>
