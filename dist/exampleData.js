"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TaskItem_1 = require("./models/TaskItem");
exports.tasks = [
    new TaskItem_1.TaskItem(1, "task 1"),
    new TaskItem_1.TaskItem(2, "task 2"),
    new TaskItem_1.TaskItem(3, "task 3"),
    new TaskItem_1.TaskItem(4, "task 4", true)
];
