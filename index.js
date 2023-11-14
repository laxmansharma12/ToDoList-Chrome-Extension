let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("tab-btn");
if (leadsFromLocalStorage) {
	myLeads = leadsFromLocalStorage;
	render(myLeads);
}

tabBtn.addEventListener("click", function () {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		myLeads.push(tabs[0].url);
		localStorage.setItem("myLeads", JSON.stringify(myLeads));
		render(myLeads);
	});
});

function render(leads) {
	let listItems = "";
	for (let i = 0; i < leads.length; i++) {
		listItems += `    
        <li class="list-group-item d-flex justify-content-between align-items-start">    
                   <div class="fw-bold">
                 <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                 </a>   
             </div>
              <img id=${i} src="images/delete.jpg" name="del-icon" alt="delete button" height="20px" width="20px">
            </li>

        `;
	}
	ulEl.innerHTML = listItems;
}

window.onclick = (e) => {
	if (e.target.tagName === "IMG" && e.target.name === "del-icon") {
		var i = e.target.id;
		myLeads.splice(i, 1);
		localStorage.setItem("myLeads", JSON.stringify(myLeads));
		render(myLeads);
	}
};

deleteBtn.addEventListener("dblclick", function () {
	localStorage.clear();
	myLeads = [];
	render(myLeads);
});

inputBtn.addEventListener("click", function () {
	if (inputEl.value != "") {
		myLeads.push(inputEl.value);
		inputEl.value = "";
		localStorage.setItem("myLeads", JSON.stringify(myLeads));
		render(myLeads);
		inputEl.placeholder = "";
	} else {
		inputEl.placeholder = "please type here";
	}
});
