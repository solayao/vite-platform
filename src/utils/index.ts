import { defineAsyncComponent, AsyncComponentOptions } from 'vue'

const getAsyncCompnent = ({loader, loadingComponent, errorComponent}: AsyncComponentOptions) => defineAsyncComponent({
  loader,
  // 加载异步组件时要使用的组件
  loadingComponent,
  // 加载失败时要使用的组件
  errorComponent,
  // 在显示 loadingComponent 之前的延迟 | 默认值：200（单位 ms）
  delay: 200,
  // 如果提供了 timeout ，并且加载组件的时间超过了设定值，将显示错误组件
  // 默认值：Infinity（即永不超时，单位 ms）
  timeout: 3000,
  // 定义组件是否可挂起 | 默认值：true
  suspensible: false,
  /**
   *
   * @param {*} error 错误信息对象
   * @param {*} retry 一个函数，用于指示当 promise 加载器 reject 时，加载器是否应该重试
   * @param {*} fail  一个函数，指示加载程序结束退出
   * @param {*} attempts 允许的最大重试次数
   */
  onError(error, retry, fail, attempts) {
    if (error.message.match(/fetch/) && attempts <= 3) {
      // 请求发生错误时重试，最多可尝试 3 次
      retry()
    } else {
      // 注意，retry/fail 就像 promise 的 resolve/reject 一样：
      // 必须调用其中一个才能继续错误处理。
      fail()
    }
  }
})

/**
 * 
 * @param {*} func 待执行方法
 * @param {*} wait 等待时间
 * @param {*} options { leading/trailing: Boolean }
 * 配置是否需要响应事件刚开始的那次回调（ leading 参数，false 时忽略）
 * 配置是否需要响应事件结束后的那次回调（ trailing 参数，false 时忽略）
 * 需要注意的是，这两者不能同时配置
 * @returns 
 */
const throttle = function(
   func: { apply: (arg0: any, arg1: any[] | null) => any },
   wait = 1000, 
   options = { leading: false, trailing: false }
) {
  var timeout: any, 
      context: any,
      args: any[] | null,
      result: any;
  
  // 上一次执行回调的时间戳
  var previous = 0;
  
  // 无传入参数时，初始化 options 为空对象
  if (!options) options = { leading: false, trailing: false };

  var later = function() {
    // 当设置 { leading: false } 时
    // 每次触发回调函数后设置 previous 为 0
    // 不然为当前时间
    previous = options.leading === false ? 0 : Date.now();
    
    // 防止内存泄漏，置为 null 便于后面根据 !timeout 设置新的 timeout
    timeout = null;
    
    // 执行函数
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  // 每次触发事件回调都执行这个函数
  // 函数内判断是否执行 func
  // func 才是我们业务层代码想要执行的函数
  var throttled = function(this: any, ..._arguments: any[]): any {
    
    // 记录当前时间
    var now = Date.now();
    
    // 第一次执行时（此时 previous 为 0，之后为上一次时间戳）
    // 并且设置了 { leading: false }（表示第一次回调不执行）
    // 此时设置 previous 为当前值，表示刚执行过，本次就不执行了
    if (!previous && options.leading === false) previous = now;
    
    // 距离下次触发 func 还需要等待的时间
    var remaining = wait - (now - previous);
    context = this;
    args = _arguments;
    
    // 要么是到了间隔时间了，随即触发方法（remaining <= 0）
    // 要么是没有传入 {leading: false}，且第一次触发回调，即立即触发
    // 此时 previous 为 0，wait - (now - previous) 也满足 <= 0
    // 之后便会把 previous 值迅速置为 now
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        
        // clearTimeout(timeout) 并不会把 timeout 设为 null
        // 手动设置，便于后续判断
        timeout = null;
      }
      
      // 设置 previous 为当前时间
      previous = now;
      
      // 执行 func 函数
      result = func.apply(context, args);

      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      // 最后一次需要触发的情况
      // 如果已经存在一个定时器，则不会进入该 if 分支
      // 如果 {trailing: false}，即最后一次不需要触发了，也不会进入这个分支
      // 间隔 remaining milliseconds 后触发 later 方法
      timeout = setTimeout(later, remaining);
    }

    return result;
  };

  // 手动取消
  // throttled.cancel = function() {
  //   clearTimeout(timeout);
  //   previous = 0;
  //   timeout = context = args = null;
  // };

  // 执行 _.throttle 返回 throttled 函数
  return throttled;
}

export { getAsyncCompnent, throttle } 
