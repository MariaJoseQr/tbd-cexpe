<template>
  <v-form ref="formCategory">
    <v-row class="pa-10">
      <v-col cols="6">
        <v-text-field
          v-model="name"
          :rules="[(v) => !!v || 'El nombre es obligatorio']"
          label="Nombre"
          placeholder=" "
          variant="outlined"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-switch
          v-model="active"
          :rules="[(v) => !!v || 'El estado es obligatorio']"
          label="Estado"
          class="h-auto"
        ></v-switch>
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
  name: "CategoryForm",
  props: {
    categorySelected: {
      type: Object,
      default: () => ({}),
    },
    action: {
      type: String,
      default: "create",
    },
  },
  data() {
    return {
      name: "",
      active: false,
    };
  },
  created() {
    if (this.action === "update" && this.categorySelected) {
      this.name = this.categorySelected.name;
      this.active = this.categorySelected.active;
    }
  },
  methods: {
    async onSave() {
      try {
        if (!(await this.$refs.formCategory.validate())) return;

        const data = {
          name: this.name,
          active: this.active,
        };

        if (this.action === "create") await this.saveCategory(data);
        else await this.updateCategory({ id: this.categorySelected._id, data });

        this.$router.replace({ name: "Categories" });
      } catch (error) {
        error.message || "Ocurrió un problema al guardar la información";
      }
    },
    async saveCategory(data) {
      try {
        const response = await axios.post(
          "http://localhost:3000/categories",
          data
        );

        return response.data;
      } catch (error) {
        throw new Error(
          error.response ? error.response.data.message : error.message
        );
      }
    },
    async updateCategory({ id, data }) {
      try {
        const response = await axios.patch(
          `http://localhost:3000/categories/${id}`,
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
