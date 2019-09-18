import React, { Component } from 'react';
import { Card, Table, Divider, Button, Popconfirm, message, Form } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormComponentProps } from 'antd/es/form';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { StateType } from './model';

interface UserListProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  sysUser: StateType;
}

@connect(({ sysUser }: { sysUser: StateType }) => ({
  sysUser,
}))
class UserList extends Component<UserListProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'sysUser/fetch',
    });
  }

  render() {
    const columns = [
      {
        title: '序号',
        render: (text: string, record: any, index: number) => `${index + 1}`,
      },
      {
        title: '姓名',
        dataIndex: 'username',
        key: 'username',
        render: (text: string) => <a>{text}</a>,
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '操作',
        key: 'action',
        render: () => (
          <span>
            <a>修改 </a>
            <Divider type="vertical" />
            <Popconfirm title="你确定要删除吗?">
              <a>删除</a>
            </Popconfirm>
          </span>
        ),
      },
    ];
    const {
      sysUser: { data },
    } = this.props;
    const { list = [], pagination = false } = data || {};
    const paginationProps = pagination
      ? {
        showSizeChanger: true,
        showQuickJumper: true,
        ...pagination,
      }
      : false;

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Button icon="plus" type="primary">
            新建
          </Button>
          <Table rowKey={record => record.id.toString()} columns={columns} dataSource={list} pagination={paginationProps} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<UserListProps>()(UserList);
