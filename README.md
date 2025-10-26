# graphiks

> A minimal parametric shape factory for SVG graphics — built in pure JavaScript.

**Graphiks** is a lightweight and extensible library for creating, composing, and rendering parametric shapes using **SVG**.
It provides a simple factory pattern that lets you register your own shape generators and render them as SVG elements.

---

## Principle




## Usage

### Installation

Install from npm:

```bash
npm install @kalisio/graphiks
```

Or use **yarn**:

```bash
yarn add @kalisio/graphiks
```

Or use it directly from a CDN:

```html
<script type="module">
  import { Graphiks } from 'https://unpkg.com/@kalisio/graphiks/dist/graphiks.es.js'
</script>
```

### Quick start

```js
import { Graphiks } from '@kalisio/graphiks'

// create a factory instance
const graphiks = Graphiks()

// create an orange 4-point star with a red stroke
const star4 = graphiks('star4', { fill: 'orange', stroke: { red } })

// add the shape to the dom
const container = document.getElementById('#star5-container')
container.appendChild(star5.toSVG())
```

### Examples

Open the [live example page](https://kalisio.github.io/graphiks/example/index.html) in your browser

## API Reference

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

## Sponsors

This project is sponsored by

[![Kalisio](https://s3.eu-central-1.amazonaws.com/kalisioscope/kalisio/kalisio-logo-black-256x84.png)](https://kalisio.com)