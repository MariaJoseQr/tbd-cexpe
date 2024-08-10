<template>
  <v-container class="my-4">
    <v-row v-if="category.length !== 0" class="pt-10">
      <v-col cols="12">
        <v-card class="mx-auto pa-4 pb-2 mb-4 rounded-lg" max-width="500">
          <v-row>
            <v-col cols="12" class="pl-10 pt-10">
              <h1>Editar Categoría</h1>
            </v-col>
          </v-row>
          <CategoryForm
            action="update"
            :category-selected="category"
          ></CategoryForm>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
import CategoryForm from "@/views/categories/forms/Category.vue";
export default {
  name: "CategoryEdit",
  data() {
    return { category: [] };
  },
  components: {
    CategoryForm,
  },
  created() {
    this.getCategoryById();
  },
  destroyed() {
    this.category = null;
  },
  methods: {
    async getCategoryById() {
      try {
        const id = this.$route.params.id;

        const response = await axios.get(
          `http://localhost:3000/categories/${id}`
        );

        this.category = response.data.doc;
      } catch (error) {
        console.error("Error fetching category by ID:", error);
      }
    },
  },
};
</script>
