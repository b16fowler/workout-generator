/**************************************************************************
 * AccountsTable component
 *
 * This component currently fetches only the username of all accounts in the
 * 'logins' sql table and displays them in an antd table
 **************************************************************************/

import axios from "axios";
import { Table } from "antd";
import { EC2_URL } from "../../..";
import { useState, useEffect } from "react";

export default function AccountsTable() {
  // UsersTable fetches all usernames and displays them
  const [accountsData, setAccountsData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState([true]);

  // Table column names
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: "Account Created On",
      dataIndex: "account_created_on",
      sorter: (a, b) =>
        new Date(a.account_created_on) - new Date(b.account_created_on),
    },
    {
      title: "Last Login",
      dataIndex: "last_login",
      sorter: (a, b) => new Date(a.last_login) - new Date(b.last_login),
    },
    {
      title: "Number of Workouts",
      dataIndex: "num_workouts",
      sorter: (a, b) => a.num_workouts - b.num_workouts,
    },
    {
      title: "Last Workout",
      dataIndex: "last_workout",
      sorter: (a, b) => new Date(a.last_workout) - new Date(b.last_workout),
    },
  ];

  // Triggers on first component render, fetches usernames
  useEffect(() => {
    const fetchAccountsData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${EC2_URL}/api/accounts-table`);
        setAccountsData(response.data.accountsData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountsData();
  }, []);

  /* Run only after userData has been updated. Loops through
   * fetched usernames and adds info to tableData */
  useEffect(() => {
    if (!accountsData.length) return;

    let tempData = [];
    accountsData.forEach((account, index) => {
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
  }, [accountsData]);

  return <Table columns={columns} dataSource={tableData} loading={loading} />;
}
