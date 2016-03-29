declare module 'ng-injector' {
  export function ctrlInjector(deps: string[]): (target: any) => void
  export function serviceInjector(deps: string[]): (target: any) => void
}
