type THeader = {
  [key: string]: string;
};

enum ERequestType {
  PATCH = "PATCH",
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
}

export default class BaseFetch {
  private baseUrl = `http://${import.meta.env.DEV ? "localhost" : "192.168.0.11"
    }:3050/`;
  private headersObj: THeader = {
    "Content-Type": "application/json",
  };

  requestType = ERequestType;

  set url(url: string) {
    this.baseUrl = url;
  }

  get url() {
    return this.baseUrl;
  }

  set setHeaders(headers: THeader) {
    this.headersObj = headers;
  }

  get headers() {
    return this.headersObj;
  }

  stringify(data: Record<string, unknown>) {
    return JSON.stringify(data);
  }
}
