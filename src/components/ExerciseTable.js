/**************************************************************************
 * ExerciseTable component
 **************************************************************************/
import { userExercises } from "./App.js";
import { CompactTable } from "@table-library/react-table-library/compact.js";
import { useTheme } from "@table-library/react-table-library/theme.js";
import { getTheme } from "@table-library/react-table-library/baseline.js";

export default function ExerciseTable() {
  const nodes = [];
  userExercises.forEach((exercise, index) => {
    nodes.push({
      id: index,
      ...exercise,
    });
  });

  const COLUMNS = [
    { label: "Name", renderCell: item => item.name },
    {
      label: "Type",
      renderCell: item => item.type,
    },
    { label: "Reps", renderCell: item => item.reps },
    {
      label: "Sets",
      renderCell: item => item.sets,
    },
    { label: "Picture", renderCell: item => item.pic },
  ];

  const Component = () => {
    const data = { nodes };

    const theme = useTheme([
      getTheme(),
      {
        HeaderRow: `
        background-color: #f2ffcc;
        color:rgb(0, 0, 0);
      `,
        Row: `
        &:nth-of-type(odd) {
          background-color: #d2e9fb;
          color:rgb(22, 22, 22);
        }

        &:nth-of-type(even) {
          background-color: #eaf5fd;
          color:rgb(22, 22, 22);
        }
      `,
      },
    ]);

    return <CompactTable columns={COLUMNS} data={data} theme={theme} />;
  };

  return <Component />;
}
