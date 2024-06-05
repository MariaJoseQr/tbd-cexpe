<template>
  <v-container class="my-4">
    <div>
      <h1>Talleres</h1>
      <p>Bienvenido a la página de Talleres!</p>
      <v-btn
        :to="{ name: 'DanceList' }"
        color="grey"
        density="default"
        class="mr-2"
      >
        Ver Talleres de Danza
      </v-btn>
      <v-btn
        :to="{ name: 'CreateDance' }"
        color="grey"
        density="default"
        class="mr-2"
      >
        Crear Taller de Danza
      </v-btn>
      <router-view></router-view>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Workshops",
};
</script>
