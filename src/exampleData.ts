import { TaskItem } from "./models/TaskItem";

export const tasks: TaskItem[] = [
    new TaskItem(1, "task 1"),
    new TaskItem(2, "task 2"),
    new TaskItem(3, "task 3"),
    new TaskItem(4, "task 4", true)
]