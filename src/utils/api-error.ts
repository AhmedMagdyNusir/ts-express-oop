export class ApiError extends Error {
  public status: string;
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.statusCode = statusCode;
    this.message = message;

    // Set the prototype explicitly
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
