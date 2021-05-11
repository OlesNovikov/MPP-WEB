export class Task {
    constructor(
        public title: string = '',
        public description: string = '',
        public author_id: number = 0,
        public executor_id: number = 0,
        public priority_id: number = 0,
        public status_id: number = 0,
        public filename: string = '',
        public deadline: string = ''
    ) {}
}