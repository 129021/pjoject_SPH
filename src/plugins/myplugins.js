// Vue插件一定是暴露的一个对象
let myPlugins={};

// 这个对象必须得有install方法
myPlugins.install=function(Vue,options){
    // console.log('调用自定义插件myPlugins');

    Vue.directive(options,name,(element,params)=>{
        element.innerHTML=params.value.toUpperCase();
          
    });
}

export default myPlugins;