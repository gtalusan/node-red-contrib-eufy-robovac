module.exports = (RED) => {
  class EufyRobovacEventNode {
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
      const events = config.output.split(',');
      events.forEach(event => {
        if (!event) {
          return;
        }
        robovac.on(event, (data) => {
          const msg = {
            payload: data
          };
          node.send(msg);
        });
      });

      const updateStatus = () => {
        if (robovac.connected) {
          node.status({ fill: 'green', shape: 'dot', text: 'Connected' });
        } else {
          node.status({ fill: 'red', shape: 'dot', text: 'Disconnected' });
        }
      };
      robovac.on('tuya.connected', updateStatus);
      robovac.on('tuya.disconnected', updateStatus);

      node.status({ fill: 'yellow', shape: 'dot', text: 'Connecting...' });
      updateStatus();
    }
  }

  RED.nodes.registerType('event', EufyRobovacEventNode,
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
