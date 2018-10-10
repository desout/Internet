export function helper() { }
helper.getClassStatus = function(status) {
    let newStatus = ['alert-info'];
    let inProgressStatus = ['alert-warning'];
    let doneStatus = ['alert-success','hiddenToDo'];
    if (status === 'NEW') {
        return newStatus;
    }
    if (status === 'IN_PROGRESS') {
        return inProgressStatus;
    }
    if (status === 'DONE') {
        return doneStatus;
    }
}

helper.getNewDomItem = function(data) { // get new ToDo Dom Element
    let todoItem = document.createElement('button');
    todoItem.className = "toDoItem alert";
    todoItem.classList.add(...this.getClassStatus(data.status));
    todoItem.dataset.id = data.id;
    let staticsDiv = document.createElement('div');
    staticsDiv.className = 'statics';
    let captionSpan = document.createElement('span');
    let captionTextNode = document.createTextNode(data.getCaption());
    captionSpan.appendChild(captionTextNode);
    staticsDiv.appendChild(captionSpan);
    let brNode = document.createElement('br');
    staticsDiv.appendChild(brNode);
    let statusSpan = document.createElement('span');
    let statusTextNode = document.createTextNode(getShowStatus(data.status));
    statusSpan.appendChild(statusTextNode);
    staticsDiv.appendChild(statusSpan);
    todoItem.appendChild(staticsDiv);
    return todoItem;
}
helper.sortedFunction = function (a, b) {
    if ((a.status === 'NEW' && b.status !== 'NEW') ||
        (a.status === 'IN_PROGRESS' && b.status === 'DONE')) {
        return 1;
    }
    if (((a.status === 'NEW' && b.status === 'NEW') ||
        (a.status === 'IN_PROGRESS' && b.status === 'IN_PROGRESS') ||
        (a.status === 'DONE' && b.status === 'DONE'))) {
        return 0;
    }
    if ((a.status !== 'NEW' && b.status === 'NEW') ||
        (b.status === 'IN_PROGRESS' && a.status === 'DONE')) {
        return -1;
    }
}
function getShowStatus(status) {
    let newStatus = 'New';
    let inProgressStatus = 'In progress';
    let doneStatus = 'Is done';
    if (status === 'NEW') {
        return newStatus;
    }
    if (status === 'IN_PROGRESS') {
        return inProgressStatus;
    }
    if (status === 'DONE') {
        return doneStatus;
    }
}