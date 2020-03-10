import { TaskItem } from "./TaskItem";
import { TaskCounts } from "../types/TaskCounts.type";

export class TaskCollection {

    nextID: number = 1;
    taskMap = new Map<number, TaskItem>();

    public constructor(
        public username: string,
        public taskItem: TaskItem[] = [],
    ) {
        this.taskItem.forEach(item => this.taskMap.set(item.id, item));
    }


    addTask(task: string): number {

        while (this.getTaskById(this.nextID)) {
            this.nextID++;
        }

        this.taskMap.set(
            this.nextID,
            new TaskItem(
                this.nextID,
                task
            )
        )

        return this.nextID;
    }

    getTaskItems(includeComplete: boolean): TaskItem[] {
        // Retorna una copia del arreglo
        return [...this.taskMap.values()]
            .filter(task => includeComplete || !task.complete)
    }

    getTaskById(id: number): TaskItem | undefined {
        return this.taskMap.get(id);
    }

    markComplete(id: number, complete: boolean): void {
        const item = this.getTaskById(id);
        if (item)
            item.complete = complete;
    }

    removeComplete(): void {

        this.taskMap.forEach(item => {
            if (item.complete)
                this.taskMap.delete(item.id)
        })

    }

    getTaskCounts(): TaskCounts {
        return {
            total: this.taskMap.size,
            incomplete: this.getTaskItems(false).length
        }
    }

}