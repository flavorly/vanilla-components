---
title: Getting started with Tailwind CSS
description: Learn Tailwind the way that best matches your learning style.
---

A simplified Tailwind CSS documentation site clone, built with [VitePress](https://vitepress.vuejs.org) and [Tailwind CSS](https://tailwindcss.com).

---

## Why?

I love building elegant websites, especially when both design and css are taken care of :stuck_out_tongue_winking_eye:. Inspired by [vuejs/blog](https://github.com/vuejs/blog).

## What's missing?

As you can see on the website, many functionalities and styles are not implemented for simplicity.

## Development

### Add a new document

Put your document inside `docs` folder. Note: nested directories are not supported.

And then edit `.vitepress/config.js`

```js
module.exports = {
  ...
  themeConfig: {
    ...
    collections: {
      'New category': [
        'your document',
      ],
      ...
    },
  },
}
```

### Configuration

Take a look at [VitePress](https://vitepress.vuejs.org/guide/customization.html)'s documentation might help you further understand the structure.
