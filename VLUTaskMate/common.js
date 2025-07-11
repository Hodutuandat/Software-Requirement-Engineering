// common.js

// --- Common Modal Functions ---
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
    }
}

// --- Utility Functions ---
function formatDate(dateString) {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

function getStatusText(status) {
    switch (status) {
        case 'pending': return 'Đang chờ';
        case 'in-progress': return 'Đang tiến hành';
        case 'completed': return 'Hoàn thành';
        default: return '';
    }
}

// --- Notification Bell Logic ---
document.addEventListener('DOMContentLoaded', function() {
    const notificationIcon = document.getElementById('notificationIcon');
    const notificationBadge = document.getElementById('notificationBadge');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const noNotificationsMessage = notificationDropdown ? notificationDropdown.querySelector('.no-notifications') : null;

    if (!notificationIcon || !notificationDropdown) {
        // If notification elements are not present (e.g., on login pages),
        // then this script should not run for notifications.
        return;
    }

    let notificationItems = Array.from(notificationDropdown.querySelectorAll('.notification-item'));
    let notificationCount = notificationItems.length;
    
    function updateNotificationBadge() {
        if (notificationCount > 0) {
            notificationBadge.textContent = notificationCount;
            notificationBadge.style.display = 'block';
            if (noNotificationsMessage) noNotificationsMessage.style.display = 'none';
        } else {
            notificationBadge.style.display = 'none';
            if (noNotificationsMessage) noNotificationsMessage.style.display = 'block';
        }
    }
    updateNotificationBadge();

    notificationIcon.addEventListener('click', function(event) {
        event.stopPropagation();
        notificationDropdown.classList.toggle('active');
        if (notificationDropdown.classList.contains('active')) {
            notificationBadge.style.display = 'none'; 
            notificationCount = 0; // Reset count when dropdown is opened
        } else {
            updateNotificationBadge(); 
        }
    });

    notificationItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault(); 
            const type = item.dataset.type;
            const taskId = item.dataset.taskId;
            const projectId = item.dataset.projectId;

            notificationDropdown.classList.remove('active');

            if (type === 'task') {
                window.location.href = `task_detail.html?taskId=${taskId}`;
            } else if (type === 'invite') {
                window.location.href = `project-detail.html?projectId=${projectId}&invite=true`; 
            } else if (type === 'project_deadline' || type === 'feedback') {
                window.location.href = `project-detail.html?projectId=${projectId}`;
            }
        });
    });

    window.addEventListener('click', function(event) {
        const notificationIcon = document.getElementById("notificationIcon");
        const notificationDropdown = document.getElementById("notificationDropdown");
        if (notificationIcon && notificationDropdown) { // Check if elements exist
            if (event.target !== notificationIcon && !notificationDropdown.contains(event.target)) {
                notificationDropdown.classList.remove("active");
            }
        }
    });

    // Dummy function for adding new notification (for demonstration)
    // function addNotification(message, type, id) {
    //     const newItem = document.createElement('a'); 
    //     newItem.className = 'notification-item';
    //     newItem.innerHTML = message;
    //     newItem.href = '#';

    //     newItem.dataset.type = type;
    //     if (type === 'task') {
    //         newItem.dataset.taskId = id;
    //     } else if (type === 'invite' || type === 'project_deadline' || type === 'feedback') {
    //         newItem.dataset.projectId = id;
    //     }

    //     newItem.addEventListener('click', function(event) {
    //         event.preventDefault();
    //         const clickedType = newItem.dataset.type;
    //         const clickedTaskId = newItem.dataset.taskId;
    //         const clickedProjectId = newItem.dataset.projectId;

    //         notificationDropdown.classList.remove('active');

    //         if (clickedType === 'task') {
    //             window.location.href = `task_detail.html?taskId=${clickedTaskId}`;
    //         } else if (clickedType === 'invite') {
    //             window.location.href = `project-detail.html?projectId=${clickedProjectId}&invite=true`;
    //         } else if (clickedType === 'project_deadline' || clickedType === 'feedback') {
    //             window.location.href = `project-detail.html?projectId=${clickedProjectId}`;
    //         }
    //     });

    //     if (notificationDropdown) {
    //         notificationDropdown.prepend(newItem);
    //         notificationItems = Array.from(notificationDropdown.querySelectorAll('.notification-item'));
    //         notificationCount = notificationItems.length;
    //         updateNotificationBadge();
    //     }
    // }
});