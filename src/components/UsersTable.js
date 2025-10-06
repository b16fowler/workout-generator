/**************************************************************************
 * UsersTable component
 **************************************************************************/

import { useState, useEffect } from "react";
import { EC2_URL } from "..";
import { Table } from "antd";

export default function UsersTable() {
  const [userList, setUserList] = useState([]);
  const [tableData, setTableData] = useState([]);

  const columns = [
    { title: "Username", dataIndex: "username", key: "username" },
  ];

  useEffect(() => {
    fetch(`${EC2_URL}/api/user-table`)
      .then(response => response.json())
      .then(data => {
        setUserList(data.userList);
      });
  }, []);

  useEffect(() => {
    if (!userList.length) return;

    let tempData = [];
    userList.forEach((user, index) => {
      let row = {
        key: index + 1,
        username: user.username,
      };
      tempData.push(row);
    });
    setTableData(tempData);
  }, [userList]);

  return <Table columns={columns} dataSource={tableData} />;
}
