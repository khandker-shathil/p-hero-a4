let interviewArray = [];
let rejectedArray = [];
let currentStatus = 'all'; 

let totalCount = document.getElementById('total-count');
let interviewCount = document.getElementById('interview-count');
let rejectCount = document.getElementById('reject-count');
let jobCount = document.getElementById('job-count');
let btnUpdate = document.getElementById('btn-update');


const total = document.getElementById("cards");

const btnAll = document.getElementById("button-all");
const btnInterview = document.getElementById("button-interview");
const btnReject = document.getElementById("button-rejected");
const emptyState = document.getElementById("no-jobs");

const filterSection = document.getElementById("filter-section");

function calculateTotal () {
    totalCount.innerText = total.children.length;
    interviewCount.innerText = interviewArray.length;
    rejectCount.innerText = rejectedArray.length; 
    jobCount.innerText = totalCount.innerText;
}
calculateTotal();

const bodyContainer = document.querySelector('body');

function toggle (id){
    btnAll.classList.remove('btn' ,'btn-active', 'btn-primary');
    btnInterview.classList.remove('btn' ,'btn-active', 'btn-primary');
    btnReject.classList.remove('btn' ,'btn-active', 'btn-primary');

    btnAll.classList.add('btn');
    btnInterview.classList.add('btn');
    btnReject.classList.add('btn');

    const selected = document.getElementById(id);
    currentStatus = id;
    selected.classList.remove('btn');
    selected.classList.add('btn' ,'btn-active', 'btn-primary');

    if(id == 'button-interview'){
        total.classList.add('hidden');
        filterSection.classList.remove('hidden');
        if(interviewArray.length == 0){
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
        }
        renderInterview();
    }else if (id == 'button-all'){
        total.classList.remove('hidden');
        filterSection.classList.add('hidden');
        emptyState.classList.add('hidden');
    } else if (id == 'button-rejected'){
        total.classList.add('hidden');
        filterSection.classList.remove('hidden');
        if(rejectedArray.length == 0){
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
        }
        renderRejected();
    }
    renderJobCount();
}

bodyContainer.addEventListener('click', function(event){

    if(event.target.classList.contains('btn-accept')){
        const pNode = event.target.parentNode.parentNode;

        const classTitle =  pNode.querySelector('.card-title').innerText;
        const jobName  =pNode.querySelector('.job-name').innerText;
        const salaryInfo = pNode.querySelector('.salary-info').innerText;
        const detailsInfo = pNode.querySelector('.details-info').innerText;
        
        const card = event.target.closest('.card');
        card.classList.remove('border-l-gray-600','border-l-red-600');
        card.classList.add('border-l-green-600','border-l-2');

        const btnUpdate = card.querySelector('#btn-update');
        btnUpdate.innerText = "Interview";
        btnUpdate.classList.remove('btn-error');
        btnUpdate.classList.add('btn-success');

        const cardInfo = {
            classTitle,
            jobName,
            salaryInfo,
            detailsInfo,
            status: 'interview',
        }

        const isInterview = interviewArray.find(item=>item.classTitle == cardInfo.classTitle);

        if(!isInterview){
            interviewArray.push(cardInfo);     
        }

        rejectedArray = rejectedArray.filter(item=>item.classTitle != cardInfo.classTitle);
        if(currentStatus == 'button-rejected'){
            renderRejected();
        }
        calculateTotal();
        renderJobCount();


    } else if(event.target.classList.contains('btn-reject')){
        const pNode = event.target.parentNode.parentNode;
        const classTitle =  pNode.querySelector('.card-title').innerText;
        const jobName  =pNode.querySelector('.job-name').innerText;
        const salaryInfo = pNode.querySelector('.salary-info').innerText;
        const detailsInfo = pNode.querySelector('.details-info').innerText;

        const card = event.target.closest('.card');
        card.classList.remove('border-l-gray-600','border-l-green-600');
        card.classList.add('border-l-red-600','border-l-2');

        const btnUpdate = card.querySelector('#btn-update');
        btnUpdate.innerText = "Rejected";
        btnUpdate.classList.remove('btn-success');
        btnUpdate.classList.add('btn-error');
        
        const cardInfo = {
            classTitle,
            jobName,
            salaryInfo,
            detailsInfo,
            status: 'rejected',
        }

        const isRejected = rejectedArray.find(item=>item.classTitle == cardInfo.classTitle);

        if(!isRejected){
            rejectedArray.push(cardInfo);     
        }
        interviewArray = interviewArray.filter(item=>item.classTitle != cardInfo.classTitle);  
        if(currentStatus == 'button-accept'){
            renderInterview();
        }  
        calculateTotal();
        renderJobCount();
    } else if(event.target.closest('.btn-delete')){

            const card = event.target.closest('.card');
            const pNode = card.querySelector('.card-body');
            const classTitle = pNode.querySelector('.card-title').innerText;

            interviewArray = interviewArray.filter(item => item.classTitle !== classTitle);
            rejectedArray = rejectedArray.filter(item => item.classTitle !== classTitle);         
            card.remove();
            
            if(currentStatus === 'button-interview'){
                renderInterview();
            }
            if(currentStatus === 'button-rejected'){
                renderRejected();
            }
            calculateTotal();
            renderJobCount();
        }

})

