type dependencis = string | string[]
declare module 'ng-injector' {
  export function injector(deps: dependencis): (target: any) => void
}
