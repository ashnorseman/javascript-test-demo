# Javascript Test starter

by: Ash

## 前端单元测试包括哪些内容？ ##

### 纯逻辑代码 ###

不涉及浏览器环境，和语言特性无甚关联，测试方式与后台单元测试相同

```javascript
/**
 1. Add certain dates to a date
 2. @param {number|Date} timestamp - original date
 3. @param {number} dates - positive: future, negative: past
 4. @returns {Date}
 */
function addDate(timestamp, dates) {
    var date = new Date(timestamp);

    if (!_.isValidDate(date)) return _.addDate(new Date(), dates);

    return new Date(date.valueOf() + 1000 * 60 * 60 * 24 * dates);
}
```

### DOM 操作 ###

涉及 DOM 节点，必须在浏览器环境下才能测试。
基本思路：往 DOM 里 append 生成的元素，各种运用 DOM api 测试，然后删除元素。

```javascript
/**
 * Test if an element is the child of another
 * @param {string|HTMLElement|jQuery} parent
 * @returns {boolean}
 */
function isChildOf(parent) {
    var node = this[0].parentNode;

    parent = $(parent)[0];

    do {
        if (node === parent) return true;
        node = node.parentNode;
    } while (node);

    return false;
}
```  

### 框架相关 ###

一般需要与框架搭配的特定测试工具结合测试

```javascript
// React
export default function Button({
  children,
  className,
  icon,
  link,
  ...props
}) {
  const classes = mixClass({
      'btn': true,
      'btn-link': link,
      '$': className
    }),

    iconNode = icon
      ? <Icon name={icon} />
      : null;

  return (
    <button className={classes} {...props}>
      {iconNode}
      {children}
    </button>
  );
}
```

## 测试环境搭建 ##

[Karma][1] + [Jasmine][2]

### 安装依赖 ###

* Karma 可以运行的 Node.js 版本为： 0.10, 0.12.x, 4.x, 5.x.

全局的 CLI 支持（只需安装一次）

```
sudo npm install -g karma-cli
```

进入项目……

```
// 在问及 test 的时候，填写 karma start
npm init

// 安装 Karma、Jasmine 插件、 Chrome 插件、Webpack 插件
npm install -D jasmine-core webpack karma karma-jasmine karma-chrome-launcher karma-webpack

// 初始化 Karma 配置文件，一路回车，在根目录生成 karma.conf.js
karma init
```

### ES6 ###

如果要使用 ES6……

额外安装 Babel（以下配置适用于 6.x）：

```
npm install -D babel-core babel-preset-es2015 babel-loader
```

搞定 Babel 的配置 `.babelrc`

```javascript
{
    "presets": ["es2015"]
}
```

并在 Webpack 里添加相应的 loader

```javascript
module: {
    loaders: [
        {
            test: /\.js?$/,
            loaders: ['babel']
        }
    ]
}
```

### 安排测试目录结构 ###

原则：
1. 统一入口
2. 具体测试内容与组件/业务代码放在一起
3. 测试文件统一命名

在根目录新建 `test` 文件夹，再新建 `index.js` ，作为测试入口：

```
- root
    - test
        index.js
```

肩负重任的 `index.js`：注入 `/src` 目录下所有 `-test.js` 结尾的文件

```javascript
const context = require.context('../src', true, /-test\.js$/);
context.keys().forEach(context);
```

修改 `karma.conf.js`，使 Karma 启动时加载 `index.js`

```javascript
files: [
    'test/index.js'
]

/* ---------- */

preprocessors: {
    'test/index.js': ['webpack']
}
```

业务代码和测试代码

```
- src
    - dateUtils
        - __test__
            dateUtils-test.js
        index.js
```

环境搭建完成，请欢快地使用 TDD 开发吧！

  [1]: http://karma-runner.github.io/
  [2]: http://jasmine.github.io/