function renderInterview(){
    filterSection.innerHTML = '';
    let btnOkClass = '';
    let btnRejectClass = 'hidden';
    let btnInterviewClass = 'hidden';
    for(let interview of interviewArray){
        if(interview.status == 'interview'){
        btnOkClass = 'hidden';
        btnRejectClass = 'hidden';
        btnInterviewClass = '';
        } else if(interview.status == 'rejected'){
            btnOkClass = 'hidden';
            btnRejectClass = '';
            btnInterviewClass = 'hidden';
        } 
        let div = document.createElement('div');
        div.className = 'card card-border border-l-gray-600 border-l-2 bg-white w-auto mt-5';
        div.innerHTML = `
                            <div class="card-body justify-start">
                                <div class="card-title justify-between">
                                    <h2 class="card-title">${interview.classTitle}</h2>
                                    <button class="btn btn-outline border-0 rounded-full"><i class="fa-solid fa-bucket"></i></button>
                                </div>
                                <div class="card-info">
                                    <p class="job-name text-neutral/50">${interview.jobName}</p>
                                    <p class="salary-info text-neutral/50">${interview.salaryInfo}</p>
                                    <button id="btn-update" class="${btnOkClass} btn btn-outline my-2">Not Applied</button>
                                    <button id="btn-ok" class="${btnInterviewClass} btn btn-active btn-success my-2">Interview</button>
                                    <button id="btn-bad" class="${btnRejectClass} btn btn-active btn-error my-2">Rejected</button>
                                    <p class="details-info text-neutral/50">${interview.detailsInfo}</p>
                                </div>
                                <div class="card-actions justify-start">
                                    <button id="btn-accept" class="btn btn-accept btn-outline btn-success">Interview</button>
                                    <button id="btn-reject" class="btn btn-reject btn-outline btn-error">Rejected</button>
                                </div>
                            </div>
                        `
        filterSection.appendChild(div);
    }
}

function renderRejected(){
    filterSection.innerHTML = '';
    for(let rejected of rejectedArray){
         if(rejected.status == 'interview'){
            btnOkClass = 'hidden';
            btnRejectClass = 'hidden';
            btnInterviewClass = '';
            } else if(rejected.status == 'rejected'){
                btnOkClass = 'hidden';
                btnRejectClass = '';
                btnInterviewClass = 'hidden';
            } 
        let div = document.createElement('div');
        div.className = 'card card-border border-l-gray-600 border-l-2 bg-white w-auto mt-5';
        div.innerHTML = `
                            <div class="card-body justify-start">
                                <div class="card-title justify-between">
                                    <h2 class="card-title">${rejected.classTitle}</h2>
                                    <button class="btn btn-outline border-0 rounded-full"><i class="fa-solid fa-bucket"></i></button>
                                </div>
                                <div class="card-info">
                                    <p class="job-name text-neutral/50">${rejected.jobName}</p>
                                    <p class="salary-info text-neutral/50">${rejected.salaryInfo}</p>
                                    <button id="btn-update" class="${btnOkClass} btn btn-outline my-2">Not Applied</button>
                                    <button id="btn-ok" class="${btnInterviewClass} btn btn-active btn-success my-2">Interview</button>
                                    <button id="btn-bad" class="${btnRejectClass} btn btn-active btn-error my-2">Rejected</button>
                                    <p class="details-info text-neutral/50">${rejected.detailsInfo}</p>
                                </div>
                                <div class="card-actions justify-start">
                                    <button id="btn-accept" class="btn btn-accept btn-outline btn-success">Interview</button>
                                    <button id="btn-reject" class="btn btn-reject btn-outline btn-error">Rejected</button>
                                </div>
                            </div>
                        `
        filterSection.appendChild(div);
    }
}

function renderJobCount(){

    if(currentStatus === 'button-interview'){
        jobCount.innerText = interviewArray.length;
    } else if(currentStatus === 'button-rejected'){
        jobCount.innerText = rejectedArray.length;
    } else if(currentStatus === 'button-all'){
        jobCount.innerText = total.children.length;
    }

}
renderJobCount();