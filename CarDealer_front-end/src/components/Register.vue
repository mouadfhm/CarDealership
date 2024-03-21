<template>
  <div>
    <v-img class="mx-auto my-6" max-width="228"
      src="C:\Users\fahim\OneDrive\Documents\laravel\CarDealer_front-end\src\assets\logo-white.svg"></v-img>

    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <div class="text-subtitle-1 text-medium-emphasis">Create New User</div>

      <v-text-field dense label="Matricule" prepend-inner-icon="mdi-account-outline" v-model="matricule"></v-text-field>

      <v-text-field dense label="Email" prepend-inner-icon="mdi-email-outline" v-model="email"></v-text-field>

      <v-text-field dense label="First Name" prepend-inner-icon="mdi-account-outline"
        v-model="firstname"></v-text-field>

      <v-text-field dense label="Last Name" prepend-inner-icon="mdi-account-outline" v-model="lastname"></v-text-field>

      <v-text-field dense label="Fonction" prepend-inner-icon="mdi-account-hard-hat-outline"
        v-model="fonction"></v-text-field>

      <v-btn class="mt-8" color="primary" block @click="handleRegister">
        Register
      </v-btn>
    </v-card>

    <v-snackbar v-model="snackbar" :color="snackbarColor" multi-line timeout="3000">
      {{ snackbarMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import auth from '@/services/auth';

export default {
  name: 'Register',
  data() {
    return {
      matricule: '',
      email: '',
      firstname: '',
      lastname: '',
      fonction: '',
      snackbar: false,
      snackbarMessage: '',
      snackbarColor: '',
    };
  },
  methods: {
    handleRegister() {
      const user = {
        matricule: this.matricule,
        email: this.email,
        firstname: this.firstname,
        lastname: this.lastname,
        fonction: this.fonction
      };
      auth.register(user)
        .then(response => {
          this.snackbarMessage = 'User registered successfully!';
          this.snackbarColor = 'success';
          this.snackbar = true;
        })
        .catch(error => {
          this.snackbarMessage = 'Error registering user. Please try again.';
          this.snackbarColor = 'error';
          this.snackbar = true;
          console.error('Error registering user:', error);
        });
    },
  },
};
</script>

<style scoped>
.text-subtitle-1 {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
</style>
