---
layout: post
title: Create Hello World Function - JavaScript
---

**Challenge:**

Write a function `createHelloWorld`. It should return a new function that always returns `"Hello World"`.

**Example 1:**
```javascript
Input: args = []
Output: "Hello World"
Explanation:
const f = createHelloWorld();
f(); // "Hello World"

The function returned by createHelloWorld should always return "Hello World".
```

**Example 2:**
```javascript
Input: args = [{},null,42]
Output: "Hello World"
Explanation:
const f = createHelloWorld();
f({}, null, 42); // "Hello World"

Any arguments could be passed to the function but it should still always return "Hello World".
```

**Constraints:** <br>
`0 <= args.length <= 10`

**My Answer:**
```javascript
var createHelloWorld = function() {
    return function() {
        return "Hello World";
    }
};
```