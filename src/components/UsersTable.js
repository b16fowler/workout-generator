/**************************************************************************
 * UsersTable component
 *
 * This component currently fetches only the username of all account in the
 * 'logins' sql table and displays them in an antd table
 **************************************************************************/

import { useState, useEffect } from "react";
import { Table } from "antd";

//TODO: fetch more user information: account type, num exercises, etc.
export default function UsersTable() {
  // UsersTable fetches all usernames and displays them
  const [userList, setUserList] = useState([]);
  const [tableData, setTableData] = useState([]);

  // Table column names
  const columns = [
    { title: "Username", dataIndex: "username", key: "username" },
  ];

  // Triggers on first component render, fetches usernames
  useEffect(() => {
    fetch("/api/user-table")
      .then(response => response.json())
      .then(data => {
        setUserList(data.userList);
      });
  }, []);

  /* Run only after userList has been updated. Loops through
   * fetched usernames and adds info to tableData */
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
