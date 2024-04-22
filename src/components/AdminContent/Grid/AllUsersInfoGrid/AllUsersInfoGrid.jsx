import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';

import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';

// import { fetchAllUsers } from "../../../../http/usersApi";
import { updateUsersInDB, createUsersInDB, deleteUsersInDB } from '../../../../http/adminApi';

import { ValidationNewUserForm, ValidationUpdateUserForm } from '../../../../validation/ValidationNewUserForm';
 
const roles = ['USER', 'ADMIN', 'SELLER', 'MANAGER', 'SUPPORT', 'ANALYST', 'DEVELOPER', 'DESIGNER', 'TESTER'];

function EditToolbar(props) {
  const { setRows, setRowModesModel, rows, updateData } = props;

  const handleClick = () => {
    const id = new Date().getTime();
    
    setRows((oldRows) => [...oldRows, { 
      id, 
      role: '', 
      email: '', 
      firstName: '', 
      lastName: '', 
      age: '',
      birthDate: '', 
      phoneNumber: '', 
      createdAt: null,
      password: '', 
      isNew: true,
    }]);

    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };
  const handleClickUpdateTable = () => {
    // fetchAllUsers().then(users => setRows(users));
    updateData().then(users => setRows(users));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
      <Button color="primary" startIcon={<UpdateIcon />} onClick={handleClickUpdateTable}>
        Apdate table
      </Button>
    </GridToolbarContainer>
  );
}

const AllUsersInfoGrid = ({ data, updateData}) => {
  const [rows, setRows] = useState(data);

  useEffect(() => {
      setRows(data);
  }, [data]);

  const [rowModesModel, setRowModesModel] = React.useState({});

  const [showPassword, setShowPassword] = useState({});

//   useEffect(() => {
//     fetchAllUsers().then(users => setRows(users))
//   }, []);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => { 
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleDeleteClick = (id) => async() => {
    await deleteUsersInDB(id);
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    } 
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const processRowUpdate = async (newRow) => {
    let errors, isValid;

    if(newRow.isNew === true) {
      ({ errors, isValid } = ValidationNewUserForm(newRow));
    } else {
      ({ errors, isValid } = ValidationUpdateUserForm(newRow));
    }
    
    if(isValid) {
      if(newRow.isNew) {
        await createUsersInDB(newRow);
      } else {
        await updateUsersInDB(newRow, newRow.id);
      }

      const updatedRow = { ...newRow, errors, isNew: false, createdAt: new Date().toISOString() };
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      return updatedRow;
    } else {
      const updatedRow = { ...newRow, errors };

      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      return updatedRow;
    }
  };

  const handleProcessRowUpdateError = (error) => {
    console.error('Error during row update:', error);
    // Додаткова логіка обробки помилол
  };
  
  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleShowPassword = (id) => () => {
    setShowPassword((prevShowPassword) => ({
      ...prevShowPassword,
      [id]: !prevShowPassword[id],
    }));
  };

  const columns = [
    { 
      field: 'id',
      headerName: 'ID',
      width: 90 
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 220    ,
      editable: true,
      type: 'singleSelect',
      valueOptions: roles,
      renderCell: (params) => {
        const hasError = params.row.errors && params.row.errors.role;
        return (
          <div>
            {params.value}
            {hasError && <div style={{ color: 'red' }}>{params.row.errors.role}</div>}
          </div>
        );
      },
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
      editable: true,
      renderCell: (params) => {
        const hasError = params.row.errors && params.row.errors.email;
        return (
          <div>
            {params.value}
            {hasError && <div style={{ color: 'red' }}>{params.row.errors.email}</div>}
          </div>
        );
      },
    },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
      renderCell: (params) => {
        const hasError = params.row.errors && params.row.errors.firstName;
        return (
          <div>
            {params.value}
            {hasError && <div style={{ color: 'red' }}>{params.row.errors.firstName}</div>}
          </div>
        );
      },
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'birthDate',
      headerName: 'Birth Date',
      type: 'date',
      width: 150,
      editable: true,
      valueGetter: (params) => new Date(params.row.birthDate),
    },
    {
      field: 'password',
      headerName: 'Password',
      type: 'string',
      width: 150,
      editable: true,
      // valueGetter: (params) => {
      //   if (showPassword[params.id]) {
      //     return params.row.password;
      //   }
      //   else if (!params.row.isNew) {
      //     return '••••••••';
      //   }
      // },
      renderCell: (params) => {
        const hasError = params.row.errors && params.row.errors.password;
        return (
          <div>
            {params.value}
            {hasError && <div style={{ color: 'red' }}>{params.row.errors.password}</div>}
          </div>
        );
      },
    },
    {
      field: 'showPassword',
      headerName: 'Show Password',
      width: 150,
      renderCell: (params) => (
        <IconButton onClick={handleShowPassword(params.id)}>
          <VisibilityIcon />
        </IconButton>
      ),
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 150,
      editable: false,
      valueGetter: (params) => {
          // Функція для обчислення віку на основі дати народження
          if (params.row.birthDate === '' || params.row.birthDate === null || params.row.birthDate === undefined) {
            return null; 
          }
          const birthDate = new Date(params.row.birthDate);
          const currentDate = new Date();
          const age = currentDate.getFullYear() - birthDate.getFullYear();
  
          // Врахувати випадок, якщо день народження ще не настав у поточному році
          if (currentDate.getMonth() < birthDate.getMonth() ||
              (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
              return age - 1;
          }
          return age;
      },
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      width: 150,
      editable: true,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 180,
      valueGetter: (params) => {
          const formattedDateTime = new Date(params.row.createdAt).toLocaleString();
          return formattedDateTime;
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, rows, updateData},
        }}
        onProcessRowUpdateError={handleProcessRowUpdateError}
      />

    </Box>
  );
}

export default AllUsersInfoGrid;