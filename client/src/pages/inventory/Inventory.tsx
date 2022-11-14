import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { H1 } from '../../common';
import { axiosInstance } from '../../common/axios';

const columns: GridColDef[] = [
  { field: 'product', headerName: 'Product' },
  { field: 'brand', headerName: 'Brand' },
  {
    field: 'size',
    headerName: 'Size',
  },
  {
    field: 'sku',
    headerName: 'SKU',
  },
  {
    field: 'mrp',
    headerName: 'MRP',
  },
  {
    field: 'discount',
    headerName: 'Discount',
  },
  {
    field: 'maxDiscount',
    headerName: 'Max Discount',
  },
  {
    field: 'price',
    headerName: 'Price',
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
  },
  {
    field: 'sold',
    headerName: 'Sold',
  },
  {
    field: 'available',
    headerName: 'Available',
  },
  {
    field: 'defective',
    headerName: 'Defective',
  },
  {
    field: 'createdBy',
    headerName: 'Created By',
  },
  {
    field: 'updatedBy',
    headerName: 'Updated By',
  },
  {
    field: 'createdDate',
    headerName: 'Created Date',
  },
  {
    field: 'upatedDate',
    headerName: 'Updated Date',
  },
];

export const Inventory = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [items, setItems] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { isLoading, error, data, isFetching } = useQuery(['Inventory'], () => axiosInstance.get('http://localhost:3030/item').then((res) => res.data));

  useEffect(() => {
    if (!isLoading) {
      const items = data.data.map((d: any) => ({
        id: d.id,
        product: d.PRODUCT,
        brand: d.BRAND,
        size: d.SIZE,
        sku: d.SKU,
        mrp: d.MRP,
        discount: d.DISCOUNT,
        maxDiscount: d.MAXDISCOUNT,
        price: d.PRICE,
        quantity: d.QUANTITY,
        sold: d.SOLD,
        available: d.AVAILABLE,
        defective: d.DEFECTIVE,
        createdBy: d.CREATEDBY,
        updatedBy: d.UPDATEBY,
        createdDate: d.CREATEDDATE,
        updateddate: d.UPDATEDDATE,
      }));
      setItems(items);
    }
  }, [data, isLoading]);

  return (
    <>
      <header className="bg-white shadow">
        <div className="flex justify-between mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <H1 className="text-3xl font-bold tracking-tight">Inventory</H1>
          <Button variant="contained" onClick={() => navigate('/inventory/add')}>
            Add
          </Button>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid getRowId={(row) => row.sku} rows={items} columns={columns} pageSize={5} rowsPerPageOptions={[10]} checkboxSelection disableSelectionOnClick />
              </div>
            </Paper>
          </div>
        </div>
      </main>
    </>
  );
};

export default Inventory;
