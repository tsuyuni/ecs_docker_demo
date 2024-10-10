import { ICognitoStorage } from "amazon-cognito-identity-js";
import { cookies } from "next/headers";

class ServerCookieStorage implements ICognitoStorage {
  public getItem(key: string) {
    return cookies().get(key)?.value || null;
  }
  public setItem(key: string, value: string) {
    cookies().set(key, value);
  }
  public removeItem(key: string) {
    cookies().delete(key);
  }
  public clear() {
    cookies()
      .getAll()
      .forEach((cookie) => {
        cookies().delete(cookie.name);
      });
  }
}

export default ServerCookieStorage;
