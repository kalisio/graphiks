# @kalisio/graphiks

> A minimal parametric shape factory for SVG graphics — built in pure JavaScript.

**Graphiks** is a lightweight and extensible library for creating, composing, and rendering parametric shapes using **SVG**.
It provides a simple factory pattern that lets you register your own shape generators and render them as SVG elements.

## Features

- 🧠 **Factory pattern** — register, list, and create shapes dynamically
- 🧩 **Composable** — shapes can contain other shapes (`<g>` groups)
- 🎨 **SVG-based rendering** — outputs real DOM elements
- ⚙️ **Zero dependencies** — pure, modern JavaScript
- 🔄 **Extensible** — plug in your own generators or interfaces (Canvas, WebGL, …)

---

## Usage

### Installation

```bash
npm install @kalisio/graphiks
```

Or

```
yarn add @kalisio/graphiks
```

Or use it directly from a CDN:

```html
<script type="module">
  import { Graphiks } from 'https://unpkg.com/@kalisio/graphiks/dist/graphiks.es.js'
</script>
```

### Example


## API

### Graphiks()

Creates a new factory instance.

Returns a callable function:

```js
const graphiks = Graphiks()
const shape = graphiks(type, options)
```

| Method                                 | Description                                |
| -------------------------------------- | ------------------------------------------ |
| `graphiks.register(type, generatorFn)` | Registers a new shape generator            |
| `graphiks.list()`                      | Returns all registered shape types         |
| `graphiks(type, options)`              | Creates a shape instance as an SVG element |


## License

Copyright (c) 2025-20xx Kalisio

Licensed under the [MIT license](LICENSE).

## Authors

This project is sponsored by

[![Kalisio](https://s3.eu-central-1.amazonaws.com/kalisioscope/kalisio/kalisio-logo-black-256x84.png)](https://kalisio.com)