
export const baseUrl = `http://${import.meta.env.DEV ? "localhost" : "192.168.0.11"
  }:3050/`;

export const headers = {
  "Content-Type": "application/json"
};

export const size = 30;
