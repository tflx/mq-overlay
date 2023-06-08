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
import GridOverlay from 'mq-overlay';
new GridOverlay();
```

To make sure you only see the overlay in development, you can use the `NODE_ENV` variable:

```js
if (process.env.NODE_ENV === 'development') {
  new GridOverlay();
}
```

## Options
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `gridClass` | `string` | `grid` | The name of a css class that defines your grid |
| `columnProp` | `string` | `--grid-columns` | The name of a css custom prop that defines the number of columns |

## Example

```js
import GridOverlay from 'mq-overlay';
new GridOverlay({
  gridClass: 'my-grid',
  columnProp: '--my-grid-columns'
});
```

## Todo
[ ] Specify options as object with 'columns', 'gap', 'margin', 'maxWidth' as Numbers