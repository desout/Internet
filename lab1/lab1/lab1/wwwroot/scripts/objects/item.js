import { STATUSES } from '../objects/statuses.js';
export class toDoItem {
    constructor(id, caption, description, status, finishDate, creationDate) {
        Object.defineProperties(this, {
            id: {
                value: id,
                enumerable: true,
                writable: true,
                configurable: false
            },
            creationDate: {
                value: creationDate === undefined ? new Date().toString() : creationDate,
                enumerable: true,
                writable: true,
                configurable: false
            },
            finishDate: {
                value: finishDate === undefined ? moment(0).format('YYYY-MM-DD') : finishDate,
                enumerable: true,
                writable: true,
                configurable: false
            },
            status: {
                value: status === undefined ? STATUSES.NEW : status,
                enumerable: true,
                writable: true,
                configurable: false
            },
            caption: {
                value: caption,
                enumerable: true,
                writable: true,
                configurable: false
            },
            description: {
                value: description,
                enumerable: true,
                writable: true,
                configurable: false
            },

        })
    }
    setStatus() {
        return new Promise((resolve, reject) => {
            let nextIndex;
            let i = 0;
            for (var prop in STATUSES) {
                i++;
                if (STATUSES[prop] === this.status) {
                    nextIndex = i;
                }
            }
            if (nextIndex === Object.keys(STATUSES).length) {
                return;
            }
            prop = Object.keys(STATUSES)[nextIndex];
            let newStatus = STATUSES[prop];
            this.status = newStatus;
            if (newStatus === STATUSES.DONE) {
                this.finishDate = moment().format('YYYY-MM-DD');
            }
            else {
                this.finishDate = moment(0).format('YYYY-MM-DD');
            }
            resolve(1);
        });
    }
    getDescription() {
        return this.description;
    }
    getCaption() {
        return this.caption;
    }

}
