import { EventEmitter } from 'events';

export class LocalStorage {
  private prefix!: string;
  private emitter!: EventEmitter;
  private isAvailable: boolean;

  constructor(prefix: string, emitter?: EventEmitter) {
    this.prefix = prefix;
    this.emitter = emitter ?? new EventEmitter();
    this.isAvailable = this.checkLocalStorageAvailability();
  }

  private checkLocalStorageAvailability(): boolean {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return false;
      const testKey = '__storage_test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  subscribe = (listener: <T extends unknown[]>(...args: T) => void) => {
    if (!this.emitter) return () => { };
    this.emitter.on('change', listener);
    return () => {
      this.emitter.off('change', listener);
    };
  };

  setItem = <T>(key: string, value: T) => {
    if (!this.isAvailable) return;
    try {
      localStorage.setItem(this.createKey(key), JSON.stringify(value));
      this.dispatchChange(key, value);
    } catch (error) {
    }
  };

  getItem = <T>(key: string): T | null => {
    if (!this.isAvailable) return null;
    try {
      const data = localStorage.getItem(this.createKey(key));
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  };

  clear = () => {
    if (!this.isAvailable) return;
    try {
      Object.keys(localStorage)
        .filter((key) => key.startsWith(this.prefix))
        .forEach((key) => localStorage.removeItem(key));
      this.dispatchChange();
    } catch {
    }
  };

  removeItem = (key: string) => {
    if (!this.isAvailable) return;
    try {
      localStorage.removeItem(this.createKey(key));
      this.dispatchChange();
    } catch {
    }
  };

  // ---------------------------------------------------------------------------
  // Private methods
  // ---------------------------------------------------------------------------
  private createKey(key: string) {
    return `${this.prefix}${key}`;
  }

  private dispatchChange<A extends unknown[]>(...args: A) {
    if (this.emitter) {
      this.emitter.emit('change', ...args);
    }
  }
}
