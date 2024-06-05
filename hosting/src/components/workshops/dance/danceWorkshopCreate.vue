<template>
  <div>
    <h1>Create a New Dance Workshop</h1>
    <form @submit.prevent="createDance">
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" />
      </div>
      <div>
        <label for="details">Details:</label>
        <input type="text" v-model="details" id="details" />
      </div>
      <div>
        <label for="date">Date:</label>
        <input type="date" v-model="date" id="date" />
      </div>
      <div>
        <label for="time">Time:</label>
        <input type="time" v-model="time" id="time" />
      </div>
      <div>
        <label for="time_end">End Time:</label>
        <input type="time" v-model="time_end" id="time_end" />
      </div>
      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      details: "",
      date: "",
      time: "",
      time_end: "",
    };
  },
  methods: {
    createDance() {
      fetch("http://localhost:3000/api/workshops/dance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.name,
          details: this.details,
          date: this.date,
          time: this.time,
          time_end: this.time_end,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Clear the form
          this.name = "";
          this.details = "";
          this.date = "";
          this.time = "";
          this.time_end = "";
        });
    },
  },
};
</script>
