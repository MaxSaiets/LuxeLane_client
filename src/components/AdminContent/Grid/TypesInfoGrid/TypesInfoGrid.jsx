import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';

import { addNewType, deleteType, updateType } from '../../../../http/typeApi';

import NewTypePopup from './Popups/NewTypePopup';
import EditTypePopup from './Popups/EditTypePopup';

function EditToolbar(props) {
  const { setRows, setRowModesModel, rows, updateData, open, handleClose, handleOpen, handleSave, newRecord, setNewRecord } = props;

  const handleClick = () => {
    handleOpen();
  };
  const handleClickUpdateTable = () => {
    updateData().then(data => setRows(data));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>

      <NewTypePopup
        open={open} 
        handleClose={handleClose} 
        handleSave={handleSave} 
        newRecord={newRecord} 
        setNewRecord={setNewRecord} 
      />

      <Button color="primary" startIcon={<UpdateIcon />} onClick={handleClickUpdateTable}>
        Update table
      </Button>
    </GridToolbarContainer>
  );
}

const TypesInfoGrid = ({ data, updateData}) => {
  const [rows, setRows] = useState(data);
  const [open, setOpen] = useState(false);
  const [newRecord, setNewRecord] = useState({ name: '', id: null });

  const [modalForEditIsOpen, setModalForEditIsOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);

  useEffect(() => {
    setRows(data);
  }, [data]);

  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async (event) => {
    event.preventDefault();

    try {
      await addNewType(newRecord);
      const updatedData = await updateData();
      setRows(updatedData);
    } catch (error) {
      console.error("Error handleSave: ", error.message);
    }
    setOpen(false);
    setNewRecord({ name: '', id: null });
  };
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => { 
    const row = rows.find((row) => row.id === id);
    setCurrentRow(row);
    setModalForEditIsOpen(true);
  };

  const handleDeleteClick = (id) => async() => {
    await deleteType(id);
    
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

  const handleSaveClick = (id) => async () => {
    const editedRow = rows.find((row) => row.id === id);
    
    await processRowUpdate(editedRow);

    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const processRowUpdate = async (newRow) => {
    let errors, isValid;

    if(newRow.isNew === true) {
      // ({ errors, isValid } = ValidationNewUserForm(newRow));
    } else {
      // ({ errors, isValid } = ValidationUpdateUserForm(newRow));
    }

    const updatedRow = { ...newRow, errors, isNew: false, updatedAt: new Date().toISOString() };
    // UPDATE TYPE
    try {
      await updateType(updatedRow);
    } catch (error) {
      console.error('Error updating type:', error);
    }
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

    return updatedRow;
  };

  const handleProcessRowUpdateError = (error) => {
    console.error('Error during row update:', error);
    // Додаткова логіка обробки помилок
  };
  
  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { 
      field: 'id',
      headerName: 'ID',
      width: 90 
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
      renderCell: (params) => {
        const hasError = params.row.errors && params.row.errors.name;
        return (
          <div>
            {params.value}
            {hasError && <div style={{ color: 'red' }}>{params.row.errors.name}</div>}
          </div>
        );
      },
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
      field: 'updatedAt',
      headerName: 'Updated At',
      width: 180,
      valueGetter: (params) => {
          const formattedDateTime = new Date(params.row.updatedAt).toLocaleString();
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
          toolbar: { 
            setRows, 
            setRowModesModel, 
            rows, 
            updateData, 
            open, 
            handleClose, 
            handleSave, 
            newRecord, 
            setNewRecord,
            handleOpen
          },
        }}
        onProcessRowUpdateError={handleProcessRowUpdateError}
      />

        <EditTypePopup 
          setModalForEditIsOpen={setModalForEditIsOpen}
          modalForEditIsOpen={modalForEditIsOpen}
          currentRow={currentRow}
          updateData={updateData}
          setRows={setRows}
        />
    </Box>
  );
}

export default TypesInfoGrid;