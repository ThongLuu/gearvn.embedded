import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';

import './fake.scss';

const FakeUpload = () => {
  const [fileList, setFileList] = useState([
    { name: 'HoSo.doc', date: '11:45 - 1/1/2020', type: 1 },
    { name: 'TaiLieu.pdf', date: '11:45 - 1/1/2020', type: 2 },
    { name: 'HinhAnh.png', date: '11:45 - 1/1/2020', type: 3 },
  ]);
  const [search, setSearch] = useState('');

  const renderFileList = () => {
    return (
      <div className="fake-upload-list">
        {fileList.map(item => {
          if (search !== '' && item.name.toLowerCase().indexOf(search.toLowerCase()) < 0) {
            return null;
          }
          return (
            <div className="fake-upload-item">
              <div className="fake-upload-item-avatar">
                <div>
                  {item.type === 1 ? <img style={{ height: '32px' }} src="/assets/layout/icons/doc.svg" /> : null}
                  {item.type === 2 ? <img style={{ height: '32px' }} src="/assets/layout/icons/pdf.svg" /> : null}
                  {item.type === 3 ? <img style={{ height: '32px' }} src="/assets/layout/icons/png.svg" /> : null}
                </div>
                <div className="fake-upload-item-info">
                  <div>
                    {item.name}
                  </div>
                  <div>
                    {item.date}
                  </div>
                </div>
              </div>
              <div className="fake-upload-item-action">
                <div className="fake-upload-progressbar"></div>
                <i className="fas fa-times" style={{ cursor: 'pointer' }} onClick={e => {
                  const newList = fileList.filter(p => p.name !== item.name);
                  setFileList([...newList]);
                }} />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fake-upload">
      <div className="fake-upload-container">
        <span>Kéo thả tập tin vào đây</span>
        <div className="fake-upload-buttons">
          <div>
            <div>
              <img src="/assets/layout/icons/folder-upload.svg" />
            </div>
            <div>Tải lên</div>
          </div>
          <div>
            <div>
              <img src="/assets/layout/icons/link-upload.svg" />
            </div>
            <div>Chèn link</div>
          </div>
        </div>
      </div>
      <div className="fake-upload-list-container">
        <div className="fake-upload-list-action">
          <div>
            Tệp đã tải lên
          </div>
          <div>
            <InputText value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." />
            <i style={{ color: 'gray', position: 'absolute', left: 'calc(100% - 20px)', top: '8px' }} className="fa fa-search" />
          </div>
        </div>
        {renderFileList()}
      </div>
    </div>
  );
}

export default FakeUpload;