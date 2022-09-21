/* eslint-disable no-unused-vars */
class StoreUser {
  constructor(name) {
    this.name = name;
    this.storage = JSON.parse(localStorage.getItem(name)) || {};
  }
  async set(key, value) {
    const { name, storage } = this;
    storage[key] = value;
    localStorage.setItem(name, JSON.stringify(storage));
  }
  get(key) {
    const { name } = this;
    const getStore = JSON.parse(localStorage.getItem(name));
    if (getStore) return getStore[key];
  }
  remove(key) {
    const { name } = this;
    const storeAll = JSON.parse(localStorage.getItem(name));
    delete storeAll[key];
    localStorage.removeItem(name);
    localStorage.setItem(name, JSON.stringify(storeAll));
  }
  clear() {
    const { name } = this;
    localStorage.removeItem(name);
  }
}

export const storeUser = new StoreUser("test-vue");

// 生成uuid
export function uuid(len, radix) {
  let chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
  let uuid = [],
    i;
  radix = radix || chars.length;

  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    let r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";

    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join("");
}
