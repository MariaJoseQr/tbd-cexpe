<template>
  <v-container class="my-4">
    <v-row>
      <v-col cols="7">
        <h1>Categorías</h1>
      </v-col>
      <v-col cols="5" class="d-flex justify-end mt-1">
        <v-btn
          :to="{ name: 'Programs' }"
          color="grey-lighten-3"
          prepend-icon="mdi-arrow-left"
          class="mr-2"
        >
          Ver Programas
        </v-btn>
        <v-btn
          :to="{ name: 'RegisterCategory' }"
          color="secondary"
          prepend-icon="mdi-plus"
        >
          Agregar
        </v-btn>
      </v-col>
      <v-col cols="12"><v-divider /></v-col>
      <v-col v-if="categories.length !== 0" cols="12">
        <v-data-table
          :headers="headers"
          :items="categories"
          height="400"
          item-value="name"
          :header-props="{
            class: 'header-background',
          }"
        >
          <template #item.active="{ item }">
            {{ item.active ? "Activo" : "Inactivo" }}
          </template>
          <template #item.actions="{ item }">
            <div>
              <v-tooltip>
                <template v-slot:activator="{ props }">
                  <v-btn
                    :to="{ name: 'EditCategory', params: { id: item._id } }"
                    v-bind="props"
                    icon
                    class="no-bg"
                  >
                    <v-icon icon="mdi-pencil" />
                  </v-btn>
                </template>
                <span>Editar categoría</span>
              </v-tooltip>
            </div>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Categories",
  data() {
    return {
      message: "",
      categories: [],
      category: {},
      headers: [
        { title: "Nombre", align: "start", key: "name" },
        { title: "Estado", align: "center", key: "active" },
        { title: "Acción", align: "end", key: "actions" },
      ],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.fetchCategories();
    },
    fetchCategories() {
      axios.get("http://localhost:3000/categories/").then((response) => {
        this.categories = response.data.docs;
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
.no-bg {
  background-color: transparent !important;
  box-shadow: none !important;
  border: none !important;
}
.no-bg:hover {
  background-color: transparent !important;
}
.no-bg:focus {
  background-color: transparent !important;
}
.no-bg:active {
  background-color: transparent !important;
}
</style>
