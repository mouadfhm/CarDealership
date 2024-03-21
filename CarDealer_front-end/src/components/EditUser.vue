<template>
  <div>
    <v-img
      class="mx-auto my-6"
      max-width="228"
      src="C:\Users\fahim\OneDrive\Documents\laravel\CarDealer_front-end\src\assets\logo-white.svg"
    ></v-img>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-h6 mb-6">Modify User</div>

      <v-text-field
        dense
        label="Matricule"
        prepend-inner-icon="mdi-account-outline"
        v-model="matricule"
      ></v-text-field>

      <v-text-field
        dense
        label="Email"
        prepend-inner-icon="mdi-email-outline"
        v-model="email"
      ></v-text-field>

      <v-text-field
        dense
        label="First Name"
        prepend-inner-icon="mdi-account-outline"
        v-model="firstname"
      ></v-text-field>

      <v-text-field
        dense
        label="Last Name"
        prepend-inner-icon="mdi-account-outline"
        v-model="lastname"
      ></v-text-field>

      <v-text-field
        dense
        label="Fonction"
        prepend-inner-icon="mdi-account-hard-hat-outline"
        v-model="fonction"
      ></v-text-field>

      <v-btn
        class="mt-8"
        color="primary"
        block
        @click="handleModification"
      >
        Update User
      </v-btn>
    </v-card>

    <v-snackbar
      v-model="snackbar"
      color="success"
      top
    >
      {{ feedbackMessage }}
      <v-btn
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import auth from '@/services/auth';

export default {
  data() {
    return {
      matricule: '',
      email: '',
      firstname: '',
      lastname: '',
      fonction: '',
      feedbackMessage: '',
      snackbar: false,
    };
  },
  methods: {
    handleModification() {
      const user = {
        id: this.$route.params.id,
        matricule: this.matricule,
        email: this.email,
        firstname: this.firstname,
        lastname: this.lastname,
        fonction: this.fonction
      };
      auth.modifyUser(user)
        .then(response => {
          this.feedbackMessage = 'User modified successfully.';
          this.snackbar = true;
          console.log(response.data);
        })
        .catch(error => {
          this.feedbackMessage = 'Failed to modify user. Please try again.';
          this.snackbar = true;
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
.text-h6 {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
</style>
