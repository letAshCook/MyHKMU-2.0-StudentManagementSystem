
<template>
  <div class="student-dashboard">
    <!-- Header -->
    <header class="dashboard-header">
      <div class="header-left">
        <img src="../../assets/images/HKMU.jpg" alt="HKMU Logo" class="HKMU-logo" />
        <h1>{{ translations.welcome }}</h1>
      </div>
      <div class="header-right">
        <div class="language-dropdown">
          <button @click="toggleLanguageDropdown" class="language-button">
            {{ selectedLanguage.toUpperCase() }}
          </button>
          <div v-if="showLanguageDropdown" class="dropdown-content">
            <div @click="changeLanguage('en')">English</div>
            <div @click="changeLanguage('zh-CN')">Chinese (Simplified)</div>
            <div @click="changeLanguage('zh-TW')">Chinese (Traditional)</div>
          </div>
        </div>
        <button @click="Email" class="email-button">{{ translations.email }}</button>
        <button @click="Profile" class="profile-button">{{ translations.profile }}</button>
        <button @click="logout" class="logout-button">{{ translations.logout }}</button>
      </div>
    </header>

    <!-- Main Content -->
    <div class="dashboard-content">
      <!-- Combined Section: Courses, Assignments, and Announcements -->
      <section class="combined-section">
        <!-- Courses Section -->
        <div class="courses-section">
          <h2>{{ translations.yourCourses }}</h2>
          <ul class="course-list">
            <li v-for="course in courses" :key="course.id" class="course-item" @click="handleCourseClick(course)">
              <h3>{{ course.name }}</h3>
              <p>{{ translations.instructor }}: {{ course.instructor }}</p>
              <p>{{ translations.courseCode }}: {{ course.code }}</p>
              <p>{{ translations.term }}: {{ course.term }}</p>
            </li>
          </ul>
        </div>

        <!-- Assignments Section -->
        <div class="assignments-section">
          <h2>{{ translations.assignments }}</h2>
          <table class="assignments-table">
            <thead>
              <tr>
                <th>{{ translations.course }}</th>
                <th>{{ translations.assignment }}</th>
                <th>{{ translations.dueDate }}</th>
                <th>{{ translations.status }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="assignment in assignments" :key="assignment.id">
                <td>{{ assignment.course }}</td>
                <td>{{ assignment.name }}</td>
                <td>{{ assignment.dueDate }}</td>
                <td :class="assignment.status === 'Submitted' ? 'status-submitted' : 'status-pending'">
                  {{ assignment.status === 'Submitted' ? translations.submitted : translations.pending }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Announcements Section -->
        <div class="announcements-section">
          <h2>{{ translations.announcements }}</h2>
          <ul class="announcement-list">
            <li v-for="announcement in announcements" :key="announcement.id" class="announcement-item">
              <h3>{{ announcement.title }}</h3>
              <p>{{ announcement.content }}</p>
              <small>{{ announcement.date }}</small>
            </li>
          </ul>
        </div>
      </section>

      <!-- Combined Section: Upcoming Classes and Calendar -->
      <section class="combined-section">
        <!-- Upcoming Classes Section -->
        <div class="upcoming-classes-section">
          <h2>{{ translations.upcomingClasses }}</h2>
          <ul class="upcoming-class-list">
            <li v-for="upcoming in upcomingClasses" :key="upcoming.id" class="upcoming-class-item">
              <h3>{{ upcoming.course }}</h3>
              <p>{{ translations.date }}: {{ upcoming.date }}</p>
              <p>{{ translations.time }}: {{ upcoming.time }}</p>
              <p>{{ translations.room }}: {{ upcoming.room }}</p>
            </li>
          </ul>
        </div>

        <!-- Calendar Section -->
        <div class="calendar-section">
          <h2>{{ translations.calendar }}</h2>
          <div class="calendar">
            <div class="calendar-header">
              <button @click="prevMonth">&#10094;</button>
              <span>{{ currentMonth }} {{ currentYear }}</span>
              <button @click="nextMonth">&#10095;</button>
            </div>
            <div class="calendar-grid">
              <div class="calendar-day" 
                   v-for="day in daysInMonth" 
                   :key="day" 
                   :class="{ 'current-date': isCurrentDate(day) }">
                <span class="day-number">{{ day }}</span>
                <div v-if="hasDeadline(day)" class="deadline-marker">
                  {{ translations.deadline }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentDashboard",
  data() {
    return {
      // Sample data for courses, assignments, and announcements
      courses: [
        { id: 1, name: "Introduction to Computer Science", instructor: "Dr. Smith", code: "COMPS 351", term: "2025 spring"},
        { id: 2, name: "Web Development", instructor: "Prof. Johnson", code: "COMPS 352", term: "2025 spring"},
        { id: 3, name: "Data Structures", instructor: "Dr. Lee", code: "COMPS 353", term: "2025 spring" },
        { id: 4, name: "S", instructor: "Dr. Nuidi", code: "COMPS 354", term: "2025 spring"},
        { id: 5, name: "So", instructor: "Dr. Nuidi", code: "COMPS 354", term: "2025 spring"},
        { id: 6, name: "Sof", instructor: "Dr. Nuidi", code: "COMPS 354", term: "2025 spring"},  
      ],
      assignments: [
        { id: 1, course: "Introduction to Computer Science", name: "Algorithms", dueDate: "10-3-2025", status: "Submitted" },
        { id: 2, course: "Web Development", name: "HTML/CSS", dueDate: "15-3-2025", status: "Pending" },
        { id: 3, course: "Data Structures", name: "Linked Lists", dueDate: "20-3-2025", status: "Pending" },
        { id: 4, course: "Software Development Project", name: "Project Proposal", dueDate: "25-3-2025", status: "Submitted" },
      ],
      announcements: [
        { id: 1, title: "Midterm Exam Schedule", content: "The midterm exam will be held on November 15th.", date: "23-10-2025" },
        { id: 2, title: "Assignment Submission", content: "Submit your assignment by November 10th.", date: "20-10-2025" },
        { id: 3, title: "Holiday Notice", content: "The university will be closed on November 23rd for Thanksgiving.", date: "02-10-2025" },
      ],
      upcomingClasses: [
        { id: 1, course: "Introduction to Computer Science", date: "01-01-2025", time: "8:00 AM - 10:00 AM", room: "D311"},
        { id: 2, course: "Web Development", date: "01-01-2025", time: "8:00 AM - 10:00 AM", room: "D311"},
        { id: 3, course: "Data Structures", date: "01-01-2025", time: "8:00 AM - 10:00 AM", room: "D311"},
        { id: 4, course: "Software Development Project", date: "01-01-2025", time: "8:00 AM - 10:00 AM", room: "D311"},
      ],
      currentDate: new Date(),
      selectedLanguage: "en", // Default language
      showLanguageDropdown: false, // Toggle dropdown visibility
      translations: this.getTranslations("en"), // Default translations
    };
  },
  computed: {
    currentMonth() {
      return this.currentDate.toLocaleString('default', { month: 'long' });
    },
    currentYear() {
      return this.currentDate.getFullYear();
    },
    daysInMonth() {
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();
      const days = new Date(year, month + 1, 0).getDate();
      return Array.from({ length: days }, (_, i) => i + 1);
    },
    currentDay() {
      return this.currentDate.getDate();
    },
  },
  methods: {
    handleCourseClick(course) {
      console.log(`Course clicked: ${course.name}`);
    },
    toggleLanguageDropdown() {
      this.showLanguageDropdown = !this.showLanguageDropdown;
    },
    changeLanguage(language) {
      this.selectedLanguage = language;
      this.translations = this.getTranslations(language);
      this.showLanguageDropdown = false; // Hide dropdown after selection
    },
    getTranslations(language) {
      const translations = {
        en: {
          welcome: "Welcome, Student name",
          email: "Email",
          profile: "Profile",
          logout: "Logout",
          yourCourses: "Your Courses",
          instructor: "Instructor",
          courseCode: "Course Code",
          term: "Term",
          assignments: "Assignments",
          course: "Course",
          assignment: "Assignment",
          dueDate: "Due Date",
          status: "Status",
          submitted: "Submitted",
          pending: "Pending",
          announcements: "Announcements",
          upcomingClasses: "Upcoming Classes",
          date: "Date",
          time: "Time",
          room: "Room",
          calendar: "Calendar",
          deadline: "Deadline",
        },
        "zh-CN": {
          welcome: "欢迎, 学生姓名",
          email: "电子邮件",
          profile: "个人资料",
          logout: "登出",
          yourCourses: "您的课程",
          instructor: "讲师",
          courseCode: "课程代码",
          term: "学期",
          assignments: "作业",
          course: "课程",
          assignment: "作业",
          dueDate: "截止日期",
          status: "状态",
          submitted: "已提交",
          pending: "待处理",
          announcements: "公告",
          upcomingClasses: "即将到来的课程",
          date: "日期",
          time: "时间",
          room: "房间",
          calendar: "日历",
          deadline: "截止日期",
        },
        "zh-TW": {
          welcome: "歡迎, 學生姓名",
          email: "電子郵件",
          profile: "個人資料",
          logout: "登出",
          yourCourses: "您的課程",
          instructor: "講師",
          courseCode: "課程代碼",
          term: "學期",
          assignments: "作業",
          course: "課程",
          assignment: "作業",
          dueDate: "截止日期",
          status: "狀態",
          submitted: "已提交",
          pending: "待處理",
          announcements: "公告",
          upcomingClasses: "即將到來的課程",
          date: "日期",
          time: "時間",
          room: "房間",
          calendar: "日曆",
          deadline: "截止日期",
        },
      };
      return translations[language] || translations.en; // Fallback to English if language not found
    },
    logout() {
      // Clear user data and redirect to login page
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_role");
      this.$router.push("/");
    },
    Email() {
      window.open("https://student.intranet.hkmu.edu.hk/hkmu_o365/index.html?r=0", "_blank");
    },
    Profile() {
      this.$router.push("/student-profile");
    },
    prevMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    },
    nextMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    },
    hasDeadline(day) {
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth() + 1; // Months are 0-indexed in JavaScript
      const date = `${day}-${month}-${year}`; // Remove zero-padding

      return this.assignments.some(assignment => {
        // Extract the date part from the dueDate (ignore the time)
        const dueDate = assignment.dueDate.split(' ')[0]; // Split by space and take the first part
        // Check if the due date matches AND the status is "Pending"
        return dueDate === date && assignment.status === "Pending";
      });
    },
    isCurrentDate(day) {
      // Check if the day matches the current day of the month
      return day === this.currentDay && 
             this.currentDate.getMonth() === new Date().getMonth() && 
             this.currentDate.getFullYear() === new Date().getFullYear();
    },
  },
};
</script>

