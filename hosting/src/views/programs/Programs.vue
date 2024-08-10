<template>
  <v-container class="my-4">
    <v-row>
      <v-col cols="10">
        <h1>Programas</h1>
        <p>Bienvenido a la página de Programas!</p>
      </v-col>
      <v-col cols="2" class="d-flex justify-end mt-4">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
          </template>

          <v-list>
            <v-list-item :to="{ name: 'Categories' }">
              <v-list-item-title>Categorías</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
      <v-col cols="12">
        <v-divider />
      </v-col>
      <v-col cols="10">
        <v-select
          v-model="selectedCategory"
          :items="categories"
          item-title="name"
          item-value="_id"
          label="Categoría"
        ></v-select>
      </v-col>
      <v-col cols="2" class="d-flex justify-end pt-6">
        <v-btn
          :to="{ name: 'RegisterProgram' }"
          color="secondary"
          prepend-icon="mdi-plus"
        >
          Agregar
        </v-btn>
      </v-col>
      <v-col
        v-if="filteredPrograms.length !== 0"
        v-for="n in filteredPrograms"
        :key="n._id"
        class="d-flex child-flex"
        cols="4"
      >
        <v-chip
          class="ma-2 pa-2"
          label
          :color="n.category ? (n.category.active ? 'green' : 'red') : 'grey'"
          size="medium"
          style="
            position: absolute;
            z-index: 1;
            background-color: white;
            justify-content: center;
          "
        >
          {{ n.category ? n.category.name : "Sin categoría" }}
        </v-chip>

        <v-img
          v-if="n.image"
          :src="n.image"
          aspect-ratio="1"
          class="bg-grey-lighten-3"
          cover
        >
          <template v-slot:placeholder>
            <v-row align="center" class="fill-height ma-0" justify="center">
              <v-progress-circular
                color="grey-lighten-5"
                indeterminate
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
      <v-col cols="12">
        <v-divider />
      </v-col>
      <v-col v-if="filteredPrograms.length !== 0" cols="12">
        <v-data-table
          :headers="headers"
          :items="filteredPrograms"
          height="400"
          item-value="name"
          :header-props="{
            class: 'header-background',
          }"
        >
          <template #item.category="{ item }">
            {{ item.category ? item.category.name : "Sin categoría" }}
          </template>
          <template #item.actions="{ item }">
            <div>
              <v-tooltip>
                <template v-slot:activator="{ props }">
                  <v-btn
                    :to="{ name: 'EditProgram', params: { id: item._id } }"
                    v-bind="props"
                    icon
                    class="no-bg"
                  >
                    <v-icon icon="mdi-pencil" />
                  </v-btn>
                </template>
                <span>Editar programa</span>
              </v-tooltip>
              <v-tooltip>
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    icon
                    class="no-bg"
                    @click="onOpenModalDelete(item)"
                    ><v-icon color="critical">mdi-delete-outline</v-icon></v-btn
                  >
                </template>
                <span>Eliminar programa</span>
              </v-tooltip>
            </div>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>

  <DeleteProgramModal
    v-if="dialogDeleteProgram"
    :dialog="dialogDeleteProgram"
    @update:dialog="dialogDeleteProgram = $event"
    @programDeleted="onProgramDeleted"
    :program="program"
  />
</template>

<script>
import axios from "axios";
import DeleteProgramModal from "@/views/programs/modals/Delete.vue";

export default {
  name: "Programs",
  components: { DeleteProgramModal },
  data() {
    return {
      message: "",
      programs: [],
      program: {},
      categories: [],
      selectedCategory: null,
      filteredPrograms: [],
      dialogDeleteProgram: false,
      headers: [
        { title: "Nombre", align: "start", key: "name" },
        { title: "Tópico | Sección", align: "center", key: "topic" },
        { title: "Categoría", align: "center", key: "category" },
        { title: "Acción", align: "end", key: "actions" },
      ],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.fetchPrograms();
      this.fetchCategories();
    },
    async fetchPrograms() {
      try {
        const response = await axios.get("http://localhost:3000/programs/");
        this.programs = await Promise.all(
          response.data.docs.map(async (program) => {
            if (program.categoryId) {
              const category = await this.getCategoryById(program.categoryId);
              program.category = category;
            }
            return program;
          })
        );

        this.filterPrograms();
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    },
    fetchCategories() {
      axios.get("http://localhost:3000/categories/").then((response) => {
        this.categories = [{ _id: null, name: "Todos" }, ...response.data.docs];
      });
    },
    filterPrograms() {
      if (this.selectedCategory) {
        this.filteredPrograms = this.programs.filter(
          (program) => program.categoryId === this.selectedCategory
        );
      } else {
        this.filteredPrograms = this.programs;
      }
    },
    onOpenModalDelete(program) {
      this.program = program;
      this.dialogDeleteProgram = true;
    },
    onProgramDeleted(deletedProgramId) {
      this.programs = this.programs.filter(
        (program) => program._id !== deletedProgramId
      );
    },
    async getCategoryById(id) {
      try {
        const response = await axios.get(
          `http://localhost:3000/categories/${id}`
        );
        return response.data.doc;
      } catch (error) {
        console.error("Error fetching category by ID:", error);
      }
    },
  },
  watch: {
    selectedCategory() {
      this.filterPrograms();
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
