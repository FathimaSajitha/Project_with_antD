import React from 'react';
import 'antd/dist/antd.css';
import { Button, Modal, Form, Input, Upload, Icon, message,TreeSelect,Select,Row, Col } from 'antd';

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  class extends React.Component {
    state = {
      value: undefined,
    };

    onChange = value => {
      console.log(value);
      this.setState({ value });
    };

    state = {
      disabled: true,
    };

    toggle = () => {
      this.setState({
        disabled: !this.state.disabled,
      });
    };

    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      const Option = Select.Option;
      const { TextArea } = Input;
      const TreeNode = TreeSelect.TreeNode;
      const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };


      return (
        <Modal
          visible={visible}
          title="ADD DEFECT"
          okText="Create"
          style={{ top: 20 }}
          width="700px"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Row gutter="10">
              <Col span={2}>
              </Col>
              <Col span={4}>
                <Form.Item label="Defect Id"   >
                </Form.Item>
              </Col>
              <Col span={10}>
                {getFieldDecorator('defectid')(<Input disabled />)}
              </Col>
              <Col span={8}>
              </Col>
            </Row>

            <Row gutter={10}>
              <Col span={12}>
                <Form.Item label="Module: ">
                  <Select defaultValue="Module" style={{ width: '100%' }} onChange={this.handleChangeState}>
                    <Option value="module">Module</Option>
                    <Option value="module1">Module1</Option>
                    <Option value="module2">Module2</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Sub Module">
                  {getFieldDecorator('module')}
                  <TreeSelect
                    showSearch
                    // style={{ width: 300 }}
                    value={this.state.value}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="Please select"
                    allowClear
                    treeDefaultExpandAll
                    onChange={this.onChange}
                  >
                    <TreeNode value="sub module" title="sub module" key="0-1">
                      <TreeNode value="sub module 1" title="sub module 1" key="random" />
                      <TreeNode value="sub module 2" title="sub module 2" key="random1" />
                    </TreeNode>
                  </TreeSelect>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={10}>
              <Col span={8}>
                <Form.Item label="Type: ">
                  <Select defaultValue="Type" style={{ width: '100%' }} onChange={this.handleChangeState}>
                    <Option value="ui">UI</Option>
                    <Option value="functionality">Functionality</Option>
                    <Option value="enhancement">Enhancement</Option>
                    <Option value="performance">Performance</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="Severity: ">
                  <Select defaultValue="Severity" style={{ width: '100%' }} onChange={this.handleChangeState}>
                    <Option value="high">High</Option>
                    <Option value="medium">Medium</Option>
                    <Option value="low">Law</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="Priority: ">
                  <Select defaultValue="Priority" style={{ width: '100%' }} onChange={this.handleChangeState}>
                    <Option value="high">High</Option>
                    <Option value="medium">Medium</Option>
                    <Option value="low">Law</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item label="Description">
                  {getFieldDecorator('description')(<TextArea rows={2} />)}
                </Form.Item>
              </Col>
            </Row>
            
            <Row>
              <Col span={24}>
                <Form.Item label="Steps To Re Create">
                  {getFieldDecorator('stepstorecreate')(<TextArea rows={2} />)}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={10}>
              <Col span={12}>
                <Form.Item label="Assigned Person">
                  <Select defaultValue="Assigned Person" style={{ width: '100%' }} onChange={this.handleChangeState}>
                    <Option value="user1">user1</Option>
                    <Option value="user2">user2</Option>
                    <Option value="user3">user3</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Found In">
                  {getFieldDecorator('title')(<Input />)}
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Item label="Comments">
                  {getFieldDecorator('comments')(<TextArea rows={4} />)}
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item label="Attachments">
                  <Upload {...props}>
                    <Button>
                      <Icon type="upload" /> Click to Upload
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

          </Form>
        </Modal>
      );
    }
  },
);

class CollectionsPage extends React.Component {
  state = {
    visible: false,
  };
  handleChangeState = e => {
    this.setState({
      value: e.target.value
    });
  };


  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Add Defect<Icon type="file-add" />
        </Button>


        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />

      </div>
    );
  }
}
export default CollectionsPage;
