import { toDoItem } from '../objects/item.js';
const PORT = 52900;
export class store {
    constructor(callback) {
        this.getItems().then(function (result) {
            callback(result);
        });
    }
    getItems() {
        return new Promise((resolve, reject) => {
            let toDoItems = [];
            let classThis = this;
            $.ajax({
                async: false,
                type: 'GET',
                url: `/api/todo`,
                contentType: "application/json",
                success: function (data) {
                    for (let i = 0; i < data.length; i++) {
                        let toDoItemTemp = new toDoItem(data[i].id, data[i].caption, '', data[i].status, data[i].finishDate, data[i].creationDate);
                        toDoItems.push(toDoItemTemp);
                    }

                }
            });
            resolve(toDoItems);
        });
    }
    updateItem(item) {

        return new Promise((resolve, reject) => {
            var finishDate = moment.utc(item.finishDate).format();
            var creationDate = moment.utc(item.creationDate).format();
            let data = JSON.stringify({
                id: item.id,
                caption: item.caption,
                status: item.status,
                finishDate: finishDate,
                creationDate: creationDate,
                description: item.description
            });
            $.ajax({
                async: false,
                type: 'PUT',
                url: `/api/todo/${item.id}`,
                data: data,
                contentType: "application/json",
                success: function (data) {
                    resolve(data);
                },
                error: function (data) {
                    alert(data);
                    resolve(1);
                }
            });
        });
    }
    getItemById(id) {
        if (id === -1) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    async: false,
                    type: 'POST',
                    url: `/api/todo`,
                    contentType: "application/json",
                    success: function (data) {
                        let toDoItemTemp = new toDoItem(data.id, data.caption, data.description, data.status, data.finishDate, data.creationDate);
                        resolve(toDoItemTemp);
                    }
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                $.ajax({
                    async: false,
                    type: 'GET',
                    url: `/api/todo/${id}`,
                    contentType: "application/json",
                    success: function (data) {
                        let toDoItemTemp = new toDoItem(data.id, data.caption, data.description, data.status, data.finishDate, data.creationDate);
                        resolve(toDoItemTemp);
                    }
                });
            });
        }


    }
}