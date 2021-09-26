/**
 * 参考文档
 * 【eslint英文文档】https://eslint.org/docs/user-guide/configuring
 * 【eslint中文文档】http://eslint.cn/docs/rules/
 */

/**
 * eslint有三种使用方式
 * 【1】js代码中通过注释的方式使用
 * 【2】通过webpack的eslintConfig字段设置，eslint会自动搜索项目的package.json文件中的配置
 * 【3】通过配置文件的方式使用，配置文件有多种文件方式，如JavaScript、JSON 或者 YAML等
 */

/**
 * 文件忽略
 * 【】让eslint跳过特定文件的检测
 * 【】通过当前工作目录下 「.eslintignore」 文件进行设置
 *  其使用的是Glob路径书写方式，与「.gitignore」的使用方法相同
 * 【】也可以在 package.json 文件中，通过 eslintIgnore 参数进行设置
 */

/**
 * 文件内局部设置
 * 【】eslint可以具体文件中设置特定代码的规则，常用于跳过某条语句的检测。
 * 【】注销全部规则，在代码前新建一行，添加注销 /* eslint-disable *\/  。如果没有恢复设置的语句，则下列全部代码都会跳过检测。
 * 【】恢复eslint，在代码前新建一行，添加注销 /* eslint-enable *\/
 * 【】指定忽略的规则，/* eslint-disable no-alert, no-console *\/
 * 【】在特定行禁用，// eslint-disable-line
 * 【】在下一行禁用，// eslint-disable-next-line
 */
module.exports = {
    /**
     * 运行环境
     * http://eslint.cn/docs/user-guide/configuring#specifying-environments
     * 【】一个环境定义了一组预定义的全局变量
     * 【】获得了特定环境的全局定义，就不会认为是开发定义的，跳过对其的定义检测。否则会被认为改变量未定义
     * 【】常见的运行环境有以下这些，更多的可查看官网
     * browser - 浏览器环境中的全局变量。
     * node - Node.js 全局变量和 Node.js 作用域。
     * es6 - 启用除了 modules 以外的所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6）。
     * amd - 将 require() 和 define() 定义为像 amd 一样的全局变量。
     * commonjs - CommonJS 全局变量和 CommonJS 作用域 (用于 Browserify/WebPack 打包的只在浏览器中运行的代码)。
     * jquery - jQuery 全局变量。
     * mongo - MongoDB 全局变量。
     * worker - Web Workers 全局变量。
     * serviceworker - Service Worker 全局变量。
     */
    "env": {
        "browser": true, // 浏览器环境（还有一个是node）
        "es6": true,
        "node": true
    },
    /**
     * 规则继承
     * http://eslint.cn/docs/user-guide/configuring#extending-configuration-files
     *【】可继承的方式有以下几种
     *【】eslint内置推荐规则，就只有一个，即「eslint:recommended」
     *【】可共享的配置， 是一个 npm 包，它输出一个配置对象。即通过npm安装到node_module中
     *  可共享的配置可以省略包名的前缀 eslint-config-，即实际设置安装的包名是 eslint-config-airbnb-base
     *【】从插件中获取的规则，书写规则为 「plugin:插件包名/配置名」，其中插件报名也是可以忽略「eslint-plugin-」前缀。如'plugin:vue/essential'
     *【】从配置文件中继承，即继承另外的一个配置文件，如'./node_modules/coding-standard/eslintDefaults.js'
     */
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    /**
     * 全局变量
     * http://eslint.cn/docs/user-guide/configuring#specifying-globals
     * 【】定义额外的全局，开发者自定义的全局变量，让其跳过no-undef 规则
     * 【】key值就是额外添加的全局变量
     * 【】value值用于标识该变量能否被重写，类似于const的作用。true为允许变量被重写
     * 【】注意：要启用no-global-assign规则来禁止对只读的全局变量进行修改。
     */
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "process": true
    },
    /**
     * 解析器配置项
     * http://eslint.cn/docs/user-guide/configuring#specifying-parser-options
     * 【】这里设置的配置项将会传递到解析器中，被解析器获取到，进行一定的处理。具体被利用到，要看解析器的源码有没有对其进行利用。这里仅仅做了参数定义，做了规定，告诉解析器的开发者可能有这些参数
     * 【】配置项目有：
     * "sourceType": "module",  // 指定JS代码来源的类型，script(script标签引入？) | module（es6的module模块），默认为script。为什么vue的会使用script呢？因为vue是通过babel-loader编译的，而babel编译后的代码就是script方式
     * "ecmaVersion": 6,     // 支持的ES语法版本，默认为5。注意只是语法，不包括ES的全局变量。全局变量需要在env选项中进行定义
     * "ecmaFeatures": {     // Features是特征的意思，这里用于指定要使用其他那些语言对象
    "experimentalObjectRestSpread": true, //启用对对象的扩展
    "jsx": true,              //启用jsx语法
    "globalReturn":true,          //允许return在全局使用
    "impliedStrict":true          //启用严格校验模式
      }
     */
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "parser": "babel-eslint" // 懒加载报错 Unexpected token import
    },
    "plugins": [
        "vue"
    ],
    "rules": {
    }
};