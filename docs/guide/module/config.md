---
aside: deep
---
Each module needs several things to work properly.


## `config` directory:

The greatest advantage of modules based on the **NuxtMicroServices** library is their advanced expandability.
Each module contains a directory `config` in which all configurations related to this module can be found.

The most important configuration file is `config/index.ts`, which contains everything you need to load the module correctly.
All other files are optional and depend on the purpose of the module.
Some of the files kept in the `config` directory are just help files to keep order and structure in code.


### Main configuration

The main configuration is placed in the `config/index.ts` file.
The file exports the properties needed to correctly configure the module.

> It is **required** file.

```typescript [config/index.ts]
import type { NMSModuleConfig } from 'nuxt-splitty'

export default <NMSModuleConfig>{
  /* module options */
}
```

#### Properties:

---

* **`name`**
  - Type: `String`
  - **Required: `true`**
  - Example: `'cart' | '@scope/cart' | '@local/demo'`

Module name including scope, used for correct module loading. The file path is built on its base.

::: info
  For more information about naming the modules <a href="/guide/module/info#module-naming">here</a>.
:::

---

* **`order`**
  - Type: `Number`
  - Required: `false`
  - Default: `1000`

The sequence of loading modules in the application. This may be important when the modules have a relationship with each other.

If the default value is not set to `1000`, the modules will be loaded at the **end**.

::: info
  The modules have a set integer value (e.g. <code>order: 20</code>).
:::

---

* **`aliases`**
  - Type: `Object`
  - **Required: `true`**

The main mechanism of **communication** between the modules.

By specifying the alias, we create a name by which we will referencing the resources of this module.

<code-group>
  <code-block label="Definition" active>

  ```typescript [config/index.ts]
  import type { NMSModuleConfig } from 'nuxt-splitty'

  export default <NMSModuleConfig>{
    aliases: {
      '@Core': './',
      '@CoreComponents': './components',
    },
  }
  ```

  </code-block>
  <code-block label="Use">

  ```typescript [components/example.vue]
    // components/example.vue

    import List from '@Core/components/List/List';
    //or
    import List from '@CoreComponents/List/List';
  ```

  </code-block>
</code-group>

::: info
  We can create <b>any number</b> of aliases, referring to different places in the module.
:::

---

* **`relations`**
  - Type: `Array`
  - Required: `false`

If the modules are linked to each other, the names of the linked modules must be given here.

```typescript [config/index.ts]
import type { NMSModuleConfig } from 'nuxt-splitty'

export default <NMSModuleConfig>{
  // ...
  relations: [
    '@scope/ui',
    '@scope/media',
  ],
}
```

::: info
  When the module is in this section and is not loaded, <b>`NuxtMicroServices`</b> will return a reference error.
:::

---

* **`replacements`**
  - Type: `Object`
  - Required: `false`

It defines the elements of the module that will be replaced by others. <br>
Simple mechanism of mapping elements to be replaced with a new element.


```typescript [config/index.ts]
import type { NMSModuleConfig } from 'nuxt-splitty'

export default <NMSModuleConfig>{
  // ...
  replacements: {
    '@Core/components/coreComponent': '/components/myComponent',
  },
}
```

::: info
  The item to be replaced can <b>be any file and must exist</b> in the application.
:::

---

* **`plugins`**
  - Type: `Array`
  - Required: `false`

It defines the plugins that are loaded globally into the application.


```typescript [config/index.ts]
import type { NMSModuleConfig } from 'nuxt-splitty'

export default <NMSModuleConfig>{
  // ...
  plugins: [
    {
      src: './plugins/axios',
      mode: 'all', // 'all' | 'client' | 'server'
    },
  ],
};
```
::: info
  The <code>mode</code> flag is set when you want to configure client- or server-specific plugins.
  By default, mode is set to <code>all</code>.
:::

---

* **`css`**
  - Type: `Array`
  - Required: `false`

Defines css styles that are defined globally for the entire application.

```typescript [config/index.ts]
import type { NMSModuleConfig } from 'nuxt-splitty'

export default <NMSModuleConfig>{
  // ...
  css: [
    './assets/scss/reset.scss',
    './assets/scss/font-inter-ui.scss',
  ],
};
```
::: info
  More information <a href="https://v3.nuxtjs.org/api/configuration/nuxt.config#css" target="_blank">here</a>.
:::

---

* **`styleResources`**
  - Type: `Object`
  - Required: `false`

Share variables, mixins, functions across all style files (no @import needed). It Supports the sass/scss files only for now.

```typescript [config/index.ts]
import type { NMSModuleConfig } from 'nuxt-splitty'

export default <NMSModuleConfig>{
  // ...
  styleResources: {
    scss: [
      './assets/scss/_vars.scss',
      './assets/scss/_mixins.scss',
    ],
  },
};
```
::: warning
**Do not import actual styles**. Use this module only to import variables, mixins, functions (et cetera) as they won't exist in the actual build. Importing actual styles will include them in every component and will also make your build/HMR magnitudes slower. Do not do this!
:::

