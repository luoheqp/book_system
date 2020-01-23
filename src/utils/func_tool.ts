interface regObj {
  [propName: string]: RegExp;
}

/**
 * 检测是否符合正则要求
 * @param target 目标字符串
 * @param reg 检测所用正则
 */
export function regularCheck(target: string, reg: string) {
  const regList: regObj = {
    email: new RegExp(
      "^([A-Za-z0-9\\_\\-\\.])+@([A-Za-z0-9\\_\\-\\.])+.([A-Za-z]{2,4})$"
    ),
    pwd: new RegExp("^[a-zA-Z0-9]{5,}$")
  };

  if (!regList[reg]) {
    return false;
  }

  return regList[reg].test(target);
}

export function dataURItoBlob(dataURI: string) {
  let mimeString = dataURI
    .split(",")[0]
    .split(":")[1]
    .split(";")[0]; // mime类型
  let byteString = atob(dataURI.split(",")[1]); //base64 解码
  let arrayBuffer = new ArrayBuffer(byteString.length); //创建缓冲数组
  let intArray = new Uint8Array(arrayBuffer); //创建视图

  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }
  return new Blob([intArray], { type: mimeString });
}
