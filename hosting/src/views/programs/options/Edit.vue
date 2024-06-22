<template>
  <v-container class="my-4">
    <v-row v-if="program.length !== 0" class="pt-10">
      <v-col cols="12">
        <v-card class="mx-auto pa-4 pb-2 mb-4 rounded-lg" max-width="500">
          <v-row>
            <v-col cols="12" class="pl-10 pt-10">
              <h1>Editar Programa</h1>
            </v-col>
          </v-row>
          <ProgramForm
            action="update"
            :program-selected="program"
          ></ProgramForm>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
import ProgramForm from "@/views/programs/forms/Program.vue";
export default {
  name: "ProgramEdit",
  data() {
    return { program: [] };
  },
  components: {
    ProgramForm,
  },
  created() {
    this.getProgramById();
  },
  destroyed() {
    this.program = null;
  },
  methods: {
    async getProgramById() {
      try {
        const id = this.$route.params.id;

        const response = await axios.get(
          `http://localhost:3000/programs/${id}`
        );

        this.program = response.data.doc;
      } catch (error) {
        console.error("Error fetching program by ID:", error);
      }
    },
  },
};
</script>
