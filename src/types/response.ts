export class ResponseStructure {
    success: boolean;
    data?: any;
    message?: any;
    constructor(success: boolean, data?: any, message?: string) {
      this.success = success
      this.data = data
      this.message = message
    }
  }