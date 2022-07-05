---
aside: deep
---

# Module Information

The module can have any structure, which means it can be a single functionality or a large and complex business logic. We divide modules at our discretion and it is also our decision what structure they will have.

::: warning
The most important thing is to keep the main files in the <code>src</code> directory when creating the module.
:::

![](/images/content/module-info-whole-example-dir.jpg)

## Types

Modules can be divided into two types. The type determines the place from which the module is loaded.

- `local`: Modules placed locally in the project in the default `modules` directory. These modules are only available in the project and are fully modifiable.

::: info
  Changing the default directory for local modules: <a href="/guide/options#modulesdir"><code>modulesDir option</code></a>
:::


- `npm`: Modules hosted on external servers. Module is available when we install the package in the project (`npm i module-name`). <br>These modules are unmodifiable and they are updated only by upgrading the npm package version.

::: info
  Changing the directory for installed npm packages: <a href="/guide/options#nodemodulesdir"><code>nodeModulesDir option</code></a>.
:::

::: info
  Changing the directory attached to the symbolic link: <a href="/guide/options#vendordir"><code>vendorDir option</code></a>.
:::

## Module naming

### Local
The names of local modules are determined based on the directory structure. The adopted and recommended directory structure is based on the concept [npm scope](https://docs.npmjs.com/about-scopes).

<pre>
modules/
|-- @test/
    |-- my-local-module/
|-- users/
</pre>

### npm
The names of the npm modules are consistent with the approach of creating npm packages.
The modules in this section must be hosted on the exterbak server (npm, yarn, gitlab).


#### **Example**

```typescript [nuxt.config.ts]
import { defineConfig } from 'nuxt-splitty'

export default defineConfig({
  modules: {
    npm: [
      '@scope/ui-module',
    ],
    local: [
      '@test/my-local-module',
      'cart',
    ],
  },
})
```

## Directory structure

Directory structure is very similar to the structure of the Nuxt 3.x project.

<!-- If you want to change the default directory structure, you have to change it in the [VueMS options][vuems-dirs]. -->


**Directories:**

* **`assets`**<br>
    The assets directory contains uncompiled assets such as your styles, images, or fonts.

* **`components`**<br>
    The components directory is where you put all your Vue.js components which are then imported into your pages.

* **`composables`**<br>
    Put all your composables here. (You can speciafy auto import in the module config)

* **`config`**<br>
    All [module configuration][doc-config] files.

* **`defaults`**<br>
    All module default vars.

* **`layouts`**<br>
    Application layouts.

* **`locales`**<br>
    Module i18n translations.

* **`middleware`**<br>
    The middleware directory contains application middleware. <br>
    Middleware lets you define custom functions that can be run before rendering either a page or a group of pages (layout).

* **`mixins`**<br>
    All module mixin files.

* **`models`**<br>
    All module models files.

* **`pages`**<br>
    The pages directory contains your application's views and routes.

* **`plugins`**<br>
    The plugins directory contains Javascript plugins that you want to run before instantiating the root Vue.js Application.

* **`store`**<br>
    The store directory contains Vuex Store files.<br>
    Directory with configuration under store are considered as store modules, with a name such as directory name.


<!-- TODO correct link -->
[doc-config]: /guide/module/config#config-directory
