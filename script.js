let interviewList = [];
let rejectedList = [];

const total = document.getElementById('total');
const totalInterview = document.getElementById('total-interview');
const totalRejected = document.getElementById('total-rejected');

const parentCard = document.getElementById('parent-card');
const filterSection = document.getElementById('filter-section');

const allBtn = document.getElementById('all-btn');
const interviewBtn = document.getElementById('interview-btn');
const rejectedBtn = document.getElementById('rejected-btn');
const successBtn = document.getElementById('success-bage-btn');

function updateCount() {
  total.innerText = parentCard.querySelectorAll('.job-card').length;
  totalInterview.innerText = interviewList.length;
  totalRejected.innerText = rejectedList.length;
}
updateCount();

// Filter Toggle
function toggleFilter(id) {
  allBtn.classList.remove('bg-blue-500', 'text-white');
  interviewBtn.classList.remove('bg-blue-500', 'text-white');
  rejectedBtn.classList.remove('bg-blue-500', 'text-white');

  if (id === 'all') {
    parentCard.classList.remove('hidden');
    filterSection.classList.add('hidden');
    allBtn.classList.add('bg-blue-500', 'text-white');
  }

  if (id === 'interview') {
    parentCard.classList.add('hidden');
    filterSection.classList.remove('hidden');
    interviewBtn.classList.add('bg-blue-500', 'text-white');
    renderInterview();
  }

  if (id === 'rejected') {
    parentCard.classList.add('hidden');
    filterSection.classList.remove('hidden');
    rejectedBtn.classList.add('bg-blue-500', 'text-white');
    renderRejected();
  }
}
 
// Event Delegation
document.addEventListener('click', function (event) {
  const card = event.target.closest('.job-card');
  if (!card) return;

  const job = {
    jobName: card.querySelector('.job-name').innerText,
    jobTitle: card.querySelector('.job-title').innerText,
    jobBudget: card.querySelector('.project-budget').innerText,
    jobTools: card.querySelector('.job-tools').innerText,
  };

  // Interview
  if (event.target.classList.contains('interview-btn')) {
    if (!interviewList.find(j => j.jobName === job.jobName)) {
      interviewList.push(job);
      rejectedList = rejectedList.filter(j => j.jobName !== job.jobName);
    }
    updateCount();
  }

  // Rejected
  if (event.target.classList.contains('rejected-btn')) {
    if (!rejectedList.find(j => j.jobName === job.jobName)) {
      rejectedList.push(job);
      interviewList = interviewList.filter(j => j.jobName !== job.jobName);
    }
    updateCount();
  }

  // Delete
  if (event.target.closest('.delete-btn')) {
    interviewList = interviewList.filter(j => j.jobName !== job.jobName);
    rejectedList = rejectedList.filter(j => j.jobName !== job.jobName);
    card.remove();
    updateCount();
  }
});

function renderInterview() {
  filterSection.innerHTML = '';
  interviewList.forEach(job => {
    filterSection.innerHTML += createCard(job);
  });
}

// Render Rejected
function renderRejected() {
  filterSection.innerHTML = '';
  rejectedList.forEach(job => {
    filterSection.innerHTML += createCard(job);
  });
}


function createCard(job) {
  return `
  <div class="job-card w-[80%] mx-auto border border-gray-300 p-7 flex justify-between rounded-md bg-white shadow">
    
    <!-- Left Content -->
    <div class="space-y-4">
      <h2 class="job-name font-bold text-[#002C5C] text-2xl">
        ${job.jobName}
      </h2>

      <p class="job-title text-gray-500">
        ${job.jobTitle}
      </p>
       <button id="success-bage-btn" class ="btn  btn-outline btn-success">Interview</button>
      <p class="project-budget text-gray-500">
        ${job.jobBudget}
      </p>

      <p class="job-tools text-gray-500">
        ${job.jobTools}
      </p>

      <!-- Buttons -->
      <div class="mt-4">
        <button class="interview-btn btn btn-outline btn-success mr-4">
          INTERVIEW
        </button>

        <button class="rejected-btn btn btn-outline btn-error">
          REJECTED
        </button>
      </div>
    </div>

    <!-- Right Side Delete -->
    <div>
      <button class="delete-btn border border-gray-300 rounded-full p-2 hover:bg-gray-100 transition">
        <i class="fa-solid fa-trash text-gray-600"></i>
      </button>
    </div>

  </div>
  `;
}