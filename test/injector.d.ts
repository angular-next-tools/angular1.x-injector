type dependencis = string | string[]
declare module 'ng-injector' {
  export function ctrlInjector(deps: dependencis): (target: any) => void
  export function serviceInjector(deps: dependencis): (target: any) => void
}
