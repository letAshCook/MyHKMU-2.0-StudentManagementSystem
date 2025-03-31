<template>
    <div class="student-profile">
      <!-- Header -->
      <header class="dashboard-header">
        <h1>Profile Information</h1>
      </header>
  
      <!-- Profile Section -->
      <div class="profile-section">
        <div class="profile-details">
          <!-- Editable Fields -->
          <div class="detail-item">
            <label>Name:</label>
            <p>{{ profile.name }}</p>
          </div>
          <div class="detail-item">
            <label>Gender:</label>
            <p>{{ profile.gender }}</p>
          </div>
          <div class="detail-item">
            <label>Nationality:</label>
            <p>{{ profile.nationality }}</p>
          </div>
          <div class="detail-item">
            <label>Date of Birth:</label>
            <p>{{ profile.dob }}</p>
          </div>
          <div class="detail-item">
            <label>Email:</label>
            <input v-if="isEditing" v-model="profile.email" />
            <p v-else>{{ profile.email }}</p>
          </div>
          <div class="detail-item">
            <label>Mobile Phone:</label>
            <input v-if="isEditing" v-model="profile.phone" />
            <p v-else>{{ profile.phone }}</p>
          </div>
          <div class="detail-item">
            <label>Address:</label>
            <input v-if="isEditing" v-model="profile.address" />
            <p v-else>{{ profile.address }}</p>
          </div>
        </div>
  
        <!-- Action Buttons -->
        <div class="action-buttons">
          <button v-if="!isEditing" class="edit-button" @click="startEditing">
            Edit Profile
          </button>
          <button v-if="isEditing" class="save-button" @click="saveProfile">
            Save Changes
          </button>
          <button v-if="isEditing" class="cancel-button" @click="cancelEditing">
            Cancel
          </button>
          <button class="back-button" @click="Back">Back</button>
        </div>
      </div>
    </div>
</template>
  
  <script>
  export default {
    name: "StudentProfile",
    data() {
      return {
        isEditing: false, // Tracks whether the user is editing the profile
        profile: {
          name: "John Doe",
          gender: "Male",
          nationality: "Alien",
          dob: "01-01-1990",
          email: "testing@gmail.com",
          phone: "0000 0000",
          address: "123 Street, City, State, 12345",
        },
        originalProfile: {}, // Stores the original profile data for canceling edits
      };
    },
    methods: {
      startEditing() {
        // Save the original profile data before editing
        this.originalProfile = { ...this.profile };
        this.isEditing = true;
      },
      saveProfile() {
        // Save the changes (you can add API calls or other logic here)
        this.isEditing = false;
        alert("Profile updated successfully!");
      },
      cancelEditing() {
        // Restore the original profile data
        this.profile = { ...this.originalProfile };
        this.isEditing = false;
      },
      Back() {
        this.$router.go(-1); // Go back to the previous page
      },
    },
  };
  </script>
  
<style scoped>
  .student-profile {
    background-color: #f9f9f9;
    height: 100vh;
    padding: 20px;
  }
  
  .dashboard-header {
    background-color: rgb(5, 173, 5);
    color: #fff;
    padding: 20px;
    text-align: center;
    border-radius: 8px 8px 0 0;
  }
  
  .dashboard-header h1 {
    font-size: 24px;
    margin: 0;
    font-weight: 600;
  }
  
  .profile-section {
    background-color: #fff;
    padding: 20px;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
  }
  
  .profile-details {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
  }
  
  .detail-item {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  .detail-item label {
    font-weight: 600;
    color: #555;
    margin-bottom: 5px; /* Add space between label and value */
  }
  
  .detail-item p,
  .detail-item input {
    margin: 0;
    color: #333;
  }
  
  .detail-item input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }
  
  .action-buttons {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }
  
  .edit-button,
  .save-button,
  .cancel-button,
  .back-button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: background-color 0.3s ease;
  }
  
  .edit-button {
    background-color: #007bff;
    color: #fff;
  }
  
  .edit-button:hover {
    background-color: #0056b3;
  }
  
  .save-button {
    background-color: #28a745;
    color: #fff;
  }
  
  .save-button:hover {
    background-color: #218838;
  }
  
  .cancel-button {
    background-color: #dc3545;
    color: #fff;
  }
  
  .cancel-button:hover {
    background-color: #c82333;
  }
  
  .back-button {
    background-color: #6c757d;
    color: #fff;
  }
  
  .back-button:hover {
    background-color: #5a6268;
  }
  
  @media (max-width: 768px) {
    .action-buttons {
      flex-direction: column;
      align-items: flex-end;
    }
  }
  </style>