export class Question {
    static options = ['A', 'B', 'both']; 
    constructor(
        public pathA: string,
        public pathB: string,
        public correctOption: string
    ) {}
}