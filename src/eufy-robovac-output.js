module.exports = (RED) => {
  class EufyRobovacOutputNode {
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

      node.status({ fill: 'green', shape: 'dot', text: 'Connected' });
    }
  }

  RED.nodes.registerType('out', EufyRobovacOutputNode,
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
