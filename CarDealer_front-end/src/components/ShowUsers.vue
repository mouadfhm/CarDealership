<template>
  <v-card class="mx-auto" max-width="800">
    <!-- User cards -->
    <v-card v-for="user in users" :key="user.id" class="mb-4">
      <v-card-title class="text-h6">{{ user.matricule }}</v-card-title>
      <v-card-text class="subtitle-2">
        <div><strong>Name:</strong> {{ user.firstname }} {{ user.lastname }}</div>
        <div><strong>Email:</strong> {{ user.email }}</div>
        <div><strong>Role:</strong> {{ user.fonction }}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn outlined color="primary" @click="editUser(user)">
          <v-icon left>mdi-pencil</v-icon>Edit
        </v-btn>
        <v-btn outlined color="error" @click="confirmDeleteUser(user)">
          <v-icon left>mdi-delete</v-icon>Delete
        </v-btn>
        <v-btn outlined color="info" @click="passwordReset(user)">
          <v-icon left>mdi-lock</v-icon>Reset Password
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- Snackbar for user deletion success -->
    <v-snackbar v-model="snackbar1" color="success" timeout="3000">
      User deleted successfully!
    </v-snackbar>
    <v-snackbar v-model="snackbar2" color="success" timeout="3000">
      password reset successfully!
    </v-snackbar>
  </v-card>

  <!-- Dialog for confirmation before deleting user -->
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title>Confirm Deletion</v-card-title>
      <v-card-text>
        Are you sure you want to delete this user?
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="deleteUserConfirmed">Yes</v-btn>
        <v-btn color="grey" text @click="closeDialog">No</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { showUsers, deleteUser, passwordReset } from '@/services/auth';

export default {
  name: 'Users',
  data() {
    return {
      users: [],
      snackbar1: false,
      snackbar2: false,
      dialog: false,
      userToDelete: null,
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      showUsers()
        .then(response => {
          this.users = response.data.payload;
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    confirmDeleteUser(user) {
      this.userToDelete = user;
      this.dialog = true; // Show deletion confirmation dialog
    },
    deleteUserConfirmed() {
      if (this.userToDelete) {
        deleteUser(this.userToDelete)
          .then(response => {
            this.users = this.users.filter(u => u.id !== this.userToDelete.id);
            this.snackbar1 = true; // Show success message
            console.log('User deleted:', this.userToDelete);
            this.userToDelete = null; // Reset userToDelete
            this.dialog = false; // Close deletion confirmation dialog
          })
          .catch(error => {
            console.error('Error deleting user:', error);
          });
      }
    },
    closeDialog() {
      this.dialog = false; // Close deletion confirmation dialog
    },
    passwordReset(user) {
      passwordReset(user)
        .then(response => {
          console.log('Password reset for user:', user);
          this.snackbar2 = true; // Show success message

        })
        .catch(error => {
          console.error('Error resetting password:', error);
        });
    },
    editUser(user) {
      this.setUser(user);
      this.$router.push('/users/edit/' + user.id);
    },
  },
};
</script>

<style>
.mb-4 {
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.v-card-actions {
  display: flex;
  justify-content: flex-end;
}
</style>
