const patientData = {
    totalPatients: 150,
    averageAge: 58,
    highRisk: 45,
    criticalCases: 15,
    genderDistribution: { male: 85, female: 65 },
    ageGroups: {
        '30-40': 20,
        '41-50': 35,
        '51-60': 45,
        '61-70': 30,
        '71+': 20
    },
    bpLevels: {
        normal: 40,
        elevated: 45,
        high: 65
    },
    cholesterolLevels: {
        normal: 55,
        borderline: 60,
        high: 35
    }
};

// Chart instances
let genderChart, ageChart, bpChart, cholesterolChart;

// Colors
const colors = {
    male: '#FF6384',
    female: '#9C27B0',
    primary: '#2196F3',
    secondary: '#4CAF50',
    warning: '#FFC107',
    danger: '#FF5722'
};

// Add sample patient records
const patientRecords = [
    { id: 1, name: 'John Doe', age: 65, gender: 'Male', bp: '140/90', cholesterol: 250, risk: 'High' },
    { id: 2, name: 'Jane Smith', age: 55, gender: 'Female', bp: '120/80', cholesterol: 180, risk: 'Low' },
    { id: 3, name: 'Robert Johnson', age: 70, gender: 'Male', bp: '160/95', cholesterol: 280, risk: 'Critical' },
    { id: 4, name: 'Mary Williams', age: 48, gender: 'Female', bp: '135/85', cholesterol: 210, risk: 'Moderate' },
    { id: 5, name: 'James Brown', age: 62, gender: 'Male', bp: '145/92', cholesterol: 240, risk: 'High' }
];

// Initialize dashboard
function initializeDashboard() {
    updateStatistics();
    createCharts();
}

// Update statistics
function updateStatistics() {
    document.getElementById('total-patients').textContent = patientData.totalPatients;
    document.getElementById('avg-age').textContent = patientData.averageAge;
    document.getElementById('high-risk').textContent = patientData.highRisk;
    document.getElementById('critical-cases').textContent = patientData.criticalCases;
}

// Create all charts
function createCharts() {
    createGenderChart();
    createAgeChart();
    createBPChart();
    createCholesterolChart();
}

// Gender distribution chart
function createGenderChart() {
    const ctx = document.getElementById('genderChart').getContext('2d');
    genderChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Male', 'Female'],
            datasets: [{
                data: [patientData.genderDistribution.male, patientData.genderDistribution.female],
                backgroundColor: [colors.male, colors.female],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Age distribution chart
function createAgeChart() {
    const ctx = document.getElementById('ageChart').getContext('2d');
    ageChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(patientData.ageGroups),
            datasets: [{
                label: 'Patients',
                data: Object.values(patientData.ageGroups),
                backgroundColor: colors.primary,
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

// Blood pressure levels chart
function createBPChart() {
    const ctx = document.getElementById('bpChart').getContext('2d');
    bpChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Normal', 'Elevated', 'High'],
            datasets: [{
                data: Object.values(patientData.bpLevels),
                backgroundColor: [colors.secondary, colors.warning, colors.danger],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Cholesterol distribution chart
function createCholesterolChart() {
    const ctx = document.getElementById('cholesterolChart').getContext('2d');
    cholesterolChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Normal', 'Borderline', 'High'],
            datasets: [{
                label: 'Patients',
                data: Object.values(patientData.cholesterolLevels),
                backgroundColor: [colors.secondary, colors.warning, colors.danger],
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

// Function to create patient records table
function createPatientTable() {
    const tableHTML = `
        <div class="patient-table-container">
            <input type="text" id="patient-search" placeholder="Search patients..." class="patient-search">
            <table class="patient-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Blood Pressure</th>
                        <th>Cholesterol</th>
                        <th>Risk Level</th>
                    </tr>
                </thead>
                <tbody id="patient-table-body">
                </tbody>
            </table>
        </div>
    `;
    
    document.getElementById('patients-section').innerHTML = tableHTML;
    updatePatientTable(patientRecords);
    
    // Add search functionality
    document.getElementById('patient-search').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredPatients = patientRecords.filter(patient => 
            patient.name.toLowerCase().includes(searchTerm) ||
            patient.id.toString().includes(searchTerm)
        );
        updatePatientTable(filteredPatients);
    });
}

// Function to update patient table content
function updatePatientTable(patients) {
    const tableBody = document.getElementById('patient-table-body');
    tableBody.innerHTML = patients.map(patient => `
        <tr class="patient-row ${patient.risk.toLowerCase()}">
            <td>${patient.id}</td>
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>${patient.gender}</td>
            <td>${patient.bp}</td>
            <td>${patient.cholesterol}</td>
            <td><span class="risk-badge ${patient.risk.toLowerCase()}">${patient.risk}</span></td>
        </tr>
    `).join('');
}

// Navigation functions
function showDashboard() {
    document.getElementById('dashboard-section').style.display = 'block';
    document.getElementById('patients-section').style.display = 'none';
    document.getElementById('show-dashboard').classList.add('active');
    document.getElementById('show-patients').classList.remove('active');
}

function showPatients() {
    document.getElementById('dashboard-section').style.display = 'none';
    document.getElementById('patients-section').style.display = 'block';
    document.getElementById('show-dashboard').classList.remove('active');
    document.getElementById('show-patients').classList.add('active');
    createPatientTable();
}

// Event listeners
document.getElementById('show-dashboard').addEventListener('click', showDashboard);
document.getElementById('show-patients').addEventListener('click', showPatients);

// Initialize the dashboard when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeDashboard();
    showDashboard();
});