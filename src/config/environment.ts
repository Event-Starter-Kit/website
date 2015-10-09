export class environment {
    static isDevEnvironment(): boolean {
        return global.env === 'dev';
    }
}