import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js"
import { getDatabase, 
        ref,
        push,
        onValue,
        remove } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-3c71e-default-rtdb.europe-west1.firebasedatabase.app"
}
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

inputBtn.addEventListener("click", function(){
    push(referenceInDB, inputEl.value)
    inputEl.value = ""
})

deleteBtn.addEventListener("dblclick", function(){
    remove(referenceInDB)
    ulEl.innerHTML = ""
})

onValue(referenceInDB, function(snapshot){
    const snapshotDoesExist = snapshot.exists()
    if(snapshotDoesExist){
        const snapshotValues = snapshot.val()
        const leads = Object.values(snapshotValues)
        console.log(leads)
        render(leads)
    }
})

function render(leads){
    let listItems = ""
    for (let i = 0; i < leads.length; i++){
        //listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>"
        listItems += `
            <li>
                ${leads[i]}
            </li>
        `
    }
    ulEl.innerHTML = listItems
}
