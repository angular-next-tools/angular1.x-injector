'use strict'
export type dependencis = string | string[]
export function forEach<T>(target: Array<T>, eachFunc: (val: T, key: number) => void): void

export function forEach<T>(target: {
  [index: string]: T
}, eachFunc: (val: T, key: string) => void): void

export function forEach (target: any, eachFunc: (val: any, key: any) => void) : void

export function forEach (target: any, eachFunc: (val: any, key: any) => any) {
  if (!target) return
  let length: number
  if (target instanceof Array) {
    length = target.length
    for (let i = length - 1; i >= 0; i--) {
      eachFunc(target[i], i)
    }
  }else {
    const keys = Object.keys(target)
    let key: string
    length = keys.length
    for (let i = 0; i < length; i ++) {
      key = keys[i]
      eachFunc(target[key], key)
    }
  }
}
