export class HostingEnvironment {

    // todo: create a setEnvironment method
    public static Env: string = process.env.ENVIRONMENT || "dev";

    public static isDevelopment(): boolean {
        return HostingEnvironment.Env === "dev";
    }

	public static isProduction(): boolean {
        return HostingEnvironment.Env === "prod";
    }
}
