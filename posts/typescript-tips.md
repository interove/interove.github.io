---
title: TypeScript 实用技巧与最佳实践
date: 2025-03-10
tags: [技术, TypeScript]
summary: 整理了一些日常开发中非常实用的 TypeScript 技巧，帮助你写出更安全、更优雅的代码。
---

# TypeScript 实用技巧与最佳实践

TypeScript 已经成为现代前端开发的标配，但很多人只用到了其中一小部分功能。本文整理了一些日常开发中非常实用的技巧。

## 1. 使用 `satisfies` 操作符

`satisfies` 是 TS 4.9 引入的运算符，可以在不改变推断类型的前提下验证类型约束：

```typescript
type Color = 'red' | 'green' | 'blue';
type Theme = Record<string, Color | [number, number, number]>;

const palette = {
  red: [255, 0, 0],
  green: '#00ff00',  // ❌ 报错！不是合法的 Color
  blue: 'blue',
} satisfies Theme;

// palette.red 仍然是 number[] 而不是 Color | number[]
palette.red.map(x => x * 2); // ✅ 正常
```

## 2. 条件类型的妙用

```typescript
// 提取 Promise 的返回值类型
type Awaited<T> = T extends Promise<infer R> ? R : T;

type Result = Awaited<Promise<string>>; // string

// 递归提取嵌套 Promise
type DeepAwaited<T> = T extends Promise<infer R> ? DeepAwaited<R> : T;

type Deep = DeepAwaited<Promise<Promise<number>>>; // number
```

## 3. 模板字面量类型

```typescript
type EventName = 'click' | 'focus' | 'blur';
type Handler = `on${Capitalize<EventName>}`;
// 'onClick' | 'onFocus' | 'onBlur'

type CSSProperty = 'margin' | 'padding';
type Direction = 'Top' | 'Right' | 'Bottom' | 'Left';
type CSSBoxProperty = `${CSSProperty}${Direction}`;
// 'marginTop' | 'marginRight' | ... | 'paddingLeft'
```

## 4. 使用 `infer` 提取类型

```typescript
// 提取函数参数类型
type FirstParam<T extends (...args: any) => any> =
  T extends (first: infer F, ...rest: any) => any ? F : never;

const add = (a: number, b: string) => a + b;
type First = FirstParam<typeof add>; // number
```

## 5. 利用工具类型组合

```typescript
// 将某些字段变为可选
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

type CreateUserInput = PartialBy<User, 'id' | 'avatar'>;
// { name: string; email: string; id?: number; avatar?: string }
```

## 6. 严格的对象字面量检查

```typescript
// 使用 never 防止多余属性
type StrictRecord<K extends string, V> = {
  [P in K]: V;
} & {
  [P in Exclude<string, K>]?: never;
};
```

## 总结

TypeScript 的类型系统非常强大，掌握这些高级特性可以：

- 🛡️ 更早发现 bug
- 📝 代码即文档
- 🔧 更好的 IDE 支持
- 🤝 团队协作更顺畅

持续学习，类型安全！
