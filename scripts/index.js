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

const emptyMessage = `
<div class="flex flex-col justify-center items-center text-center my-15">
  <div><img src="assets/jobs.png" alt=""></div>
  <div>
    <p class="text-xl text-blue-950 font-semibold">No Jobs Available</p>
    <p class="text-gray-400">Check back soon for new job opportunities</p>
  </div>
</div>
`;

// Function to calculate the counts
function calculateCount() {

  total.innerText = allCardSecion.children.length;
  interview.innerText = interviewList.length;
  reject.innerText = rejectedList.length;

  if(activeTab === "interview"){
    interviewList.length === 0 ? jobsAvailable.innerText = 0 : jobsAvailable.innerText = interviewList.length + " of " + allCardSecion.children.length;
  }
  else if(activeTab === "rejected"){
    rejectedList.length === 0 ? jobsAvailable.innerText = 0 : jobsAvailable.innerText = rejectedList.length + " of " + allCardSecion.children.length;
  }
  else{
    jobsAvailable.innerText = allCardSecion.children.length;
  }
}
calculateCount();

const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");

const mainContainer = document.querySelector("main");

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

mainContainer.addEventListener("click", (event) => {

  const parentNode = event.target.parentNode.parentNode;
  if(!parentNode) return;

  const companyName = parentNode.querySelector(".companyName").innerText;
  const designation = parentNode.querySelector(".designation").innerText;
  const location = parentNode.querySelector(".job-location").innerText;
  const workingHour = parentNode.querySelector(".job-hour").innerText;
  const salary = parentNode.querySelector(".job-salary").innerText;
  const notes = parentNode.querySelector(".notes").innerText;

  // ================= Interview =================
  if (event.target.classList.contains("interview-btn")) {

    parentNode.querySelector(".my-status").innerText = "Interview";

    rejectedList = rejectedList.filter(job => job.companyName !== companyName);

    const exists = interviewList.find(job => job.companyName === companyName);

    if(!exists){
      interviewList.push({
        companyName,
        designation,
        location,
        workingHour,
        salary,
        status:"Interview",
        notes
      });
    }

    renderInterviewCards();
    renderRejectedCards();
    calculateCount();
  }


  // ================= Rejected =================
  if (event.target.classList.contains("rejected-btn")) {

    parentNode.querySelector(".my-status").innerText = "Rejected";

    interviewList = interviewList.filter(job => job.companyName !== companyName);

    const exists = rejectedList.find(job => job.companyName === companyName);

    if(!exists){
      rejectedList.push({
        companyName,
        designation,
        location,
        workingHour,
        salary,
        status:"Rejected",
        notes
      });
    }

    renderInterviewCards();
    renderRejectedCards();
    calculateCount();
  }

  // ================= Delete Button =================
if (event.target.closest(".delete-btn")) {

  const card = event.target.closest(".card");
  const companyName = card.querySelector(".companyName").innerText;

  // remove from interview list
  interviewList = interviewList.filter(
    job => job.companyName !== companyName
  );

  // remove from rejected list
  rejectedList = rejectedList.filter(
    job => job.companyName !== companyName
  );

  card.remove();

  renderInterviewCards();
  renderRejectedCards();
  calculateCount();
}

});

function renderInterviewCards() {
  interviewFilterSection.innerHTML = "";

  if (interviewList.length === 0) {
    interviewFilterSection.innerHTML = emptyMessage;
    return;
  }

  for (let interview of interviewList) {
    let div = document.createElement("div");
    div.classList.add(
      "relative",
      "flex",
      "flex-col",
      "md:flex-row",
      "md:justify-between",
      "md:items-start",
      "gap-4",
    );
    div.innerHTML = `
        <div
            class="card bg-base-100 shadow-lg border border-gray-200 p-5 rounded-2xl w-full mt-5"
          >
        <div class="space-y-4 w-full">
              <div>
                <h2 class="text-lg font-bold text-blue-950 companyName">
                  ${interview.companyName}
                </h2>
                <p class="text-gray-500 designation">${interview.designation}</p>
              </div>

              <div class="flex flex-wrap gap-x-3 gap-y-1 text-sm">
                <p class="text-gray-600 job-location">${interview.location}</p>
                <p class="text-gray-600 job-hour">${interview.workingHour}</p>
                <p class="text-gray-600 job-salary">$130,000 - $175,000</p>
              </div>

              <div class="flex items-center justify-between">
                <div
                  class="flex items-center gap-2 bg-blue-100 py-1 px-2 rounded w-fit"
                >
                  <p class="my-status text-sm">${interview.status}</p>
                </div>
              </div>

              <div class="pe-4 py-3">
                <p class="text-sm text-gray-600 notes">
                    ${interview.notes}
                </p>
              </div>

              <div class="flex flex-col sm:flex-row gap-3">
                <button
                  class="interview-btn btn btn-outline btn-success btn-sm"
                >
                  INTERVIEW
                </button>
                <button class="rejected-btn btn btn-outline btn-error btn-sm">
                  REJECTED
                </button>
              </div>
            </div>
            <button
              class="delete-btn absolute top-4 right-4 btn btn-outline btn-sm btn-circle text-red-500 hover:bg-red-500 hover:text-white"
            >
              <i class="fa-solid fa-trash-can"></i>
            </button>
        `;

    interviewFilterSection.appendChild(div);
  }
}

function renderRejectedCards(){

    rejectedFilterSection.innerHTML= "";

    if (rejectedList.length === 0) {
    rejectedFilterSection.innerHTML = emptyMessage;
    return;
  }

    for(let rejected of rejectedList){

        let div = document.createElement("div");
        div.classList.add("relative", "flex", "flex-col", "md:flex-row", "md:justify-between", "md:items-start", "gap-4");

        div.innerHTML = `
        <div
            class="card bg-base-100 shadow-lg border border-gray-200 p-5 rounded-2xl w-full mt-5"
        >
            <div class="space-y-4 w-full">

                <div>
                    <h2 class="text-lg font-bold text-blue-950 companyName">
                        ${rejected.companyName}
                    </h2>
                    <p class="text-gray-500 designation">${rejected.designation}</p>
                </div>

                <div class="flex flex-wrap gap-x-3 gap-y-1 text-sm">
                    <p class="text-gray-600 job-location">${rejected.location}</p>
                    <p class="text-gray-600 job-hour">${rejected.workingHour}</p>
                    <p class="text-gray-600 job-salary">${rejected.salary}</p>
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2 bg-red-100 py-1 px-2 rounded w-fit">
                        <p class="my-status text-sm">${rejected.status}</p>
                    </div>
                </div>

                <div class="pe-4 py-3">
                    <p class="text-sm text-gray-600 notes">
                        ${rejected.notes}
                    </p>
                </div>

                <div class="flex flex-col sm:flex-row gap-3">
                    <button class="interview-btn btn btn-outline btn-success btn-sm">
                        INTERVIEW
                    </button>
                    <button class="rejected-btn btn btn-outline btn-error btn-sm">
                        REJECTED
                    </button>
                </div>
            </div>
            <button
              class="delete-btn absolute top-4 right-4 btn btn-outline btn-sm btn-circle text-red-500 hover:bg-red-500 hover:text-white"
            >
              <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
        `

        rejectedFilterSection.appendChild(div);
    }
}