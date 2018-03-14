class BaseApiController {
  constructor() {

  }

  response(ok = true, message = "success",  status = 200, data = {}) {
    const response = {
      "status": ok ? 'ok' : 'error',
      "http_status": status,
      "message": message,
      "data": data
    }
    return response;
  }

  ok(message = "success",  status = 200, data = {}) {
    return this.response(true, message, status, data);
  }

  fail(message = "success",  status = 200, data = {}) {
    return this.response(false, message, status, data);
  }
}

module.exports = BaseApiController;