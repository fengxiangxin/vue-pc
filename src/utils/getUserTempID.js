/* 使用uuid库来生成临时id */
import { v4 as uuidv4 } from "uuid";

/* 生成未登录用户的临时id */
export default function() {
  /* 将用户临时id保存在本地 */
  let userTempId = localStorage.getItem("userTempId");
  if (userTempId) {
    return userTempId;
  }
  userTempId = uuidv4();
  localStorage.setItem("userTempId", userTempId);
  return userTempId;
}
