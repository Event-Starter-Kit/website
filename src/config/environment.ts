export class environment {
    
    // todo: create a setEnvironment method
    static env: string;
    
    static isDevEnvironment(): boolean {
        return environment.env === 'dev';
    }
}