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
          color="secondary"
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
        >
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
      dialogDeleteProgram: false,
      headers: [
        { title: "Nombre", align: "start", key: "name" },
        { title: "Tópico | Sección", align: "center", key: "topic" },
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
    },
    fetchPrograms() {
      axios.get("http://localhost:3000/programs/").then((response) => {
        this.programs = response.data.docs;
      });
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
