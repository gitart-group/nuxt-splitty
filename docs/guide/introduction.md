---
aside: deep
---

# Introduction

Combination of Vue and NuxtJS frameworks gives us the opportunity to build any web application we want. Unfortunately, application built on this approach is monolithic and we cannot extend its behavior.


NuxtJS forces developers to have a specific directory structure (page, middleware, store, etc.). This gives us a rigid application built on specific principles.

NuxtMicroServices gives the possibility to divide the application into micro parts that use all Vue + NuxtJS mechanisms, but do not have their limitations.
Structure of these parts is identical to the monolithic application, however each service can operate separately, communicate and interact with one another.
The services can have small mechanisms and very complex structures.

<img src="/images/content/index-module-usage.png">