---

* **`autoImports`**
  - Type: `Array`
  - Required: `false`

The property setups the nuxt auto-imports helper functions, composables and Vue APIs to use across your application without explicitly importing them.

For example we have composable, that helps to inject some data into the components.

```typescript
// composables/dialog.ts
import { DIALOG_INJECTION_KEY } from '@Core/defaults/dialog'

export const useDialog = () => {
  const $dialog = inject(DIALOG_INJECTION_KEY)

  return $dialog
}
```

Let's setup auto import, to use this composable in the components.

```typescript [config/index.ts]
import type { NMSModuleConfig } from 'nuxt-splitty'

export default <NMSModuleConfig>{
  // ...
  autoImports: [{
    name: 'useDialog',
    // 'as' is optional. If not specified, the `name` will be used.
    as: 'useCoreDialog', 
    from: './composables/dialog',
  }],
};
```

Usage:

```vue
<script lang="ts" setup>
  // components/example.vue
  const $dialog = useCoreDialog()

  const openDialog = () => {
    $dialog.open()
  }
</script>
```

---

**Example:**

```typescript
import type { NMSModuleConfig } from 'nuxt-splitty'

export default <NMSModuleConfig>{
  name: 'core',
  aliases: {
    '@Core': './',
  },
  relations: [
    'ui',
  ],

  plugins: [
    {
      src: './plugins/dialog',
    },
  ],

  autoImports: [{
    name: 'useDialog',
    as: 'useCoreDialog',
    from: './composables/dialog',
  }],

  css: [
    './assets/scss/main.scss',
  ],

  styleResources: {
    scss: [
      './assets/scss/_vars.scss',
    ],
  },
}
```

### Routing

File required if the module has pages and wants to define its own routing. <br>
If the routing exists, **you must create** a file named `routes.ts` and put all the routing rules in it.<br>


The **array** exported in the file is parsed and passed to the Nuxt.


```typescript
// @Core/config/routes.ts
import type { NMSRoutesConfig } from 'nuxt-splitty'

export const ROUTE_NAME = {
  HOME: 'home',
  ABOUT: 'about',
}

const routes: NMSRoutesConfig = [
  {
    path: '/',
    name: ROUTE_NAME.HOME,
    file: './pages/home.vue',
  },
  {
    path: '/about',
    name: ROUTE_NAME.ABOUT,
    file: './pages/about.vue',
  },
]

export default routes
```
<!-- 
### Extend

Creating new modules is not all we usually need.
Sometimes you need to replace certain elements or add some to already existing solutions.

In order not to modify existing modules, **VueMS library** provides a solution to easily extend already existing mechanisms.
Thanks to it we have a lot of possibilities to extend modules from other modules.

In order to add any extensions you need to create an `extends.js` file
and use specific properties in it depending on what you want to achieve.


::: info
  You don't need to create an <code>extends.js</code>  file if you don't want to extend anything
:::

#### Properties:
---

* `replaceRoutes`
    - Type: `Array`

This functionality allows you to replace a routing page by his name.
The mechanism is based on routing and extends existing routing.

**`replaceRoutes`:**<br>
    - `name` - existing router name what we want replace,<br>
    - `routes` - new routing to replace,<br>

```javascript [@Products/config/extends.js]
export default {
    replaceRoutes: [
        {
            name: 'products',
            routes: {
                name: 'products-new',
                path: '/new-products',
                component: Tabs.Product,
                meta: {
                    title: 'New Products',
                    visible: false,
                    breadcrumbs: [
                        {
                            title: 'New Products',
                            icon: Icons.Product,
                        },
                    ],
                    privileges: [],
                },
            },
        },
    ],
};
```
::: info
  The extended routing <b>must exist</b>. The mechanism substitutes all routing with the given name. <br>First the routing is replaced and then extended (<code>extendRoutesChildren</code>), so if a routing is added to the given name, it will be added correctly.
:::

---

* `extendRoutesChildren`
    - Type: `Array`

This functionality allows you to add a new children to a routing page.
The mechanism is based on routing and extends existing routing.

**`extendRoutesChildren`:**<br>
    - `name` - existing router name what we want extend,<br>
    - `children` - array with router to extend,<br>


```javascript [@Products/config/extends.js]
export default {
    extendRoutesChildren: [
        {
            name: 'product-id',
            children: [
                {
                    name: 'product-id-variants',
                    path: 'variants',
                    component: Tabs.ProductVariantsTab,
                    meta: {
                        title: 'Variants',
                        visible: false,
                        breadcrumbs: [
                            {
                                title: 'Products',
                                icon: Icons.Product,
                            },
                            {
                                title: 'Catalog',
                                routeName: 'catalog-products',
                            },
                        ],
                        privileges: [],
                    },
                },
            ],
        },
    ],
};
```

::: info
  The extended routing <b>must exist</b>, if it does not have the <code>children</code> property then it will be added.
:::

---

* `extendStore`
    - Type: `Object`

