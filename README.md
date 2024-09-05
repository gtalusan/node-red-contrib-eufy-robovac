## Description

Node RED plugin wrapper around [eufy-robovac-js](https://github.com/gtalusan/eufy-robovac-js).

## Install

Run the following command in the root directory of your Node-RED install

    npm install @george.talusan/node-red-contrib-eufy-robovac

## Configuration

See https://github.com/markbajaj/eufy-device-id-python for obtaining your Eufy Robovac's device ID and local key.

## How to use

Drag an `in` or `out` node to your flow.  Choose or create a configuration.

`out` nodes can be configured to output any of `alerts`, `events` or `errors`.  See [eufy-robovac-js](https://github.com/gtalusan/eufy-robovac-js).  `payload` will contain the output of `eufy-robovac-js`.

`in` nodes can be configured to command your Robovac to go home, clean or enable/disable the locate beacon.  `payload` will contain a boolean which will be passed to the corresponding `eufy-robovac-js` function.  For example, `payload: true` with `out` configured to `Go Home` will tell the Robovac to start its journey back home.  Similarly, `payload: false` will stop its journey back home.  See the table below for more examples.

|command|payload|note|
|-------|-------|----|
|clean  |N/A    |    |
|cleanRooms|[1,3]|an array of numbers, 0-based|
|goHome |true/false|boolean|
|locate |true/false|boolean|

You may have multiple `in` and `out` nodes.  If they share the same configuration then they will share the same network connection to your Robovac.  Some Robovacs only like 1 connection, however in my testing, my X8 can support 3 simultaneous network connections.

## Examples

The `examples` sub-directory contains an example flow.
