1. Error in render: "TypeError: Cannot read property 'name' of undefined"，页面正常显示却报这个错误
   由于请求是异步获取数据，所以一开始是没有数据的，因此报错，随后数据获取页面也会正常显示，因为数据是响应式的。
   解决办法是添加一个 v-if 进行判断

2. Not allowed to load local resource: blob:http://localhost:9528/a292c33e-6a6b-45a8-9fda-a8ca2c260ce0，不允许加载本地资源
   资源地址为本地地址，但是这个地址没有对应资源，所以报错
   解决办法，修正资源地址

   The update clause in this loop moves the variable in the wrong direction  for-direction