// Initialize tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let taskChart; // Variable to hold the chart instance

// Function to render tasks
function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = `${task.name} - ${task.category} - ${task.completed ? 'Completed' : 'Pending'}`;
        
        // Create a delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(index));
        
        // Append the delete button to the list item
        li.appendChild(deleteButton);
        li.addEventListener('click', () => toggleTask(index));
        taskList.appendChild(li);
    });
    updateChart();
}

// Function to add a task
document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const taskInput = document.getElementById('task-input');
    const categoryInput = document.getElementById('category-input');
    tasks.push({ name: taskInput.value, category: categoryInput.value, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    renderTasks();
});

// Function to toggle task completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1); // Remove the task from the array
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Update localStorage
    renderTasks(); // Re-render the task list
}

// Function to update chart
function updateChart() {
    const completed = tasks.filter(task => task.completed).length;
    const pending = tasks.length - completed;
    const ctx = document.getElementById('taskChart').getContext('2d');

    // Destroy the existing chart if it exists
    if (taskChart) {
        taskChart.destroy();
    }

    // Create a new chart instance
    taskChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Completed', 'Pending'],
            datasets: [{
                label: 'Tasks',
                data: [completed, pending],
                backgroundColor: ['#4CAF50', '#FF9800'],
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to show the task section
function showTasks() {
    document.getElementById('task-section').style.display = 'block';
    document.getElementById('dashboard-section').style.display = 'none';
    renderTasks(); 
}

// Function to show the dashboard section
function showDashboard() {
    document.getElementById('task-section').style.display = 'none';
    document.getElementById('dashboard-section').style.display = 'block';
    updateChart(); // Update chart when showing the dashboard section
}

// Event listeners for navigation buttons
document.getElementById('show-tasks').addEventListener('click', showTasks);
document.getElementById('show-dashboard').addEventListener('click', showDashboard);

// Initial render
showTasks(); // Show tasks by default