<style scoped>
.student-dashboard {
  padding: 2px;
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px 20px; 
  background-color: #ffffff; 
  color: white; 
}

.header-left {
  display: flex; 
  align-items: center;
}

.dashboard-logo { 
  height: auto; 
}

.header-right {
  display: flex; 
  gap: 10px; 
}

@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    gap: 10px;
  }
}

.dashboard-header h1 {
  font-size: 1.5rem;
  color: #333;
}

.logout-button {
  padding: 8px 16px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #c82333;
}

.dashboard-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.combined-section h2 {
  color: rgb(95, 205, 219); 
}
.combined-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

@media (max-width: 768px) {
  .dashboard-content {
    grid-template-columns: 1fr;
  }

  .combined-section {
    grid-template-columns: 1fr;
  }
}

/* Scrollable Sections */
.courses-section,
.assignments-section,
.announcements-section,
.upcoming-classes-section {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 700px; 
  overflow-y: auto; 
  padding-right: 10px; 
}

.assignments-section {
  overflow-x: auto;
}

.assignments-table {
  width: 100%;
  min-width: 600px;
  border-collapse: collapse;
}

.assignments-table thead {
  position: sticky;
  top: 0;
  background-color: #f1f1f1;
  z-index: 1;
}

.assignments-table th,
.assignments-table td {
  padding: 12px 15px; 
  text-align: left; 
  border-bottom: 1px solid #e0e0e0; 
}

