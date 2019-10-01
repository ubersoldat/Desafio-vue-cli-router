<template>
  <section>
    <Navbar />
    <v-simple-table dark>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">NAME</th>
            <th class="text-left">EMAIL</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in userFilter" :key="index">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </section>
</template>

<script>
import axios from "axios";
import Navbar from "../components/Navbar.vue";
export default {
  components: {
    Navbar
  },
  data() {
    return {
      usuarios: [],
      search: ""
    };
  },
  created() {
    this.getUsuarios();
  },
  computed: {
    userFilter() {
      return this.usuarios.filter(e => {
        return e.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1;
      });
    }
  },
  methods: {
    getUsuarios() {
      axios
        .get("https://jsonplaceholder.typicode.com/users")

        .then(response => {
          this.usuarios = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>