A mechanism to expand existing [**Vuex store**](https://vuex.vuejs.org/).
If there is a need to extend an already existing **Vuex store** then you should use this property.

When using `extendStore`, the **key** is the name of the existing Vuex store
and the **value** is the file that exports the content of the extended methods.

> Vuex store runs on [vuex modules](https://vuex.vuejs.org/guide/modules.html) mechanism.


```javascript [@Products/config/extends.js]
export default {
    extendStore: {
        product: () => import('@Products/extends/store/product').then(m => m.default || m),
    },
};
```

::: info
  If you want to expand the <a href="https://vuex.vuejs.org/" target="_blank">Vuex store</a>, you should place it in a different directory than the <code>store</code>.
  We recommend that you use the <code>extends</code> directory.
:::

<p align="center">
</p>

::: warning
  If you create the <code>store</code> directory on the module root and place a <a href="https://vuex.vuejs.org/" target="_blank">Vuex store</a> with an existing name in it, it will be replaced (The order of loading the modules is important).
:::

---

* `extendComponents`
    - Type: `Object`

One of the important mechanisms is the possibility of **extending existing components** from outside.
The operation of the components allows them to be reusable and used anywhere,
but the problem is when we want to extend an existing component in a specific business context.
Therefore, we have prepared a mechanism that allows you to easily **inject** a component into a specific location.

The component expansion mechanism works similarly to the placeholder placed in the text,
the placeholder is replaced by the data passed on to it. Our component expansion mechanism works the same way,
with the appropriate placeholders scattered throughout the application, which can be referenced and passed on to the component.

There are predefined places ready for expansion throughout the application.

  **Example**:

<code-group>
  <code-block label="Definition" active>

  ```javascript [config/extends.js]
    const Navigation: () => import('@Notifications/components/Navigation');

    export default {
      extendComponents: {
        NAVIGATION_BAR: [
          {
            component: Navigation,
            props: {
              propsToSend: true,
            },
          },
        ],
      },
    };
  ```

  </code-block>
  <code-block label="Use">

  ```html [components/Extends.vue]
    <template v-for="(component, index) in extendedComponents">
        <Component
            :is="component.component"
            :key="index"
            v-bind="component.props" />
    </template>

    <script>
      export default {
        computed: {
          extendedComponents() {
            return this.$getExtendSlot('NAVIGATION_BAR');
          },
        },
      };
    </script>
  ```

  </code-block>
</code-group>

::: info
  Placeholder names are defined by the access path to the component <br>
  (e.g <code>@Products/components/Forms/ProductForm</code> - extend product form component).
  We recommend this approach because it is very clear.
:::

::: info
  There is a global <code>$getExtendSlot</code> method in the application that takes all the components
  passed for expansion and places them in a prepared place.
:::

---

* `extendMethods`
  - Type: `Object`

The mechanism works the same as `extendComponents`, but instead of the components the placeholders are filled with methods.

The methods can return information or just set up some data.

The methods can take any parameters, it depends on the information provided while creating the placeholder.

**Example:**

<code-group>
  <code-block label="Definition" active>

  ```javascript [@ExtendStore/config/extends.js]
    export default {
        extendMethods: {
            '@Test/store/test/action': ({
                $this, data = [],
            }) => {
                console.log({$this, data});
                return data;
            }
        },
    }
  ```

  </code-block>
  <code-block label="Use">

  ```javascript [@Test/store/test/action]
    export default {
        create({ state }) {
            ...
            this.$getExtendMethod('@Test/store/test/action');
            ...
        }
    }
  ```

  </code-block>
</code-group>

::: info
  There is a global <code>$getExtendMethod</code> method in the application that takes all the methods
  passed for expansion and places them in a prepared place.
:::

::: info
  The methods work in <b>asynchronous</b> mode.
:::


### Helpers

Support files are files that are not imposed by **VueMS**, they are to make your work easier. <br>


* `privileges.js`
A file storing all permissions imposed by the module. Used mainly in routing - `routes.js`.

```javascript
export default {
    SETTINGS: {
        namespace: 'SETTINGS',
        create: 'SETTINGS_CREATE',
        read: 'SETTINGS_READ',
        update: 'SETTINGS_UPDATE',
        delete: 'SETTINGS_DELETE',
    },
};
```

* `imports.js`
A file storing all imports needed in the configuration files.

```javascript
export const Pages = {
    Login: () => import('@Core/pages/login/index').then(m => m.default || m),
};

export const Tabs = {
    MainSettingsTab: () => import('@Core/components/Tabs/MainSettingsTab').then(m => m.default || m),
};
```

::: info
  Of course, if you want, you can create your own support files. The <code>config</code> directory is used for this.
::: -->


[vuems]: https://www.npmjs.com/package/@ergonode/vuems
[vuems-conf]: https://www.npmjs.com/package/@ergonode/vuems#config-directory
[vuex-module]: https://vuex.vuejs.org/guide/modules.html
[nuxt-css]: https://nuxtjs.org/api/configuration-css/
[nuxt-router]: https://github.com/nuxt-community/router-module
