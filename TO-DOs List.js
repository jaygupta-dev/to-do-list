

const addBtn = document.querySelector(".addBtn");
const inputData = document.querySelector("#floatingTextarea2");
const dataRecords = document.querySelector("#dataRecords");


let dataArray = [];
let editDataId = null;

let objectStr=localStorage.getItem("msgData");
if(objectStr != null){
    dataArray = JSON.parse(objectStr);
}



displayData()

addBtn.addEventListener('click' , function(){
    let msgTxt = inputData.value;
    if(editDataId != null){
        dataArray.splice(editDataId,1,{'msgData' : msgTxt});
        editDataId = null;
    }
    else{
        dataArray.push({'msgData' : msgTxt});
    }
    saveData(dataArray);
    inputData.value = "";
    displayData();
});



function saveData(dataArray){
    let dataStr = JSON.stringify(dataArray);
    localStorage.setItem('msgData' , dataStr);
    displayData()
}

function displayData(){
    let tableStatement = "";
    dataArray.forEach((msgData, indexData) => {
        tableStatement += `<tr>
        <th scope="row">${indexData+1}</th>
        <td>${msgData.msgData}</td>
        <td>
            <button onclick="editData(${indexData})" type="button" class="btn mt-3 btn-outline-success">Edit Notes</button>
            <button onclick="removeData(${indexData})" type="button" class="btn mt-3 btn-outline-danger">Remove Notes</button>
        </td>
      </tr>`;
    });
    dataRecords.innerHTML = tableStatement;
}

function editData(id){
    editDataId = id;
    inputData.value = dataArray[id].msgData;
    addBtn.innerText = "Save Changes";
}

function removeData(id){
    dataArray.splice(id,1);
    saveData(dataArray);
    displayData();
}