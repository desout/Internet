import { toDoItem } from "../objects/item.js";
export function initializer() {
    return new Promise((resolve, reject) => {
        let toDoList = [];
        let newItem = new toDoItem(1, 'TEST', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente alias iste dolorum, fugit possimus necessitatibus ex quibusdam et nostrum veritatis obcaecati quasi, temporibus sint est, minus similique. Obcaecati, commodi iste!')
        toDoList.push(newItem);
        newItem = new toDoItem(2, 'TEST 2', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente alias iste dolorum, fugit possimus necessitatibus ex quibusdam et nostrum veritatis obcaecati quasi, temporibus sint est, minus similique. Obcaecati, commodi iste!', 'NEW', '05-04-2018', '05-03-2018')
        toDoList.push(newItem);
        resolve(toDoList);
    });
}