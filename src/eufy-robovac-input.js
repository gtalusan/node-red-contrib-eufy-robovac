const sleep = (ms) => new Promise(r => setTimeout(r, ms));

module.exports = (RED) => {
  class EufyRobovacInputNode {
    constructor (config) {
      RED.nodes.createNode(this, config);

      const node = this;
      const configNode = RED.nodes.getNode(config.config);
      if (!configNode) {
        node.status({ fill: 'red', shape: 'dot', text: 'Not configured' });
        node.error('eufy robovac config missing');
        return;
      }

      const robovac = configNode.robovac;
      const ACTIONS = {
        goHome: async (payload) => {
          await robovac.pause();
          await sleep(3000);
          await robovac.goHome(payload);
        },
        locate: async (payload) => {
          await robovac.pause();
          await sleep(3000);
          await robovac.locate(payload);
        },
        clean: async () => {
          await robovac.pause();
          await sleep(3000);
          await robovac.clean();
        },
        cleanRooms: async (payload) => {
          await robovac.pause();
          await sleep(3000);
          await robovac.cleanRooms(payload.split(',').map(Number));
        }
      };

      node.on('input', async (msg) => {
        const command = config.command;
        try {
          await ACTIONS[command](msg.payload);
        } catch (error) {
          node.error(error);
        }
      });
    }
  }

  RED.nodes.registerType('in', EufyRobovacInputNode,
    {
      defaults: {
        config: {
          value: '',
          type: 'eufy-robovac-config'
        }
      }
    }
  );
};
