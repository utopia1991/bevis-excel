const XLSX = require('xlsx');
var _headers = ['id', 'name', 'age', 'remark']
var _data = [{
        id: '0000145',
        name: '张三',
        age: '30',
        remark: '3'
    },
    {
        id: '0000145',
        name: '张三',
        age: '20',
        remark: '2'
    },
    {
        id: '0000145',
        name: '张三',
        age: '18',
        remark: '3'
    }
];
var headers = _headers
    .map((v, i) => Object.assign({}, {
        v: v,
        position: String.fromCharCode(65 + i) + 1
    }))
    // 转换成 worksheet 需要的结构
    .reduce((prev, next) => Object.assign({}, prev, {
        [next.position]: {
            v: next.v
        }
    }), {});
var data = _data
    // 匹配 headers 的位置，生成对应的单元格数据
    .map((v, i) => _headers.map((k, j) => Object.assign({}, {
        v: v[k],
        position: String.fromCharCode(65 + j) + (i + 2)
    })))
    // 对刚才的结果进行降维处理（二维数组变成一维数组）
    .reduce((prev, next) => prev.concat(next))
    // 转换成 worksheet 需要的结构
    .reduce((prev, next) => Object.assign({}, prev, {
        [next.position]: {
            v: next.v
        }
    }), {});
// 合并 headers 和 data
var output = Object.assign({}, headers, data);
// 获取所有单元格的位置
var outputPos = Object.keys(output);
var ref = outputPos[0] + ':' + outputPos[outputPos.length - 1];
var wb = {
    SheetNames: ['mySheet'],
    Sheets: {
        'mySheet': Object.assign({}, output, {
            '!ref': ref
        })
    }
};

// 导出 Excel
XLSX.writeFile(wb, 'file.xlsx');