
export const baseUrl = `http://${import.meta.env.DEV ? "localhost" : "192.168.0.11"
  }:3050/`;

export const headers = {
  "Content-Type": "application/json"
};

export const baseVideoLimit = 50

export const baseSizeIcon = 30;
