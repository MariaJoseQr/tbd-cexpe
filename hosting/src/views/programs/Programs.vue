<template>
  <v-container class="my-4">
    <v-row>
      <v-col cols="12">
        <h1>Programas</h1>
        <p>Bienvenido a la página de Programas!</p>
        <v-divider class="my-4"></v-divider>
      </v-col>

      <v-col cols="10">
        <span>A continuación se listan los programas disponibles:</span>
      </v-col>
      <v-col cols="2" class="d-flex justify-end">
        <v-btn
          :to="{ name: 'RegisterProgram' }"
          color="#ffc832"
          prepend-icon="mdi-plus"
        >
          Agregar
        </v-btn>
      </v-col>

      <v-col v-if="programs.length !== 0" cols="12">
        <v-data-table
          :headers="headers"
          :items="programs"
          height="400"
          item-value="name"
          :header-props="{
            class: 'header-background',
          }"
        ></v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Programs",
  data() {
    return {
      message: "",
      programs: [],
      headers: [
        { title: "Nombre", align: "start", key: "name" },
        { title: "Tópico | Sección", align: "end", key: "topic" },
      ],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.fetchPrograms();
    },
    fetchPrograms() {
      axios.get("http://localhost:3000/programs/").then((response) => {
        this.programs = response.data.docs;
      });
    },
  },
};
</script>

<style>
.header-background {
  background-color: #bc4749;
  color: white;
}
</style>
