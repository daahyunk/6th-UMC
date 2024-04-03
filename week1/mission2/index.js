document.getElementById('newTask').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        var taskContent = this.value;
        if (taskContent) {
            addToDoItem(taskContent);
            this.value = '';
        }
    }
});

function addToDoItem(content) {
    var listItem = document.createElement('li');
    listItem.textContent = content;
    var doneButton = document.createElement('button');
    doneButton.textContent = '완료';
    doneButton.onclick = function() {
        moveItemToDone(listItem);
    };
    listItem.appendChild(doneButton);
    document.getElementById('todoList').appendChild(listItem);
}

function moveItemToDone(item) {
    document.getElementById('todoList').removeChild(item);
    item.removeChild(item.querySelector('button'));
    var deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.onclick = function() {
        item.remove();
    };
    item.appendChild(deleteButton);
    document.getElementById('doneList').appendChild(item);
}
