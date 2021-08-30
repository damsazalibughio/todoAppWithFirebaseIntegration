// console.log(firebase);
// console.log(firebase.database);
// console.log(firebase.auth);
var tbody = document.getElementById('tbody');
var srNo=0;
var addTodo = document.getElementById('add-todo');
var deleteAllTodos = document.getElementById('delete-all-todos');



// var KEY = firebase.database().ref('todos').push().getKey()
// console.log(KEY)
        // ref is equal to table name in PHP
firebase.database().ref('todos').on('child_added',(data)=> {
    // console.log(data);

    
        srNo++;    
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');   
        
        var btn1 = document.createElement('button');
        btn1.setAttribute("class", "btn btn-sm btn-info text-white mx-1 edit")
        var editIcon = document.createElement('i')
        editIcon.setAttribute('class','fa fa-edit');
        var btn1Text = document.createTextNode(" Edit")
        btn1.appendChild(editIcon)
        btn1.appendChild(btn1Text)    
    
        var btn2 = document.createElement('button');
        btn2.setAttribute("class", "btn btn-sm btn-danger text-white delete")
        btn2.setAttribute("id", data.val().key)
        var btn2Text = document.createTextNode(" Delete")
        var delIcon = document.createElement('i')
        delIcon.setAttribute('class','fa fa-trash');
        btn2.appendChild(delIcon)
        btn2.appendChild(btn2Text)   
        // console.log(btn1)    
    
        var tdNo = document.createTextNode(srNo)
        var tdText = document.createTextNode(data.val().value)
    
        td1.appendChild(tdNo)
        td2.appendChild(tdText)
        td3.appendChild(btn1)
        td3.appendChild(btn2)
    
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);   
    
        tbody.appendChild(tr)

       
    
    
})

addTodo.addEventListener('click', function(event){
    event.preventDefault();
   if( event.target.classList.contains('add')){
   
    var item =document.getElementById('todo-item');
    
     if(item.value !=''){
        // adding data to firebase
     var database = firebase.database().ref('todos');
     var key = database.push().key;
     var todo = {
         value: item.value,
         key:key
     }
        database.child(key).set(todo)

        item.value = '';
       }


    }
})


// delete Todo
tbody.addEventListener('click',function(event){
if(event.target.classList.contains('delete')){
    // deleting todos from database
    var todoKey = event.target.id;
    firebase.database().ref('todos').child(todoKey).remove();

    // deleting todos from frontend
    const delTr = event.target.parentElement.parentElement;
    delTr.remove()
    // li.parentNode.removeChild(li);
}
// edit todo
else if(event.target.classList.contains('edit')){
   
    editTr = event.target.parentElement.previousElementSibling;
    console.log(editTr)
    
   
    event.target.style.display = 'none'
    var getTodoText = editTr.textContent;

    var input = document.createElement('input');
    input.setAttribute("class", "form-control w-50")  

    var submitBtn = document.createElement('button');   
    submitBtn.setAttribute("class", "btn btn-sm btn-success text-white mx-1 submit")
    var editIcon = document.createElement('i');
    editIcon.setAttribute('class','fa fa-check');
    var submitBtnText = document.createTextNode(" Submit")
    submitBtn.appendChild(editIcon)
    submitBtn.appendChild(submitBtnText)

    event.target.parentElement.insertBefore(submitBtn, event.target.nextElementSibling)

    input.value =  getTodoText
    // console.log(input.value);
    editTr.textContent ='';
    editTr.appendChild(input)
    
}// submitting edited data
else if(event.target.classList.contains('submit')){
    
    editBtn = event.target.parentElement.firstChild;
    getTr = event.target.parentElement.previousElementSibling;
    console.log(getTr)
    getTr.textContent = getTr.childNodes[0].value    
    editBtn.style.display ='inline';
    event.target.style.display = 'none'

    // editing database on firebase
    var todoKey = event.target.nextElementSibling.id;
    var editTodo = {
        value:getTr.textContent,
        key: todoKey
    }
    firebase.database().ref('todos').child(editTodo.key).set(editTodo)
    
}

})



// Delete All Todos

deleteAllTodos.addEventListener('click', function(event){
    if( event.target.classList.contains('delete-all')){
        // console.log(event.target);
        tbody.innerHTML = '';
       
        firebase.database().ref('todos').set(null)
    }
});