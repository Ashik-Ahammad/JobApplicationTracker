let total = document.getElementById("totalCount");
let interview = document.getElementById("interviewCount");
let reject = document.getElementById("rejectCount");
let jobsAvailable = document.getElementById("job-count");

let interviewList = [];
let rejectedList = [];
let activeTab = "all";

const allCardSecion = document.getElementById("allCards");
const interviewFilterSection = document.getElementById("interviewCards");
const rejectedFilterSection = document.getElementById("rejectedCards");

// Function to calculate the counts
function calculateCount() {

  total.innerText = allCardSecion.children.length;
  interview.innerText = interviewList.length;
  reject.innerText = rejectedList.length;

  if(activeTab === "interview"){
    jobsAvailable.innerText = interviewList.length;
  }
  else if(activeTab === "rejected"){
    jobsAvailable.innerText = rejectedList.length;
  }
  else{
    jobsAvailable.innerText = allCardSecion.children.length;
  }
}
calculateCount();

// handling button clicks
function toggleStyle(id) {

  allFilterBtn.classList.remove("bg-blue-500","text-white");
  interviewFilterBtn.classList.remove("bg-blue-500","text-white");
  rejectedFilterBtn.classList.remove("bg-blue-500","text-white");

  allFilterBtn.classList.add("bg-gray-300");
  interviewFilterBtn.classList.add("bg-gray-300");
  rejectedFilterBtn.classList.add("bg-gray-300");

  const selectedBtn = document.getElementById(id);
  selectedBtn.classList.remove("bg-gray-300");
  selectedBtn.classList.add("bg-blue-500","text-white");

  if (id === "interview-filter-btn") {
    activeTab = "interview";

    allCardSecion.classList.add("hidden");
    interviewFilterSection.classList.remove("hidden");
    rejectedFilterSection.classList.add("hidden");

    renderInterviewCards();
  }

  else if (id === "rejected-filter-btn") {
    activeTab = "rejected";

    allCardSecion.classList.add("hidden");
    interviewFilterSection.classList.add("hidden");
    rejectedFilterSection.classList.remove("hidden");

    renderRejectedCards();
  }

  else {
    activeTab = "all";

    allCardSecion.classList.remove("hidden");
    interviewFilterSection.classList.add("hidden");
    rejectedFilterSection.classList.add("hidden");
  }

  calculateCount();
}