<template>
  <v-app-bar app color="primary">
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-img class="mx-auto my-6" max-width="228"
      src="C:\Users\fahim\OneDrive\Documents\laravel\CarDealer_front-end\src\assets\logo-white.svg"></v-img>

    <v-spacer></v-spacer>

    <!-- Add button to navigate to the home page -->
    <v-btn text @click="navigateToHome">Home</v-btn>

    <!-- Add button to navigate to the page for adding a new user -->
    <v-btn text @click="navigateToAddUser">Add User</v-btn>

    <!-- Add logout button -->
    <v-btn text @click="logout">Logout</v-btn>
  </v-app-bar>
</template>

<script>
import auth from '@/services/auth';

export default {
  name: 'TopMenu',
  methods: {
    logout() {
      auth.logout()
        .then(response => {
          // Handle successful logout
          console.log(response.data);
          this.$router.push('/login');
        })
        .catch(error => {
          // Handle logout error
          console.error(error);
        });
    },
    navigateToHome() {
      this.$router.push('/users'); // Update the path with the actual home page route
    },
    navigateToAddUser() {
      this.$router.push('/users/create'); // Update the path with the actual route for adding a new user
    }
  },
};
</script>

<style>
.v-img {
  max-width: 100%;
  max-height: 100%;
}

.v-app-bar__nav-icon {
  color: white;
}
</style>
