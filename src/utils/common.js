/*
 * @Author: your name
 * @Date: 2021-08-23 10:20:50
 * @LastEditTime: 2021-08-23 16:04:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bosssoft11_notGoodMans\src\utils\common.js
 */
/**
 * @description: 
 * @param {object} obj
 * @return {Object||Array}
 */
var deepCopy=function(obj) {
	// 深拷贝通用方法
	// var new_arr = JSON.parse(JSON.stringify(arr)) // 不仅可拷贝数组还能拷贝对象（ 但不能拷贝函数）
	// 只拷贝对象
	let me = this
	if (typeof obj !== 'object' || obj === null) return obj
	// 根据obj的类型判断是新建一个数组还是一个对象
	let newObj = obj instanceof Array ? [] : {}
	for (let key in obj) {
		// 遍历obj,并且判断是obj的属性才拷贝
		if (Object.prototype.hasOwnProperty.call(obj,key)) {
		// 判断属性值的类型，如果是对象递归调用深拷贝
		newObj[key] =
			typeof obj[key] === 'object' ? me.deepCopy(obj[key]) : obj[key]
		}
	}
	return newObj
};
let obj={
	hello:1
}
let newObj=deepCopy(obj)
console.log(newObj);
