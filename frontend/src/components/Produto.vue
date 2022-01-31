<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Produtos</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          class="text-xs-center"
          v-model="search"
          append-icon="search"
          label="Filtro"
          single-line
          hide-details
        ></v-text-field>
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
                    <v-text-field v-model="codigo" label="Código">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-select
                      v-model="categoria"
                      :items="categorias"
                      label="Categoría"
                    >
                    </v-select>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="nombre" label="Nombre">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field type="number" v-model="stock" label="Stock">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field v-model="precio_venta" label="precio_venta">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="descripcion" label="Descripción">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12 v-show="valida">
                    <div
                      class="red--text"
                      v-for="v in validaMensaje"
                      :key="v"
                      v-text="v"
                    ></div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" flat @click="salvar">salvar</v-btn>
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
              Você deseja <span v-if="adAccion == 1">ativar </span>
              <span v-if="adAccion == 2">desativar </span> o item
              {{ adNombre }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                @click="activarDesactivarCerrar()"
                color="green darken-1"
                flat="flat"
              >
                Cancelar
              </v-btn>
              <v-btn
                v-if="adAccion == 1"
                @click="activar()"
                color="orange darken-4"
                flat="flat"
              >
                Ativar
              </v-btn>
              <v-btn
                v-if="adAccion == 2"
                @click="desactivar()"
                color="orange darken-4"
                flat="flat"
              >
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
              <v-btn
                @click="fecharModalDel()"
                color="green darken-1"
                flat="flat"
              >
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
      <v-data-table
        :headers="headers"
        :items="produtos"
        :search="search"
        class="elevation-1"
      >
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
          <td>{{ moment(props.item.data_lancamento).format("DD/MM/YYYY") }}</td>
          <td>{{ props.item.estilo }}</td>
          <td>{{ props.item.categoria.nome }}</td>

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
          <v-btn color="primary" @click="listar()">Recarregar</v-btn>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      dialog: false,
      search: "",
      produtos: [],
      categorias: [],
      headers: [
        {
          text: "Opções",
          value: "opcoes",
          sortable: false,
          class: "justify-center",
        },
        { text: "Nome", value: "nome", sortable: true },
        { text: "Dt.Lançamento", value: "data_lancamento", sortable: false },
        { text: "Estilo", value: "estilo", sortable: false },
        { text: "Categoria", value: "categoria.nome", sortable: false },
        { text: "Ativo", value: "ativo", sortable: false },
      ],
      editedIndex: -1,
      _id: "",
      nome: "",
      descricao: "",
      valida: 0,
      validaMensaje: [],
      adModal: 0,
      adModalDel: 0,
      adAccion: 0,
      adNombre: "",
      adId: "",
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Novo registro" : "Editar registro";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  created() {
    this.listar();
    this.selectCategoria();
  },
  methods: {
    listar() {
      let me = this;
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get("produto/list", configuracion)
        .then(function (response) {
          me.produtos = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    limpiar() {
      this._id = "";
      this.nome = "";
      this.descricao = "";
      this.valida = 0;
      this.validaMensaje = [];
      this.editedIndex = -1;
    },
    validar() {
      this.valida = 0;
      this.validaMensaje = [];
      if (this.nome.length < 1 || this.nome.length > 50) {
        this.validaMensaje.push(
          "O nome da categoria deve ter entre 1-50 caractéres."
        );
      }
      if (this.descricao.length > 255) {
        this.validaMensaje.push(
          "A descricao da categoria não deve ter mais de 255 caractéres."
        );
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
            "produtos/update",
            {
              _id: this._id,
              nome: this.nome,
              descricao: this.descricao,
            },
            configuracion
          )
          .then(function (response) {
            me.limpiar();
            me.close();
            me.listar();
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        //Código para salvar
        axios
          .post(
            "produto/add",
            {
              nome: this.nome,
              descricao: this.descricao,
              data_lancamento: this.data_lancamento,
              categoria: this.categoria,
              estilo: this.estilo,
              precos_custo: {
                ml350: this.precos_custo_ml350,
                ml473: this.precos_custo_ml473,
                litro: this.precos_custo_litro,
              },
              precos_venda: {
                ml350: this.precos_venda_ml350,
                ml473: this.precos_venda_ml473,
                litro: this.precos_venda_litro,
              },
            },
            configuracion
          )
          .then(function (response) {
            me.limpiar();
            me.close();
            me.listar();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    editItem(item) {
      this._id = item._id;
      this.nome = item.nome;
      this.descricao = item.descricao;
      this.dialog = true;
      this.editedIndex = 1;
    },
    activarDesactivarMostrar(accion, item) {
      this.adModal = 1;
      this.adNombre = item.nome;
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
    exibirModalDel(item) {
      this.adModalDel = 1;
      this.adId = item._id;
    },
    fecharModalDel() {
      this.adModalDel = 0;
    },
    activar() {
      let me = this;
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .put("produto/activate", { _id: this.adId }, configuracion)
        .then(function (response) {
          me.adModal = 0;
          me.adAccion = 0;
          me.adNombre = "";
          me.adId = "";
          me.listar();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    desactivar() {
      let me = this;
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .put("produto/deactivate", { _id: this.adId }, configuracion)
        .then(function (response) {
          me.adModal = 0;
          me.adAccion = 0;
          me.adNombre = "";
          me.adId = "";
          me.listar();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deletar() {
      let me = this;
      axios
        .post("produto/remove", { _id: me.adId })
        .then(function (response) {
          me.adModalDel = 0;
          me.adId = "";
          me.listar();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    selectCategoria() {
      let me = this;
      let categoriaArray = [];
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get("categoria/list", configuracion)
        .then(function (response) {
          categoriaArray = response.data;
          categoriaArray.map(function (x) {
            me.categorias.push({ text: x.nome, value: x._id });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    close() {
      this.dialog = false;
    },
  },
};
</script>
