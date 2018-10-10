import { toDoItem } from "../objects/item.js";
import { initializer } from '../localStore/initializer.js'
export class store {
    constructor(callback) {
        this.init(callback);
    }
    init(callback) {
        let mainThis = this;
        initializer().then(function (data) {
            mainThis.toDoItems = data;
            callback(mainThis.toDoItems);
        });
    }
    getItems() {
        return new Promise((resolve, reject) => {
            resolve(this.toDoItems);
        });
    }
    updateItem(item) {
        return new Promise((resolve, reject) => {
            let index = this.toDoItems.findIndex(innerItem => item.id == innerItem.id);
            this.toDoItems[index] = item;
            resolve(item);
        });
    }
    getItemById(id) {
        if (id === -1) {
            return new Promise((resolve, reject) => {
                const idList = this.toDoItems.map(item => item.id);
                let newId = idList.length > 0 ? Math.max(...idList) + 1 : 1;
                let toDo = new toDoItem(newId);
                this.toDoItems.push(toDo);
                resolve(toDo);
            });
        } else {
            return new Promise((resolve, reject) => {
                let index = this.toDoItems.findIndex(innerItem => id == innerItem.id);
                resolve(this.toDoItems[index]);
            });
        }


    }
}