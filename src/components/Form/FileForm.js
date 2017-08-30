import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon, message, Modal } from 'antd';

// import { HOST, UPLOAD_PATH } from 'config/config';
// import { previewTemplate, dictDefaultMessage } from './DropZoneTemplate';

import './FileForm.scss';

function DropZonePreview() {
  return (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
}

class FileForm extends Component {
  static propTypes = {
    listType: PropTypes.string,
    className: PropTypes.string,
    multiple: PropTypes.bool,
    fileList: PropTypes.array,
    action: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    server: PropTypes.bool,
  };

  static defaultProps = {
    listType: 'picture-card',
    server: false,
    action: 'whatever',
  }

  state = {
    previewVisible: false,
    previewImage: '',
  };

  onChange = (info) => {
    const { onChange } = this.props;
    if (onChange) onChange(info);
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  handleCancel = () => this.setState({ previewVisible: false })
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  customRequest = ({ onSuccess, onProgress, file }) => {
    // Hack to not send data to server when dragging a file
    return new Promise((resolve, reject) => {
      onProgress();
      setTimeout(() => {
        resolve(onSuccess());
      }, 0);
    });
  }

  render() {
    const { previewVisible, previewImage } = this.state;
    const { multiple, fileList = [], server } = this.props;
    const showDropZone = multiple || (!multiple && fileList.length === 0);
    return (
      <div className="dropbox clearfix">
        <Upload
          {...this.props}
          onChange={this.onChange}
          onPreview={this.handlePreview}
          customRequest={server ? undefined : this.customRequest}
          withCredentials
        >
          {showDropZone &&
            <DropZonePreview />
          }
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default FileForm;
