# What's this
Injector Decorator for Angular 1.x
It's useful when your are writing Angular 1.x application in ES2015 or TypeScript

## Install
```
npm i ng-injector --save
```

## usage

### es2015
home_view.js
```js
'use strict'
import {ctrlInjector} from 'ng-injector'

@ctrlInjector([
  '$timeout'
])
export class HomeView {
  constructor() {
    this.$timeout(() => this.title = 'HomeView', 100)
  }
}
```
home.html

```html
<div ng-controller="HomeView as HomeCtrl">
  <span class="title">{{HomeCtrl.title}}</span>
</div>

```

app.js
```js
'use strict'
import {HomeView} from './home_view'
angular.module('YourModuleName', [])
  .controller('HomeView', HomeView)
```

### TypeScript

home_view.ts
```ts
'use strict'
import {ctrlInjector} from 'ng-injector'

@ctrlInjector([
  '$timeout'
])
export class HomeView {

  private $timeout: angular.ITimeoutService

  constructor() {
    this.$timeout(() => this.title = 'HomeView', 100)
  }
}
```
home.html

```html
<div ng-controller="HomeView as HomeCtrl">
  <span class="title">{{HomeCtrl.title}}</span>
</div>

```

app.ts
```ts
'use strict'
import {HomeView} from './home_view'
angular.module('YourModuleName', [])
  .controller('HomeView', HomeView)
```

## inject $scope default

```js
'use strict'
import {ctrlInjector} from 'ng-injector'

@ctrlInjector()
class HomeView {
  constructor() {
    console.log(this.$scope) // Your Scope Here
  }
}

```
