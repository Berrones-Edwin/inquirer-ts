"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TaskItem_1 = require("./TaskItem");
class TaskCollection {
    constructor(username, taskItem = []) {
        this.username = username;
        this.taskItem = taskItem;
        this.nextID = 1;
        this.taskMap = new Map();
        this.taskItem.forEach(item => this.taskMap.set(item.id, item));
    }
    addTask(task) {
        while (this.getTaskById(this.nextID)) {
            this.nextID++;
        }
        this.taskMap.set(this.nextID, new TaskItem_1.TaskItem(this.nextID, task));
        return this.nextID;
    }
    getTaskItems(includeComplete) {
        // Retorna una copia del arreglo
        return [...this.taskMap.values()]
            .filter(task => includeComplete || !task.complete);
    }
    getTaskById(id) {
        return this.taskMap.get(id);
    }
    markComplete(id, complete) {
        const item = this.getTaskById(id);
        if (item)
            item.complete = complete;
    }
    removeComplete() {
        this.taskMap.forEach(item => {
            if (item.complete)
                this.taskMap.delete(item.id);
        });
    }
    getTaskCounts() {
        return {
            total: this.taskMap.size,
            incomplete: this.getTaskItems(false).length
        };
    }
}
exports.TaskCollection = TaskCollection;
