const interviewArray = [];
const rejectedArray = [];

let totalCount = document.getElementById('total-count');
let interviewCount = document.getElementById('interview-count');
let rejectCount = document.getElementById('total-count');

const total = document.getElementById("cards");

const btnAll = document.getElementById("button-all");
const btnInterview = document.getElementById("button-interview");
const btnReject = document.getElementById("button-rejected");

function calculateTotal () {
    totalCount.innerText = total.children.length;
    interviewCount.innerText = interviewArray.length;
    rejectCount.innerText = rejectedArray.length; 
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
    selected.classList.remove('btn');
    selected.classList.add('btn' ,'btn-active', 'btn-primary');
}

bodyContainer.addEventListener('click', function(event){
    const pNode = event.target.parentNode.parentNode;
    // const 
})


