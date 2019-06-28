export default {
  username: {
      validator(rule:any, value:any, callback:any, source:any, options:any) {
          /* callback必须执行一次,带参数为错误信息,不带参数为正确 */
         if(!value) {
              callback({
                  errMsg: "用户名不能为空",
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
  email: {
    validator(rule:any, value:any, callback:any, source:any, options:any) {
     const reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      /* callback必须执行一次,带参数为错误信息,不带参数为正确 */
     if(!value) {
          callback({
              errMsg: "Email不能为空",
              value,
              errStatus: true
          });
      }else if(!reg.test(value)){
        callback({
          errMsg: "Email格式不正确",
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
  password:{
    validator(rule:any, value:any, callback:any, source:any, options:any) {
       /* callback必须执行一次,带参数为错误信息,不带参数为正确 */
      if(!value) {
           callback({
               errMsg: "密码不能为空",
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
  confirmPassword:{
    validator(rule:any, value:any, callback:any, source:any, options:any) {
      /* callback必须执行一次,带参数为错误信息,不带参数为正确 */
     if(value instanceof Array && value[0]!==value[1]) {
          callback({
              errMsg: "两次密码输入不一致",
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
  address: {
    validator(rule:any, value:any, callback:any, source:any, options:any) {
        /* callback必须执行一次,带参数为错误信息,不带参数为正确 */
       if(!value) {
            callback({
                errMsg: "地址不能为空",
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
};
