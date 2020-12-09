1. Error in render: "TypeError: Cannot read property 'name' of undefined"，页面正常显示却报这个错误
   由于请求是异步获取数据，所以一开始是没有数据的，因此报错，随后数据获取页面也会正常显示，因为数据是响应式的。
   解决办法是添加一个 v-if 进行判断

2. Not allowed to load local resource: blob:http://localhost:9528/a292c33e-6a6b-45a8-9fda-a8ca2c260ce0，不允许加载本地资源
   资源地址为本地地址，但是这个地址没有对应资源，所以报错
   解决办法，修正资源地址

路由模式

1. hush模式：
   - 路由路径带`#`号
   - 不能使用锚点功能
   - 兼容性较好
   - 不美观
2. history模式
   - 路由路径不带`#`号
   - 可以使用锚点功能
   - 兼容性较差
   - 美观

history模式可能会出现的404问题

- 由于webpack的开发服务器默认只能处理根路径的请求
- 当在history模式下发送非根路径的请求时，就会返回404
- 而在hush模式下发送请求时是不会携带`#`后的路径的，所以没有404问题
- 解决办法
  - 在webpack的devServe配置中添加historyApiFallback: true配置