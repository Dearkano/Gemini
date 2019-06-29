export default {
  name: {
      validator(rule:any, value:any, callback:any, source:any, options:any) {
          /* callback必须执行一次,带参数为错误信息,不带参数为正确 */
         if(!value) {
              callback({
                  errMsg: "书名不能为空",
                  value,
                  errStatus: true
              });
          }else{
            callback({
              errMsg: "",
              value,
              errStatus: false
          });
          }
      }
  },
  origin_price: {
    validator(rule:any, value:any, callback:any, source:any, options:any) {
      /* callback必须执行一次,带参数为错误信息,不带参数为正确 */
     if(!value) {
          callback({
              errMsg: "原价不能为空",
              value,
              errStatus: true
          });
      }else{
        callback({
          errMsg: "",
          value,
          errStatus: false
      });
      }
  }
  },
  price:{
    validator(rule:any, value:any, callback:any, source:any, options:any) {
      /* callback必须执行一次,带参数为错误信息,不带参数为正确 */
     if(!value) {
          callback({
              errMsg: "卖价不能为空",
              value,
              errStatus: true
          });
      }else{
        callback({
          errMsg: "",
          value,
          errStatus: false
      });
      }
  }
  },
  introduction:{
    validator(rule:any, value:any, callback:any, source:any, options:any) {
      /* callback必须执行一次,带参数为错误信息,不带参数为正确 */
     if(!value) {
          callback({
              errMsg: "简介不能为空",
              value,
              errStatus: true
          });
      }else{
        callback({
          errMsg: "",
          value,
          errStatus: false
      });
      }
  }
  },
  url: {
    validator(rule:any, value:any, callback:any, source:any, options:any) {
      /* callback必须执行一次,带参数为错误信息,不带参数为正确 */
     if(!value) {
          callback({
              errMsg: "外部链接不能为空",
              value,
              errStatus: true
          });
      }else{
        callback({
          errMsg: "",
          value,
          errStatus: false
      });
      }
  }
},
imgUrl:{
  validator(rule:any, value:any, callback:any, source:any, options:any) {
    /* callback必须执行一次,带参数为错误信息,不带参数为正确 */
   if(!value) {
        callback({
            errMsg: "图片不能为空",
            value,
            errStatus: true
        });
    }else{
      callback({
        errMsg: "",
        value,
        errStatus: false
    });
    }
}
}
};
