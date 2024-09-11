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
import { addNewProduct, deleteProduct } from '../../../../http/productApi';
import { deleteImage, uploadImage } from '../../../../http/fireBaseStorageUploadApi';

import NewProductPopup from './Popups/NewProductPopup';
import EditProductPopup from './Popups/EditProductPopup';

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

      <NewProductPopup 
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

const ProductsInfoGrid = ({ data, updateData}) => {
  const [rows, setRows] = useState(data);
  const [open, setOpen] = useState(false);
  const [newRecord, setNewRecord] = useState({});

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

  const handleSave = async () => {
    try{
      const data = {
        title: newRecord.title,
        price: newRecord.price,
        subCategories: newRecord.subCategories,
        categories: newRecord.categories,
        brands: newRecord.brands,
        types: newRecord.types,
      };
  
      if (newRecord.previewImage) {
        const results = await uploadImage(newRecord.previewImage, 'productPreviewImg');
        data.previewImageName = results[0].name;
        data.previewImageUrl = results[0].url;

        if (results.length > 1) {
          data.fullPreviewImageName = results[1].name;
          data.fullPreviewImageUrl = results[1].url;
          data.fullBigPreviewImageName = results[2].name;
          data.fullBigPreviewImageUrl = results[2].url;
        }
      }
      
      if (newRecord.additionalImages && newRecord.additionalImages.length > 0) {

        const additionalImagesResults = await Promise.all(newRecord.additionalImages.map(file => uploadImage(file, 'productImg')));

        data.additionalImages = additionalImagesResults.map((result, index) => ({
          nameBigPreview: result[0].name,
          urlBigPreview: result[0].url,
          nameBigImg: result[1].name,
          urlBigImg: result[1].url,
        }));
      }

      await addNewProduct(data);

      const updatedData = await updateData();
      setRows(updatedData);
    } catch (error) {
      console.error("Error handleSave: ", error.message);
    }

    setOpen(false);
    setNewRecord({});
    
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => { 
    const row = rows.find((row) => row.id === id);
    console.log("handleEditClick", row)
    setCurrentRow(row);
    setModalForEditIsOpen(true);
  };

  const handleDeleteClick = (id) => async() => {
    const product = rows.find((row) => row.id === id);
    if (product && product.images && product.images.length > 0) {
      for (const image of product.images) {
        const imagePath = 'products/' + image.imgName;
        await deleteImage(imagePath);
      }
    }
  
    await deleteProduct(id);
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
      // ({ errors, isValid } = ValidationNewUserForm(newRow));
    } else {
      // ({ errors, isValid } = ValidationUpdateUserForm(newRow));
    }
    
    const updatedRow = { ...newRow, errors, isNew: false, createdAt: new Date().toISOString() };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
  };

  const handleProcessRowUpdateError = (error) => {
    console.error('Error during row update:', error);
    // Додаткова логіка обробки помилол
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
      field: 'title',
      headerName: 'title',
      width: 150,
      editable: false,
      renderCell: (params) => {
        const hasError = params.row.errors && params.row.errors.title;
        return (
          <div>
            {params.row.title}
            {hasError && <div style={{ color: 'red' }}>{params.row.errors.title}</div>}
          </div>
        );
      },
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 100,
    },
    {
      field: 'categories',
      headerName: 'Categories',
      width: 200,
      renderCell: (params) => {
        return (
          <ul>
            {params.row.categories.map((category) => (
              <li key={category.id}>{category.name}</li>
            ))}
          </ul>
        );
      },
    },
    {
      field: 'subCategories',
      headerName: 'Subcategories',
      width: 200,
      renderCell: (params) => (
        <ul>
          {params.row.subCategories.map((subCategory) => (
            <li key={subCategory.id}>{subCategory.name}</li>
          ))}
        </ul>
      ),
    },
    {
      field: 'brands',
      headerName: 'Brands',
      width: 200,
      renderCell: (params) => (
        <ul>
          {params.row.brands.map((brand) => (
            <li key={brand.id}>{brand.name}</li>
          ))}
        </ul>
      ),
    },
    {
      field: 'types',
      headerName: 'Types',
      width: 150,
      renderCell: (params) => (
        <ul>
          {params.row.types.map((type) => (
            <li key={type.id}>{type.name}</li>
          ))}
        </ul>
      ),
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
      width: 200,
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

        <EditProductPopup 
          setModalForEditIsOpen={setModalForEditIsOpen}
          modalForEditIsOpen={modalForEditIsOpen}
          currentRow={currentRow}
          updateData={updateData}
          setRows={setRows}
        />
    </Box>
  );
}

export default ProductsInfoGrid;