.assignments-table th {
  background-color: #f1f1f1; 
  color: #333; 
  font-weight: bold; 
}

h2 {
  font-size: 1.25rem;
  color: #555;
  margin-bottom: 15px;
  top: 0;
  background-color: white;
  padding-bottom: 10px;
  z-index: 1;
}

@media (max-width: 768px) {
  h2 {
    font-size: 1rem;
  }
}

.course-list,
.announcement-list,
.upcoming-class-list {
  list-style: none;
  padding: 0;
}

.announcement-item,
.upcoming-class-item {
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.course-item{
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

.course-item:hover {
  background-color: #f5f5f5;
}

.course-item h3,
.announcement-item h3,
.upcoming-class-item h3 {
  font-size: 1.125rem;
  color: #333;
  margin-bottom: 5px;
}

.course-item p,
.announcement-item p,
.upcoming-class-item p {
  font-size: 0.875rem;
  color: #666;
  margin: 5px 0;
}

.announcement-item small {
  font-size: 0.75rem;
  color: #999;
}

.status-submitted {
  color: green;
}

.status-pending {
  color: red;
}

.upcoming-class-list {
  list-style: none;
  padding: 0;
}

.calendar-section {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.calendar {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
}

.calendar-header button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

@media (max-width: 768px) {
  .calendar-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 480px) {
  .calendar-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.calendar-day {
  background-color: rgb(255, 255, 255);
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  border: 1px solid transparent; 
  border-color: rgba(0, 0, 0, 0.1);
}

.current-date {
  border: 2px solid lightblue; 
}

.day-number {
  font-size: 1rem;
  font-weight: bold;
}

.deadline-marker {
  background-color: #ffcccc;
  color: #cc0000;
  font-size: 0.75rem;
  padding: 2px 5px;
  border-radius: 3px;
  margin-top: 5px;
}

.language-button {
  padding: 8px 16px;
  border: 1px solid rgb(49, 49, 49);
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.email-button,
.profile-button {
  cursor: pointer;
}

.language-button:hover {
  background-color: #f5f5f59f;
}

.language-dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  position: absolute;
  background-color: #f9f9f9c9;
  min-width: 160px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 4px;
  overflow: hidden;
}

.dropdown-content div {
  padding: 12px 16px;
  cursor: pointer;
  color: #333;
}

.dropdown-content div:hover {
  background-color: #f1f1f1;
}

/* Custom scrollbar styling */
.courses-section::-webkit-scrollbar,
.assignments-section::-webkit-scrollbar,
.announcements-section::-webkit-scrollbar,
.upcoming-classes-section::-webkit-scrollbar {
  width: 8px;
}

.courses-section::-webkit-scrollbar-track,
.assignments-section::-webkit-scrollbar-track,
.announcements-section::-webkit-scrollbar-track,
.upcoming-classes-section::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.courses-section::-webkit-scrollbar-thumb,
.assignments-section::-webkit-scrollbar-thumb,
.announcements-section::-webkit-scrollbar-thumb,
.upcoming-classes-section::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.courses-section::-webkit-scrollbar-thumb:hover,
.assignments-section::-webkit-scrollbar-thumb:hover,
.announcements-section::-webkit-scrollbar-thumb:hover,
.upcoming-classes-section::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
