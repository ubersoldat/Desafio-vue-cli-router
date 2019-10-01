<template>
  <section>
    <Navbar />
    <v-container grid-list-md text-xs-center>
      <v-flex >
        <v-form id="form" @submit.prevent="enviarFormulario">
          <h2>Datos del usuario</h2>
          <v-text-field
            v-model="autor"
            :error-messages="errorAutor"
            placeholder="Ingresa Nombre del usuario"
            label="Usuario"
          />
          <v-textarea
            v-model="descripcion"
            :error-messages="errorComentario"
            :rules="rules"
            placeholder="Ingresa Email de usuario"
            label="Email"
            rows="2"
            maxlength="100"
            counter="100"
          />
          <v-btn dark type="submit" form="form" @click="snackbar = true">Agregar!</v-btn>
        </v-form>
      </v-flex>
      <v-flex > 
        <h2>Usuarios</h2>
        <v-card v-for="(c, index) in comentarios" :key="index" class="mb-5" min-width="400px">
          <v-card-title>
            Nombre: {{ c.autor }}
            <v-spacer />
            <v-btn fab color="red" dark small @click="eliminarComentario(index)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>Descripcion: {{ c.descripcion }}</v-card-text>
          <v-snackbar
            v-model="snackbar"
            :top="y === 'top'"
            :vertical="mode === 'vertical'"
            :color="color"
          >
            <v-list-item-title>Se ha creado un nuevo producto</v-list-item-title>
            <v-list-item-subtitle>{{  }}</v-list-item-subtitle>
            <v-list-item-subtitle>Nombre: {{ c.autor }}</v-list-item-subtitle>
            <v-list-item-subtitle>Descripcion: {{ c.descripcion }}</v-list-item-subtitle>
            <v-btn color="black" text @click="snackbar = false">Close</v-btn>
          </v-snackbar>
        </v-card>
      </v-flex>
    </v-container>
  </section>
</template>

<script>
import Navbar from "../components/Navbar.vue";
export default {
  components: {
    Navbar
  },
  data() {
    return {
      comentarios: [],
      autor: "",
      descripcion: "",
      errorAutor: "",
      errorComentario: "",
      rules: [v => v.length < 100 || "Máximo 100 caracteres"],
      y: "top",
      mode: "vertical",
      color: "green",
      snackbar: false
    };
  },
  methods: {
    enviarFormulario() {
      let validar = true;
      if (this.autor === "") {
        this.errorAutor = "El Autor es requerido";
        validar = false;
      } else {
        this.errorAutor = "";
      }
      if (this.descripcion === "") {
        this.errorComentario = "El comentario es requerido";
        validar = false;
      } else {
        this.errorComentario = "";
      }
      if (validar) {
        this.comentarios.push({
          autor: this.autor,
          descripcion: this.descripcion
        });
        this.autor = "";
        this.descripcion = "";
        this.errorAutor = "";
        this.errorComentario = "";
      }
    },
    eliminarComentario(index) {
      let msg = confirm("¿Estas seguro de eliminar este comentario?");
      if (msg) {
        this.comentarios.splice(index, 1);
      }
    }
  }
};
</script>