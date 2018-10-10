import { store } from './api/store.js';
//import { store } from './localStore/store.js';
import { helper } from './helper.js';
import { STATUSES } from './objects/statuses.js';
function setData(data, isRemove) {
    let mainDiv = document.querySelectorAll('.toDoItems')[0];
    if (isRemove) {
        let removedDiv = document.querySelectorAll(`[data-id='${data[0].id}']`)[0];
        let todoItemDiv = helper.getNewDomItem(data[0]);
        mainDiv.replaceChild(todoItemDiv, removedDiv);
    } else {
        data.sort(helper.sortedFunction);
        for (let i = 0; i < data.length; i++) {
            let todoItemDiv = helper.getNewDomItem(data[i]);
            $(mainDiv).prepend(todoItemDiv);
        }
        if (!$('.showDoneElements').length) {  
            $(mainDiv).append(getShowButton());
        }
    }

}
function getShowButton() {
    let showButton = document.createElement('button');
    showButton.className = 'showDoneElements btn btn-info';
    showButton.innerHTML = 'Show Done Elements';
    return showButton;
}
function setBlur(item) {
    $('.toDoItem,.showDoneElements').css('filter', 'blur(10px)');
    $('.toDoItem,.outer button,.showDoneElements').prop("disabled", true);
    $('.outer').css('filter', 'blur(5px)');
    $(`.toDoItem[data-id='${item.id}'`).css('filter', 'blur(0)');
    $('.mainTabBlur').addClass('blur');
    $('.editTab').removeClass('none');
    $('.toDoItems').css('overflow', 'hidden');
    $('.mainTab').css('background-color', 'rgba(255,255,255,0)');
    $('.toDoItems').scrollTop(0);
}
function unsetBlur() {
    $('.toDoItem,.showDoneElements').css('filter', 'blur(0px)');
    $('.outer').css('filter', 'blur(0px)');
    $('.mainTabBlur').removeClass('blur');
    $('.editTab').addClass('none');
    $('.toDoItem,.outer button,.showDoneElements').prop("disabled", false);
    $('.toDoItems').css('overflow', 'auto');
    $('.mainTab').css('background-color', 'rgba(255,255,255,1)');

}
$(document).on('click', '.showDoneElements', function (event) { 
    let elements = $('.toDoItem.alert.alert-success');
    if ($(elements[0]).hasClass('hiddenToDo')) {
        elements.removeClass('hiddenToDo');
    }
    else {
        elements.addClass('hiddenToDo');
    }
});
$(document).on('click', '.toDoItems .toDoItem', function () { //edit ToDo
    let formObject = document.forms['mainForm'];
    localStore.getItemById(this.dataset.id).then(function (item) {
        let finishDate = moment(item.finishDate);
        formObject.elements['caption'].value = item.getCaption();
        formObject.elements['description'].value = item.getDescription();
        formObject.elements['date'].value = finishDate.year() === moment(0).year() ? `ToDo Doesn't finished` : finishDate.format('YYYY-MM-DD');
        formObject.elements['id-value'].value = item.id;
        formObject.elements['status-value'].value = item.status;
        setBlur(item);

    });

});
$(document).on('click', '.outer button', function () { // add new item
    let formObject = document.forms['mainForm'];
    localStore.getItemById(-1).then(function (item) {
        let finishDate = moment(item.finishDate).format('YYYY-MM-DD');
        formObject.elements['caption'].value = item.getCaption();
        formObject.elements['description'].value = item.getDescription();
        formObject.elements['date'].value = finishDate;
        formObject.elements['id-value'].value = item.id;
        formObject.elements['status-value'].value = item.status;
        setData([item]);
        setBlur(item);

    });
    $('.editTab').removeClass('none');

});
$(document).on('click', '.editButtons #setStatus', function () { //set next status
    let formObject = document.forms['mainForm'];
    if (formObject.elements['id-value'].value) {
        localStore.getItemById(formObject.elements['id-value'].value).then(function (item) {
            item.status = formObject.elements['status-value'].value;
            item.setStatus().then(function () {
                let finishDate = moment(item.finishDate);

                formObject.elements['status-value'].value = item.status;
                formObject.elements['date'].value = finishDate.year() === moment(0).year() ? `ToDo Doesn't finished` : finishDate.format('YYYY-MM-DD');
            });

        });
    }
    return false;
});
$(document).on('click', '.closeButton', function () {
    unsetBlur();
    let formObject = document.forms['mainForm'];
    setTimeout(() => {
        formObject.reset();
    }, 400);
    return false;
});
$(document).on('click', '.editButtons #save', function () { // save and update ToDoItem
    let formObject = document.forms['mainForm'];
    if (formObject.elements['id-value'].value) {
        localStore.getItemById(formObject.elements['id-value'].value).then(function (item) {
            item.status = formObject.elements['status-value'].value;
            item.caption = formObject.elements['caption'].value;
            item.description = formObject.elements['description'].value;
            item.finishDate = formObject.elements['date'].value;
            localStore.updateItem(item).then(function (data) {
                setData([item], true);
                if (item.status === STATUSES.DONE) {
                    $(item).removeClass('hiddenToDo');
                }
            });
            unsetBlur();
            setTimeout(() => {
                formObject.reset();
            }, 400);
        });

    }
    return false;
});
var localStore = new store(setData);