import { readFileSync } from "fs";
import { resolve } from "path";

export class Config {
  private config: Record<string, string> = {};
  public readonly isDevelopmentMode: boolean;
  public readonly isProductionMode: boolean;

  constructor() {
    this.loadDotenv();
    this.mergeProcessDotenv();
    this.isDevelopmentMode = this.get("ENVIRONMENT") === "development";
    this.isProductionMode = this.get("ENVIRONMENT") === "production";
  }

  private loadDotenv(): void {
    try {
      const data = readFileSync(resolve(__dirname, "..", "..", ".env"), "utf8");
      const lines = data.split("\n");
      lines.forEach((line) => {
        const [key, value] = line.split("=");
        if (key && value) this.config[key.trim()] = value.trim();
      });
    } catch (error) {
      console.error("An error occurred while loading environment variables", error);
    }
  }

  private mergeProcessDotenv(): void {
    // Process.env variables (like those set by cross-env) take precedence
    Object.keys(process.env).forEach((key) => {
      const value = process.env[key];
      if (value) this.config[key] = value;
    });
  }

  /**
   * Retrieves an environment variable value.
   * @param key - The environment variable name
   * @returns The value if it exists, otherwise undefined
   */
  public get(key: string): string | undefined {
    return this.config[key];
  }

  /**
   * Retrieves a required environment variable value.
   * @param key - The environment variable name
   * @returns The value if it exists
   * @throws Error if the environment variable is not defined
   */
  public require(key: string): string {
    const value = this.config[key];
    if (!value) throw new Error(`${key} is not defined in environment variables.`);
    return value;
  }
}
