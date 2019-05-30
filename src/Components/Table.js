import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Table, Icon, Comment, Avatar, Input, List, Row, Col, Form, Modal, Select } from 'antd';
import Edit from './Edit';
import Forms from './Forms';
import moment from 'moment';

const Option = Select.Option;
const { TextArea } = Input;
const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
  </div>
);
const data = [
  {
    key: '1',
    defectid: 'DI001',
    modulename: 'Module',
    severity: 'High',
    priority: 'High',
    type: 'Functionality',
    status: 'Open',


  },
  {
    key: '2',
    defectid: 'DI002',
    modulename: 'Module1',
    severity: 'Medium',
    priority: 'Medium',
    type: 'UI',
    status: 'New',

  },
  {
    key: '3',
    defectid: 'DI003',
    modulename: 'Module2',
    severity: 'Low',
    priority: 'Low',
    type: 'Enhancement',
    status: 'Fixed',

  },
  {
    key: '4',
    modulename: 'Module3',
    severity: 'High',
    priority: 'High',
    type: 'Performance',
    status: 'Re-Opened',

  },
];
class App extends React.Component {
  state = {
    comments: [],
    submitting: false,
    value: '',
    filteredInfo: null,
    sortedInfo: null,
    visible: false,
    confirmLoading: false,
    modal1Visible: false,
  };
  setModal1Visible(modal1Visible) {
    this.setState({ modal1Visible });
  }

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }
    this.setState({
      submitting: true,
    });
    setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
        comments: [
          {
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow(),
          },
          ...this.state.comments,
        ],
      });
    }, 1000);
  };

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };
  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'defectid',
      },
    });
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };
  render() {
    const { comments, submitting, value } = this.state;
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: 'Defectid',
        dataIndex: 'defectid',
        render: text => <a href="javascript:;">{text}</a>,
        key: 'defectid',
        filteredValue: filteredInfo.defectid || null,
        onFilter: (value, record) => record.defectid.includes(value),
        sorter: (a, b) => a.defectid.length - b.defectid.length,
        sortOrder: sortedInfo.columnKey === 'defectid' && sortedInfo.order,
      },
      {
        title: 'ModuleName',
        dataIndex: 'modulename',
        key: 'modulename',
        filteredValue: filteredInfo.modulename || null,
        onFilter: (value, record) => record.modulename.includes(value),
        sorter: (a, b) => a.modulename.length - b.modulename.length,
        sortOrder: sortedInfo.columnKey === 'modulename' && sortedInfo.order,
      },
      {
        title: 'Severity',
        dataIndex: 'severity',
        key: 'severity',
        filters: [{ text: 'High', value: 'High' }, { text: 'Medium', value: 'Medium' }, { text: 'Low', value: 'Low' }],
        filteredValue: filteredInfo.address || null,
        onFilter: (value, record) => record.severity.includes(value),
        sorter: (a, b) => a.severity.length - b.severity.length,
        sortOrder: sortedInfo.columnKey === 'severity' && sortedInfo.order,
      },
      {
        title: 'Priority',
        dataIndex: 'priority',
        key: 'priority',
        filters: [{ text: 'High', value: 'High' }, { text: 'Medium', value: 'Medium' }, { text: 'Low', value: 'Low' }],
        filteredValue: filteredInfo.address || null,
        onFilter: (value, record) => record.priority.includes(value),
        sorter: (a, b) => a.priority.length - b.priority.length,
        sortOrder: sortedInfo.columnKey === 'priority' && sortedInfo.order,
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        filters: [{ text: 'Functionality', value: 'Functionality' }, { text: 'UI', value: 'UI' }, { text: 'Performance', value: 'Performance' },
        { text: 'Enhancement', value: 'Enhancement' }],
        filteredValue: filteredInfo.address || null,
        onFilter: (value, record) => record.type.includes(value),
        sorter: (a, b) => a.type.length - b.type.length,
        sortOrder: sortedInfo.columnKey === 'type' && sortedInfo.order,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        filters: [{ text: 'New', value: 'New' }, { text: 'Open', value: 'Open' }, { text: 'Fixed', value: 'Fixed' }, { text: 'Re-Open', value: 'Re-Open' }, { text: 'Rejected', value: 'Rejected' }, { text: 'Defered', value: 'Defered' }],
        filteredValue: filteredInfo.address || null,
        onFilter: (value, record) => record.type.includes(value),
        sorter: (a, b) => a.status.length - b.status.length,
        sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
      },
      {
        title: 'Edit',
        dataIndex: 'edit',
        key: 'edit',
        render: (text, record) => (
          <Edit />
        )
      },
      {
        title: 'More',
        dataIndex: 'more',
        key: 'more',
        render: (text, record) => (
          <span>
            <Icon type="fullscreen" className="datatable-icon" onClick={this.showModal} style={{ color: "red" }} />
          </span>
        )
      },
      {
        title: 'Action',
        dataIndex: 'more',
        key: 'more',
        render: (text, record) => (
          <span>
            <Icon type="fullscreen" className="datatable-icon" style={{ color: "green" }} onClick={() => this.setModal1Visible(true)} />
          </span>
        )
      },
    ];
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <Forms />
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 3 }} onChange={this.handleChange} />
        <div>
          <Modal
            title="DEFECT DETAILS"
            visible={visible}
            style={{ top: 20 }}
            Font-Family="Segoe UI"
            width="600px"
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
          >
            <p>
              <Form layout="horizontal">
                <Row type="flex">
                  <Col span={6}>
                    <Form.Item label="Module Name">
                    
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                  </Col>
                  <Col span={16}>
                    <Form.Item  >
                      ModuleName
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={6}>
                    <Form.Item label="Description"   >
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                  </Col>
                  <Col span={10}>
                    <Form.Item   >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                  </Col>
                </Row>

                <Row >
                  <Col span={8}>
                    <Form.Item label="Detailed Description">
                    </Form.Item>
                  </Col>
                  <Col span={16}>
                    <Form.Item >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                       Tenetur voluptatibus accusantium necessitatibus culpa exercitationem
                        autem excepturi incidunt eveniet officiis eos, eius facere, nostrum voluptates,
                       fuga earum aliquam esse blanditiis quae?
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={8}>
                    <Form.Item>
                      Defect Added By
                    </Form.Item>
                  </Col>
                  <Col span={16}>
                    <Form.Item >
                      Defect Added By
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Item label="Added Date">
                    </Form.Item>
                  </Col>
                  <Col span={16}>
                    <Form.Item >
                      Added Date
                    </Form.Item>
                  </Col>
                </Row>


              </Form>
            </p>
          </Modal>

          <Modal
            title="More Information"
            style={{ top: 20 }}
            visible={this.state.modal1Visible}
            onOk={() => this.setModal1Visible(false)}
            onCancel={() => this.setModal1Visible(false)}
          >
            <Form>
              <Row>
                <Col>
                  <Form.Item label="Comments">
                    {comments.length > 0 && <CommentList comments={comments} />}
                    <Comment
                      avatar={
                        <Avatar
                          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                          alt="Han Solo"
                        />
                      }
                      content={
                        <Editor
                          onChange={this.handleChangeState}
                          onSubmit={this.handleSubmit}
                          submitting={submitting}
                          value={value}
                        />
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item label="Status">
                    <Select defaultValue="status" style={{ width: '100%' }} onChange={this.handleChangeState}>
                      <Option value="new">New</Option>
                      <Option value="open">Open</Option>
                      <Option value="fixed">Fixed</Option>
                      <Option value="closed">Closed</Option>
                      <Option value="reopened">Reopened</Option>
                      <Option value="rejected">Rejected</Option>
                      <Option value="defered">Defered</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Modal>

        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('container'));
export default Table;         