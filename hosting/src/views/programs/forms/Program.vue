<template>
  <v-form ref="formProgram" lazy-validation>
    <v-row class="pa-10">
      <v-col cols="6">
        <v-text-field
          v-model="name"
          :rules="requiredRules"
          label="Nombre"
          placeholder=" "
          variant="outlined"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="topic"
          :rules="requiredRules"
          label="Tópico"
          placeholder=" "
          variant="outlined"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="pr-10 pb-10">
      <v-col class="d-flex justify-end">
        <v-btn @click="onSave" color="#ffc832"> Guardar </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
<script>
import axios from "axios";

export default {
  name: "ProgramForm",
  props: {
    action: {
      type: String,
      default: "create",
    },
  },
  data() {
    return {
      name: "",
      topic: "",
      requiredRules: [(v) => !!v || "Este campo es obligatorio"],
    };
  },
  methods: {
    async onSave() {
      try {
        if (!this.$refs.formProgram.validate()) return;

        const data = {
          name: this.name,
          topic: this.topic,
        };

        await this.saveProgram(data);

        this.$router.replace({ name: "Programs" });
      } catch (error) {
        error.message || "Ocurrió un problema al guardar la información";
      }
    },
    async saveProgram(data) {
      try {
        const response = await axios.post(
          "http://localhost:3000/programs",
          data
        );

        return response.data;
      } catch (error) {
        throw new Error(
          error.response ? error.response.data.message : error.message
        );
      }
    },
  },
};
</script>
