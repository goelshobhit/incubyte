'use client';
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material';
import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';


type FormInputs = {
  number1: number;
  number2: number;
};

export const StringCalculator = () => {
  const [sum, setSum] = useState<number | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const result = Number(data.number1) + Number(data.number2);
    setSum(result);
  };

  return (
    <div>
      <h1>String Calculator</h1>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Number Sum Calculator
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box mb={2}>
              <Controller
                name="number1"
                control={control}
                rules={{
                  required: 'This field is required',
                  validate: (value) => !isNaN(Number(value)) || 'Please enter a valid number'
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Number 1"
                    type="number"
                    fullWidth
                    error={!!errors.number1}
                    helperText={errors.number1?.message}
                  />
                )}
              />
            </Box>

            <Box mb={2}>
              <Controller
                name="number2"
                control={control}
                rules={{
                  required: 'This field is required',
                  validate: (value) => !isNaN(Number(value)) || 'Please enter a valid number'
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Number 2"
                    type="number"
                    fullWidth
                    error={!!errors.number2}
                    helperText={errors.number2?.message}
                  />
                )}
              />
            </Box>

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Calculate Sum
            </Button>
          </form>

          {sum !== null && (
            <Typography variant="h6" sx={{ mt: 2 }}>
              The sum is: {sum}
            </Typography>
          )}
        </Paper>
      </Container>
    </div>
  );
};
