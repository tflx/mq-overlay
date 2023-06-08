# MQ Overlay

Overlay showing your media queries for development.

## Install the package

```bash
npm install mq-overlay --save-dev
```
…or
```bash
yarn add mq-overlay --dev
```

## Import and initialize it:

```js
import MqOverlay from "./mq-overlay.js";
const overlay = new MqOverlay({
  sizes: {
    'screen-xs': 360,
    'screen-sm': 768,
    'screen-md': 1024,
    'screen-lg': 1200,
    'screen-xl': 1440
  },
  autoHide: false
});
```

To make sure you only see the overlay in development, you can use the `NODE_ENV` variable:

```js
if (process.env.NODE_ENV === 'development') {
  const overlay = new MqOverlay({
    sizes: {
      'screen-xs': 360,
      'screen-sm': 768,
      'screen-md': 1024,
      'screen-lg': 1200,
      'screen-xl': 1440
    },
    autoHide: false
  });
}
```

## Options
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `sizes` | `object` | `undefined` | The name of a css class that defines your grid |
| `autoHide` | `boolean` | `false` | The name of a css custom prop that defines the number of columns |

