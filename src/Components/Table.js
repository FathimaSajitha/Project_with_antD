import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Table, Icon, Comment, Avatar, Input, List, Row, Col, Form, Modal } from 'antd';
import Edit from './Edit';
import Forms from './Forms';
import moment from 'moment';



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
    defectid: 'di001',
    modulename: 'Module',
    severity: 'High',
    priority: 'High',
    type: 'Functionality',
    status: 'Open',


  },
  {
    key: '2',
    defectid: 'di002',
    modulename: 'Module1',
    severity: 'Medium',
    priority: 'Medium',
    type: 'UI',
    status: 'New',

  },
  {
    key: '3',
    defectid: 'di003',
    modulename: 'Module2',
    severity: 'Low',
    priority: 'Low',
    type: 'Enhancement',
    status: 'Fixed',

  },
  {
    key: '4',
    defectid: 'di004',
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
    //ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
  };

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

  handleChangeState = e => {
    this.setState({
      value: e.target.value,
    });
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
          // <span><Icon type="edit" theme="twoTone"  onClick={this.showModal}/> 
          // </span>
         <Edit />
        )
      },
      {
        title: 'More',
        dataIndex: 'more',
        key: 'more',
        render: (text, record) => (
          <span>
            <Icon type="fullscreen" onClick={this.showModal} />
           
          </span>
        )
      },

      // {
      //   title: 'Action',
      //   dataIndex: 'action',
      //   key: 'action',
      //   render: (text, record) => (
      //     <span>
      //       <Icon type="fullscreen" onClick={this.showModalView} />
      //       {/* <View /> */}
      //     </span>
      //   )
      // },


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
            width="600px"
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
          >
            <p>
              <Form>
                <Row >
                  <Col span={6}>
                    <Form.Item label="Module Name"   >
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
                    <Form.Item label="Detailed Description"   >
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
                    <Form.Item label="Added Date"   >
                    </Form.Item>
                  </Col>
                  <Col span={16}>
                    <Form.Item >
                      Added Date
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Item label="Comments"   >
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

              </Form>
            </p>
          </Modal>



        </div>

      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('container'));
export default Table;         