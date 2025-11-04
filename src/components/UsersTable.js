/**************************************************************************
 * UsersTable component
 *
 * This component currently fetches only the username of all account in the
 * 'logins' sql table and displays them in an antd table
 **************************************************************************/

import { useState, useEffect } from "react";
import { Table } from "antd";
import axios from "axios";
import { EC2_URL } from "..";

//TODO: fetch more user information: account type, num exercises, etc.
export default function AccountsTable() {
  // UsersTable fetches all usernames and displays them
  const [accountData, setAccountData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState([true]);

  // Table column names
  const columns = [
    { title: "Username", dataIndex: "username", key: "username" },
    {
      title: "Account Created On",
      dataIndex: "account_created_on",
      key: "account_created_on",
    },
    { title: "Last Login", dataIndex: "last_login", key: "last_login" },
    {
      title: "Number of Workouts",
      dataIndex: "num_workouts",
      key: "num_workouts",
    },
    { title: "Last Workout", dataIndex: "last_workout", key: "last_workout" },
  ];

  // Triggers on first component render, fetches usernames
  useEffect(() => {
    // fetch(`${EC2_URL}/api/account-table`)
    //   .then(response => response.json())
    //   .then(data => {
    //     setAccountData(data.accountData);
    //   });
    const fetchAccountData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${EC2_URL}/api/account-table`);
        setAccountData(response.data.accountData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountData();
  }, []);

  /* Run only after userData has been updated. Loops through
   * fetched usernames and adds info to tableData */
  useEffect(() => {
    if (!accountData.length) return;

    let tempData = [];
    accountData.forEach((account, index) => {
      let row = {
        key: index + 1,
        username: account.username,
        account_created_on: account.account_created_on,
        last_login: account.last_login,
        num_workouts: account.num_workouts,
        last_workout: account.last_workout,
      };
      tempData.push(row);
    });
    setTableData(tempData);
  }, [accountData]);

  return <Table columns={columns} dataSource={tableData} loading={loading} />;
}
