/**************************************************************************
 * WorkoutPrevTable component
 **************************************************************************/

import axios from "axios";
import { Table } from "antd";
import { EC2_URL } from "../../..";
import { useState, useEffect } from "react";

export default function WorkoutPrevTable({ workoutPreview }) {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState([true]);

  // Columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Sets",
      dataIndex: "sets",
    },
    {
      title: "Reps",
      dataIndex: "reps",
    },
  ];

  useEffect(() => {
    if (!workoutPreview.length) return;

    let tempData = [];
    workoutPreview.forEach((workout, index) => {
      let row = {
        key: index + 1,
        name: workout.name,
        type: workout.type,
        sets: workout.sets,
        reps: workout.reps,
      };
      tempData.push(row);
    });
    setTableData(tempData);
  }, [workoutPreview]);

  return <Table columns={columns} dataSource={tableData} />;
}
