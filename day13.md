## 1. 个人中心
个人中心当中：使用分页器

## 2. 全局守卫
未登录访问，交易相关（trade）、支付相关（pay,paysuccess)、用户中心（center）相关跳转到登录页面

## 3. 路由独享守卫
只有从购物车界面才能跳转到交易页面（创建订单）
只有从交易页面（创建订单）才能跳转到支付页面
只有从支付页面才能跳转到支付成功页面

## 4. 图片懒加载
vue-lazyload


自定义插件：
vue插件应该暴露一个对象
对象必须得有install方法

## 5. vee-validate基本使用
```js
npm i vee-validate@2 --save 
// 安装插件安装2版本的

import VeeBalidate from 'vee-validate'
import zh_CN from 'vee-vlaidate/dist/locale/zh_CN'
Vue.use(VeeValidate)

```

```js
// 表单验证：
VeeValidate.Validator.localize('zh_CN',{
    messages:{
        ...zh_CN.messages,

        // 修改内置规则的message，让确认密码和密码相同
        is:(field)=>`${field}必须与密码相同`  
    },
    attributes:{

        // 给校验的field属性名称映射中文名称
        phone:'手机号',
        code:'验证码',
        password:'密码',
        password1:'确认密码',
        isCheck:'协议',
    }
})
```

第三步：基本使用
```html
  <input
          placeholder="请再次输入你的密码"
          v-model="password1"
          name="password1"
          v-validate="{ required: true, is: password }"
          :class="{ invalid: errors.has('password1') }"
        />
```


## 6. 路由懒加载

## 7. 打包上线

### 7.1. 打包
```js
npm run build
```

项目打包后，代码都是经过压缩加密的，如果运行时出错，输出的错误信息无法准确得知是哪里的代码报错
有了`map`就可以想未加密的代码一样，准确的输出是哪一行哪一列有错
所以该文件如果项目不需要是可以去掉的：

vue.config.js配置：
```js
productionSourceMap:false
```


### 7.2. 购买云服务器

多种选择：
- 阿里云
- 腾讯云
- ...

1. 这里选择腾讯云

2. 设置安全组：让服务器的一些端口号打开


3. 利用Xshell工具登录服务器

linux:
/ 根目录
linux常用指令：
- cd 跳目录 
- ls:查看
- mkdir:创建目录
- pwd:查看绝对路径


### Nginx
为什么访问服务器IP地址就可以访问到项目？  ————配置服务器

刚刚在服务器上/root/wjq/www/shangpinhui/dist


项目的数据来自于：http://39.98.123.211



#### nginx配置
1. xshell进入根目录/etc文件夹
2. 安装Nginx（如果没安装的话）：yum install nginx(就在et文件夹下)
3. 进入etc，这个目录下有一个nginx目录，进入到这个目录
4. nginx目录下，多了一个nginx.conf文件，在这个文件中进行配置
5. vim nginx.conf进行编辑，主要添加如下两项：
   解决第一个问题：
    ```js
    location / {
        root  /root/wjq/www/shangpinhui/dist;
        index index.html;
        try_files $url $url/ /index.html;
    }
    ```


    解决第二个问题:
    ```js
    location /api {
        proxy_pass http://39.98.123.211;
    }
    ```

按insert键进入编辑模式
编辑完按ESC键退出
输入 `:wq`保存编辑的内容

6. nginx服务器跑起来
   service nginx start