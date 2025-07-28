// Dashboard tab switching and dynamic content for student
const navLinks = document.querySelectorAll('.nav-link');
const headerTitle = document.getElementById('headerTitle');
const pageContent = document.getElementById('pageContent');

const pages = {
  projects: `<div class='page-card'><h2>Projects</h2><p>Quản lý các dự án nhóm trong và ngoài lớp học. Tạo mới, xem tiến độ, phân công leader/member.</p></div>`,
  tasks: `<div class='page-card'><h2>Tasks</h2><p>Quản lý task theo Kanban board. Kéo thả, cập nhật trạng thái, deadline.</p></div>`,
  teams: `<div class='page-card'><h2>Teams</h2><p>Xem các nhóm bạn đang tham gia, mời thành viên, xem vai trò leader/member.</p></div>`,
  profile: `<div class='page-card'><h2>Profile</h2><p>Xem điểm mạnh/yếu, lịch sử đánh giá từ các dự án đã tham gia. Hồ sơ cá nhân sinh viên VLU.</p></div>`
};

function switchTab(tab) {
  navLinks.forEach(link => link.classList.remove('active'));
  document.querySelector(`.nav-link[data-page="${tab}"]`).classList.add('active');
  headerTitle.textContent = tab.charAt(0).toUpperCase() + tab.slice(1);
  pageContent.innerHTML = pages[tab];
}

navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const tab = this.getAttribute('data-page');
    switchTab(tab);
  });
});

// Default tab
switchTab('projects'); 