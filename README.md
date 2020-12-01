1. Error in render: "TypeError: Cannot read property 'name' of undefined"，页面正常显示却报这个错误
   由于请求是异步获取数据，所以一开始是没有数据的，因此报错，随后数据获取页面也会正常显示，因为数据是响应式的。
   解决办法是添加一个 v-if 进行判断
