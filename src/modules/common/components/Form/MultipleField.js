import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Icon } from 'antd';

const Item = Form.Item;

export default class MultipleField extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    component: PropTypes.object.isRequired,
    addIconText: PropTypes.string.isRequired,
    setFieldsValue: PropTypes.func.isRequired,
    getFieldValue: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
    formItemLayoutWithOutLabel: PropTypes.object,
  }

  static defaultProps = {
    ...Component.defaultProps,
  }

  constructor(props) {
    super(props);

    const { getFieldValue, name } = props;
    // can use data-binding to get
    const keys = getFieldValue(name);
    this.uuid = keys ? keys.length - 1 : -1;
  }

  remove = (k) => {
    const { setFieldsValue, getFieldValue, name } = this.props;
    // can use data-binding to get
    const keys = getFieldValue(name);

    // can use data-binding to set
    setFieldsValue({
      [name]: keys.filter(key => key !== k),
    });
  }

  add = () => {
    this.uuid += 1;
    const { getFieldValue, setFieldsValue, name } = this.props;
    // can use data-binding to get
    const keys = getFieldValue(name);
    const nextKeys = keys.concat(this.uuid);
    // can use data-binding to set
    // important! notify form to detect changes
    setFieldsValue({
      [name]: nextKeys,
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue, name, addIconText, component } = this.props;

    getFieldDecorator(name, { initialValue: [] });
    const keys = getFieldValue(name);
    const formItems = keys.map((key, index) => {
      return cloneElement(component, {
        ...component.props,
        key: index,
        index,
        name: `${name}-${key}`,
        remove: () => this.remove(key),
      });
    });

    return (
      <div className="clearfix">
        {formItems}
        <Item className="pull-right">
          <Button onClick={this.add} size="small">
            <Icon type="plus" /> {addIconText}
          </Button>
        </Item>
      </div>
    );
  }
}
