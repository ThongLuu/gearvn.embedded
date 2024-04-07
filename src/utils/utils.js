import XLSX, { read } from 'xlsx';
import _ from 'lodash';
import moment from 'moment';

const patternWords = {
  'á': 'a', 'à': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
  'ă': 'a', 'ắ': 'a', 'ằ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
  'â': 'a', 'ấ': 'a', 'ầ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
  'é': 'e', 'è': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
  'ê': 'e', 'ế': 'e', 'ề': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
  'í': 'i', 'ì': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
  'ó': 'o', 'ò': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
  'ô': 'o', 'ố': 'o', 'ồ': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
  'ơ': 'o', 'ớ': 'o', 'ờ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
  'ú': 'u', 'ù': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
  'ư': 'u', 'ứ': 'u', 'ừ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
  'ý': 'y', 'ỳ': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y', 'đ': 'd',
  'Á': 'A', 'À': 'A', 'Ả': 'A', 'Ã': 'A', 'Ạ': 'A',
  'Ă': 'A', 'Ắ': 'A', 'Ằ': 'A', 'Ẳ': 'A', 'Ẵ': 'A', 'Ặ': 'A',
  'Â': 'A', 'Ấ': 'A', 'Ầ': 'A', 'Ẩ': 'A', 'Ẫ': 'A', 'Ậ': 'A',
  'É': 'E', 'È': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ẹ': 'E',
  'Ê': 'E', 'Ế': 'E', 'Ề': 'E', 'Ể': 'E', 'Ễ': 'E', 'Ệ': 'E',
  'Í': 'I', 'Ì': 'I', 'Ỉ': 'I', 'Ĩ': 'I', 'Ị': 'I',
  'Ó': 'O', 'Ò': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ọ': 'O',
  'Ô': 'O', 'Ố': 'O', 'Ồ': 'O', 'Ổ': 'O', 'Ỗ': 'O', 'Ộ': 'O',
  'Ơ': 'O', 'Ớ': 'O', 'Ờ': 'O', 'Ở': 'O', 'Ỡ': 'O', 'Ợ': 'O',
  'Ú': 'U', 'Ù': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ụ': 'U',
  'Ư': 'U', 'Ứ': 'U', 'Ừ': 'U', 'Ử': 'U', 'Ữ': 'U', 'Ự': 'U',
  'Ý': 'Y', 'Ỳ': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y', 'Ỵ': 'Y', 'Đ': 'D', ' ': '-',
  '/': '-',
};

export const flatString = s => {
  if (!_.isString(s)) return s;
  const replaceAt = (s, index, replacement) => {
    return s.substr(0, index) + replacement + s.substr(index + replacement.length);
  }
  for (let i = 0; i < s.length; i += 1) {
    const char = s.charAt(i);
    for (const c in patternWords) {
      if (char === c) {
        s = replaceAt(s, i, patternWords[c]);
        break;
      }
    }
  }
  return s.toLowerCase();
}

export const upload = () => {
  const reader = new FileReader();
  const element = document.createElement('input');
  let file;

  element.setAttribute('type', 'file');
  element.addEventListener('change', e => {
    // eslint-disable-next-line prefer-destructuring
    file = e.target.files[0];
    reader.readAsBinaryString(file);
  });

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();
  document.body.removeChild(element);
  return new Promise((resolve, reject) => {
    reader.onload = e => resolve({ data: e.target.result, file });
    reader.onerror = e => reject(e);
  });
};

export const download = (filename, text) => {
  const element = document.createElement('a');
  element.setAttribute('href', `data:text/plain;base64,${encodeURIComponent(text)}`);
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

export const jsonToExcel = (data, header = []) => {
  const ws = XLSX.utils.json_to_sheet(data, { header: [...header] });
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Dữ liệu');
  return XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });
};

export const excelToJson = data => {
  const wb = XLSX.read(data, { bookType: 'xlsx', type: 'binary' });
  const names = wb.SheetNames;
  const ws = wb.Sheets[names[0]];
  return XLSX.utils.sheet_to_json(ws);
};

