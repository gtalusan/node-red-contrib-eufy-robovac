const { RoboVac } = require('@george.talusan/eufy-robovac-js');

module.exports = (RED) => {
  class EufyRobovacConfigNode {
    constructor (config) {
      RED.nodes.createNode(this, config);

      this.connected = false;
      this.reconnect = true;

      const { ip, deviceId, localKey } = config;
      this.robovac = new RoboVac({ ip, deviceId, localKey });
      this.robovac.on('tuya.connected', async () => {
        console.warn('connected');

        this.connected = true;
      });

      this.robovac.on('tuya.disconnected', async () => {
        this.connected = false;
        if (!this.reconnect) {
          return;
        }

        console.warn('reconnecting..');

        const id = setInterval(async () => {
          try {
            await this.robovac.connect();
            clearInterval(id);
          } catch (e) {
            console.error(e);
          }
        }, 2000);
      });

      this.robovac.initialize();

      this.on('close', () => {
        console.warn('close');

        this.reconnect = false;
        this.robovac.disconnect();
      });
    }
  }
  RED.nodes.registerType('eufy-robovac-config', EufyRobovacConfigNode);
};
