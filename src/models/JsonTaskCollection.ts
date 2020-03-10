import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { TaskCollection } from "./TaskCollection"
import { TaskItem } from "./TaskItem";
import { Schema } from "../types/Schema.type";

export class JsonTaskCollection extends TaskCollection {


    private database: lowdb.LowdbSync<Schema>;
    constructor(
        public username: string,
        public taskItems: TaskItem[] = []
    ) {
        super(username, []);
        this.database = lowdb(new FileSync("Tasks.json"));

        if (this.database.has('tasks').value()) {

            let dbItems = this.database.get('tasks').value();

            dbItems.forEach(item =>
                this.taskMap.set(
                    item.id,
                    new TaskItem(
                        item.id,
                        item.task,
                        item.complete
                    )
                )
            );
        } else {
            this.database.set('tasks', this.taskItems).write();
            this.taskItems.forEach(item => this.taskMap.set(item.id, item));
        }

    }

    addTask(task: string): number {
        let result = super.addTask(task);
        this.storeTasks();
        return result;
    }

    markComplete(id: number, complete: boolean): void {
        super.markComplete(id, complete);
        this.storeTasks();
    }

    removeComplete(): void {
        super.removeComplete();
        this.storeTasks();
    }

    storeTasks() {
        this.database.set('tasks', [...this.taskMap.values()]).write();
    }


}