import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { useMutation, useQuery } from '@tanstack/react-query';
import * as React from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { H1 } from '../../common';
import { axiosInstance } from '../../common/axios';
import { queryClient } from '../../common/queryClient';
import { BASE_URL } from '../../config/server';

const defaultValues = {
  productId: '',
  brandId: '',
  sizeId: '',
  sku: '',
  mrp: '',
  discount: '',
  maxDiscount: '',
  price: '',
  quantity: '',
  sold: '',
  available: '',
  defective: '',
};

const createItem = async (data: any) => {
  const { data: response } = await axiosInstance.post(BASE_URL + 'item/add', data);
  return response.data;
};

export const AddInventory = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onChange',
  });

  const [product, setProduct] = React.useState<any>([]);
  const [brand, setBrand] = React.useState<any>([]);
  const [size, setSize] = React.useState<any>([]);

  const { isLoading: productIsLoading, data: productData } = useQuery(['Product'], () => axiosInstance.get(BASE_URL + 'product').then((res) => res.data));
  const { isLoading: brandIsLoading, data: brandData } = useQuery(['Brand'], () => axiosInstance.get(BASE_URL + 'brand').then((res) => res.data));
  const { isLoading: sizeIsLoading, data: sizeData } = useQuery(['Size'], () => axiosInstance.get(BASE_URL + 'size').then((res) => res.data));

  useEffect(() => {
    if (!productIsLoading) {
      const items = productData.data.map((d: any) => ({
        id: d.ID,
        name: d.TITLE,
      }));
      setProduct(items);
    }
  }, [productData, productIsLoading]);

  useEffect(() => {
    if (!brandIsLoading) {
      const items = brandData.data.map((d: any) => ({
        id: d.ID,
        name: d.TITLE,
      }));
      setBrand(items);
    }
  }, [brandData, brandIsLoading]);

  useEffect(() => {
    if (!sizeIsLoading) {
      const items = sizeData.data.map((d: any) => ({
        id: d.ID,
        name: d.TITLE,
      }));
      setSize(items);
    }
  }, [sizeData, sizeIsLoading]);

  const { mutate, isLoading } = useMutation(createItem, {
    onSuccess: (data) => {
      console.log(data);
      const message = 'success';
      alert(message);
    },
    onError: () => {
      alert('there was an error');
    },
    onSettled: () => {
      queryClient.invalidateQueries(['Inventory']);
      reset();
    },
  });

  const onSubmit = (data: any) => {
    alert(JSON.stringify(data, null, 4));
    const item = {
      ...data,
      createdBy: 1,
    };
    mutate({ item });
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="flex items-center justify-between mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start ">
            <IconButton aria-label="back" onClick={() => navigate('/inventory')}>
              <ArrowBackIcon fontSize="large" />
            </IconButton>
            <H1 className="text-3xl font-bold tracking-tight">Add Inventory</H1>
          </div>
          <div>
            <Button onClick={handleSubmit(onSubmit)} variant="contained">
              Save
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <TextField
                    select
                    fullWidth
                    required
                    label="Product"
                    inputProps={register('productId', {
                      required: 'Select enter product',
                    })}
                    error={Boolean(errors?.productId)}
                    helperText={errors.productId?.message}
                  >
                    {product.map((option: any) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    fullWidth
                    required
                    label="Brand"
                    inputProps={register('brandId', {
                      required: 'Select enter brand',
                    })}
                    error={Boolean(errors?.brandId)}
                    helperText={errors.brandId?.message}
                  >
                    {brand.map((option: any) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    fullWidth
                    required
                    label="Size"
                    inputProps={register('sizeId', {
                      required: 'Select enter size',
                    })}
                    error={Boolean(errors?.sizeId)}
                    helperText={errors.sizeId?.message}
                  >
                    {size.map((option: any) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    required
                    label="SKU"
                    inputProps={register('sku', {
                      required: 'Enter enter SKU',
                    })}
                    error={Boolean(errors?.sku)}
                    helperText={errors.sku?.message}
                  />
                </div>
                <div></div>
                <div>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    label="MRP"
                    inputProps={register('mrp', {
                      required: 'Enter enter MRP',
                    })}
                    error={Boolean(errors?.mrp)}
                    helperText={errors.mrp?.message}
                  />
                  <TextField
                    required
                    fullWidth
                    type="number"
                    label="Discount"
                    inputProps={register('discount', {
                      required: 'Enter enter Discount',
                    })}
                    error={Boolean(errors?.discount)}
                    helperText={errors.discount?.message}
                  />
                  <TextField
                    required
                    fullWidth
                    type="number"
                    label="Max Discount"
                    inputProps={register('maxDiscount', {
                      required: 'Enter enter max Discount',
                    })}
                    error={Boolean(errors?.maxDiscount)}
                    helperText={errors.maxDiscount?.message}
                  />
                  <TextField
                    required
                    fullWidth
                    type="number"
                    label="Price"
                    inputProps={register('price', {
                      required: 'Enter enter Price',
                    })}
                    error={Boolean(errors?.price)}
                    helperText={errors.price?.message}
                  />
                </div>
                <div>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    label="Quantity"
                    inputProps={register('quantity', {
                      required: 'Enter enter Quantity',
                    })}
                    error={Boolean(errors?.quantity)}
                    helperText={errors.quantity?.message}
                  />
                  <TextField
                    required
                    type="number"
                    fullWidth
                    label="Sold"
                    inputProps={register('sold', {
                      required: 'Enter enter Sold',
                    })}
                    error={Boolean(errors?.sold)}
                    helperText={errors.sold?.message}
                  />
                  <TextField
                    required
                    fullWidth
                    type="number"
                    label="Available"
                    inputProps={register('available', {
                      required: 'Enter enter Available',
                    })}
                    error={Boolean(errors?.available)}
                    helperText={errors.available?.message}
                  />
                  <TextField
                    required
                    fullWidth
                    type="number"
                    label="Defective"
                    inputProps={register('defective', {
                      required: 'Enter enter Defective',
                    })}
                    error={Boolean(errors?.defective)}
                    helperText={errors.defective?.message}
                  />
                </div>
              </form>
            </Box>
          </div>
        </div>
      </main>
    </>
  );
};
