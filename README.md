# practices
@(FP实践)[react|redux|redux-router|webpack|Immutable]
> **约定：** 
> 1. 开发前，请从develop分支创建新分支（如：develop_chenhf_0322）；开发测试完后，[提一个Pull requests](https://github.com/yy-chaok/practices/compare)给负责人。有任何疑问，优先[通过Issues提出](https://github.com/yy-chaok/practices/issues/new)；
> 2. 使用 [Immutable](https://www.processon.com/view/56fccdc3e4b0bf3d8fbd3047) 时，变量命名以 $$ 开头；使用 Immutable.fromJS来创建对象；

#### 项目初始化
``` 项目初始化
npm install
```
#### 启动 静态资源的web服务
``` 静态资源的web服务
npm run debug
```
#### 启动 用于调试的web服务
``` 调试的web服务
node server/index
```
#### 发布前，合并压缩
``` 合并压缩
npm run build
```
[相关源码](https://github.com/yinker)
[相关教程](https://github.com/tech-books)
[Markdown](https://guides.github.com/features/mastering-markdown/)