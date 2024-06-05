<template>
  <div>
    <h1>Dance Workshops</h1>
    <ul>
      <li v-for="dance in dances" :key="dance.id">{{ dance.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dances: [],
    };
  },
  created() {
    fetch("http://localhost:3000/api/workshops/dances")
      .then((response) => response.json())
      .then((data) => {
        this.dances = data;
      });
  },
};
</script>
