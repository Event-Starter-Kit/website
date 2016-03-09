export class HostingEnvironment {

    // todo: create a setEnvironment method
    public static Env: string = process.env.MONGODB_CONNECTION_STRING || "dev";

    public static isDevelopment(): boolean {
        return HostingEnvironment.Env === "dev";
    }

	public static isProduction(): boolean {
        return HostingEnvironment.Env === "prod";
    }
}
