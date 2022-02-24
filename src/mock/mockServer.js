// 先引入mockjs

// 这里的Mock一定是大写开头
import Mock from 'mockjs';



// 把JSON数据格式引入进来
// 这里的JSON文件没有对外暴露就引入了进来
// webpack默认对外暴露的：图片、JSON数据格式
import banner from './banner.json';
import floor from './floor.json';


// mock数据
// mock方法有两个参数：
// 1. 请求的地址
// 2. 请求的数据
Mock.mock("/mock/banner",{code:200,data:banner});  //这里是在模拟首页大的轮播图的数据

Mock.mock("/mock/floor",{code:200,data:floor});