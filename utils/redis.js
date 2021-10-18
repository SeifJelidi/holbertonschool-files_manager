import { createClient } from 'redis';

const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.status = true;
    this.client = createClient();
    this.client.get = promisify(this.client.get).bind(this.client);
    this.client.on('error', (error) => {
      this.status = false;
      console.log(error);
    });
  }

  isAlive() {
    return this.status;
  }

  async get(key) {
    return this.client.get(key);
  }

  async set(key, value, expire) {
    this.client.set(key, value, 'ex-date', expire);
  }

  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
