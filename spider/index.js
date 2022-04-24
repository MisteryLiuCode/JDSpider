const fs = require('fs')

function getCommentNum(str) {
    // console.log(str)
    str = str.replace('+', '')
    if (str[str.length - 1] === "万") return (+str.replace('万', '')) * 10000
    else return +str
}

let str = fs.readFileSync('./JD_spider.txt').toString()
let arr = str.split('………………………………………………………………………………………………………………………………………………………………')
arr.pop()

// let count = 0
let targetArr = []
let tempObj = {}
for (let item of arr) {
    // console.log(count++)
    temp = item.trim().split(/[(\r\n)\r\n]+/);
    for (let i = 0; i < temp.length; i++) {
        if (temp[i] == "") {
            temp.remove(temp[i]);
        }
    }
    // console.log(temp)

    /*
    *  '书籍： 2',
  '产品号： 55527260937',
  '书名：',
  '【包邮特价】TCP/IP详解 卷2：实现 计算机与互联网 |232198',
  '正版特价：部分有盖章或打码标识，封面有轻微折痕磕碰等情况，对品相有要求者慎重购买',
  '价格：',
  '￥66.70',
  '作者：',
  '美加里 R  赖特 Gary R',
  '\t\t\t\t\t\t\t\t\t著 |',
  '书店：',
  '机械工业出版社',
  '\t\t\t\t\t\t\t\t\t |',
  '出版日期： 2019-02',
  '书籍详细页网址： https://item.jd.com/55527260937.html',
  '评论总数： 38'
*/

    //删除产品号和书名
    temp.splice(1, 2)

    //删除   '正版特价：部分有盖章或打码标识，封面有轻微折痕磕碰等情况，对品相有要求者慎重购买',
    //   '价格：',
    temp.splice(2, 2)


    // 删除 '作者：',
    temp.splice(4, 1)

    temp.splice(5, 2)
console.log(temp)
    // temp.splice(5, 2)





    // 索引
    tempObj.index = temp[0].split('： ')[1]
    console.log(tempObj.index)
    // 书名
    tempObj.name = temp[1]
    // 价格
    // console.log(temp[2])
    tempObj.price = temp[2].replace('￥', '')
    // console.log(temp[2])
    // console.log(temp)
    // 作者
    tempObj.author = temp[3]
    // 出版社
    tempObj.publisher = temp[4]
    // 出版时间
    tempObj.publishTime = temp[5].split('： ')[1]
    // 评论数
    tempObj.commentNum = getCommentNum(temp[7].split('： ')[1]
    )

    // console.log(tempObj)
    targetArr.push(tempObj)
    tempObj = {}
}

fs.writeFileSync('./JD_spider.json', JSON.stringify(targetArr))