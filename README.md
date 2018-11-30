# testflowers
flowers test


## 项目架构 ##

采用 react + dva

## 页面布局 ##

- 所有的业务页面在 routes 文件夹

- 状态管理在models文件夹

## 后台接口 ##

- 配置接口文件在src\utils\request.js    变量为prefix

## 和ios以及android对接 ##

- 桥接方法在src\utils\origin.js  文件中
- 调用方法名为bridegWithPhone  传入参数name 和 type


## 项目运行 ##

- 本地开发运行 ：yarn start
- 本地打生产包： yarn run build , 打包后所有部署文件在dist文件夹下, 最后需要交给ios和android打包成h5的app
                                               
