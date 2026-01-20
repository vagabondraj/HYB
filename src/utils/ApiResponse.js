class ApiResponse{
    constructor(statuscode, data, message = "Request successful"){
        this.statuscode = statuscode;
        this.data = data;
        this.message = message;
        this.success = statuscode < 400;
    }
}

export default ApiResponse;