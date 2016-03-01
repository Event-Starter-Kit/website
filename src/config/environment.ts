export class Environment {

    // todo: create a setEnvironment method
    public static Env: string;

    public static IsDevEnvironment(): boolean {
        return Environment.Env === "dev";
    }
}
