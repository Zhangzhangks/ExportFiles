import fs from 'file-saver'
import * as XLSX from 'xlsx'
/* 读取文件 */
export const readFile = (file) => {
  return new Promise(resolve => {
    let reader = new FileReader()
    reader.readAsBinaryString(file)
    reader.onload = ev => {
      resolve(ev.target.result)
    }
  })
}

// 导出excel

export function xlsx(json, fields, filename = '.xlsx') {//导出xlsx
  json.forEach(item => {
    for (let i in item) {
      if (fields.hasOwnProperty(i)) {
        item[fields[i]] = item[i];
      }
      delete item[i]; //删除原先的对象属性
    }
  })
  let sheetName = filename //excel的文件名称
  let wb = XLSX.utils.book_new()  //工作簿对象包含一SheetNames数组，以及一个表对象映射表名称到表对象。XLSX.utils.book_new实用函数创建一个新的工作簿对象。
  let ws = XLSX.utils.json_to_sheet(json, { header: Object.values(fields) }) //将JS对象数组转换为工作表。
  wb.SheetNames.push(sheetName)
  wb.Sheets[sheetName] = ws
  const defaultCellStyle = { font: { name: "Verdana", sz: 13, color: "FF00FF88" }, fill: { fgColor: { rgb: "FFFFAA00" } } };//设置表格的样式
  let wopts = { bookType: 'xlsx', bookSST: false, type: 'binary', cellStyles: true, defaultCellStyle: defaultCellStyle, showGridLines: false }  //写入的样式
  let wbout = XLSX.write(wb, wopts)
  let blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' })
  fs.saveAs(blob, filename + '.xlsx')
}
const s2ab = s => {
  var buf;
  if (typeof ArrayBuffer !== 'undefined') {
    buf = new ArrayBuffer(s.length)
    var view = new Uint8Array(buf)
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
    return buf
  } else {
    buf = new Array(s.length);
    for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }
}



// 导出Word
export const exportToWord = (id, name) => {
  // 获取选中区域Html
  const dom = document.getElementById(id)
  const content = dom.innerHTML;
  const convertedContent = convertToWordDocument(content);

  // Html类型数据 转换为 文件类型数据
  const blob = new Blob([convertedContent], { type: 'application/msword' });
  console.log(blob);
  // 下载Word文档
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = name + '.doc' || 'exported.doc';
  link.click();
}

//完善Html格式
const convertToWordDocument = (content) => {
  const header = `<!DOCTYPE html><html><head><meta charset='utf-8'><title>Exported Document</title></head><body>`;
  const footer = `</body></html>`;

  return `${header}${content}${footer}`;
}