const STORAGE_KEY = 'mall';
export default {
  setItem(key, value, module_name) {
    if (module_name) {
      const module = this.getItem(module_name) || {};
      module[key] = value;
      this.setItem(module_name, module);
    }
    else {
      const storage = this.getStorage();
      storage[key] = value;
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
    }

  },
  getItem(key, module_name) {
    if (module_name) {
      const module = this.getItem(module_name);
      return module[key];
    }
    const storage = this.getStorage();
    return storage[key];
  },
  getStorage() {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}');
  },
  clearItem(key, module_name) {
    const storage = this.getStorage();
    if (module_name) {
      const module = storage[module_name];
      module[key] && delete module[key];
    } else {
      delete storage[key];
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
  },
}
