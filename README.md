# What's this
Injector Decorator for Angular 1.x
It's useful when your are writing Angular 1.x application in ES2015 or TypeScript

## Install
```
npm i ng-injector --save
```

## usage

### es2015
user_service.js
```js
'use strict'

import {injector} from 'ng-injector'
@injector([
  '$q'
])
export class UserService {
  getAppName() {
    return this.$q.resolve('teambition!')
  }
}
```
home_view.js
```js
'use strict'
import {injector} from 'ng-injector'

@injector([
  '$timeout',
  'UserService'
])
export class HomeView {
  constructor() {
    this.$timeout(() => this.title = 'HomeView', 100)
    this.UserService
      .getAppName()
      .then(appName => {
        this.appName = appName
      })
  }
}
```
home.html

```html
<div ng-controller="HomeView as HomeCtrl">
  <span class="title">{{HomeCtrl.title}}</span>
  <span class="app-name">{{HomeCtrl.appName}}</span>
</div>

```

app.js
```js
'use strict'
import {HomeView} from './home_view'
import {UserService} from './user_service'
angular.module('YourModuleName', [])
  .service('UserService', UserService)
  .controller('HomeView', HomeView)
```

### TypeScript

user_service.ts
```ts
'use strict'

import {injector} from 'ng-injector'
@injector([
  '$q'
])
export class UserService {

  private $q: angular.IQService

  getAppName() {
    return this.$q.resolve('teambition!')
  }
}
```

home_view.ts
```ts
'use strict'
import {injector} from 'ng-injector'
import {UserService} from './user_service'

@injector([
  '$timeout',
  'UserService'
])
export class HomeView {

  public appName: string

  private $timeout: angular.ITimeoutService
  private UserService: UserService

  constructor() {
    this.$timeout(() => this.title = 'HomeView', 100)
    this.UserService
      .getAppName()
      .then(appName => {
        this.appName = appName
      })
  }
}
```
home.html

```html
<div ng-controller="HomeView as HomeCtrl">
  <span class="title">{{HomeCtrl.title}}</span>
  <span class="app-name">{{HomeCtrl.appName}}</span>
</div>

```

app.ts
```ts
'use strict'
import {HomeView} from './home_view'
import {UserService} from './user_service'
angular.module('YourModuleName', [])
  .service('UserService', UserService)
  .controller('HomeView', HomeView)
```

