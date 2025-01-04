import { Save } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { z } from "zod";
import { CarWithoutId } from "../models/Car";

const requiredStringSchema = z.string().trim().min(1, { message: "Required" });

const carSchema = z.object({
  modelo: requiredStringSchema,
  ano: z.coerce.number().int().min(1900),
  cor: requiredStringSchema,
  cavalosDePotencia: z.coerce.number().int().min(0),
  fabricante: requiredStringSchema,
  pais: requiredStringSchema,
});

interface CreateAndUpdateFormProps {
  car: CarWithoutId;
  setCar: React.Dispatch<React.SetStateAction<CarWithoutId>>;
  onValidSubmit: () => void;
}

export default function CreateAndUpdateForm({
  car,
  setCar,
  onValidSubmit,
}: CreateAndUpdateFormProps) {
  const [errors, setErrors] =
    useState<z.inferFlattenedErrors<typeof carSchema>>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCar({ ...car, [name]: value });
  };

  const validate = () => {
    const result = carSchema.safeParse(car);

    if (!result.success) {
      setErrors(result.error.flatten());
      return false;
    }

    return true;
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (validate()) {
      onValidSubmit();
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": {
          marginRight: 2,
          marginBlock: 1,
          width: "25ch",
        },
      }}
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <TextField
        label="Modelo"
        name="modelo"
        value={car.modelo}
        onChange={handleChange}
        margin="normal"
        error={!!errors?.fieldErrors.modelo}
        helperText={errors?.fieldErrors.modelo ?? " "}
      />
      <TextField
        label="Ano"
        name="ano"
        value={car.ano}
        onChange={handleChange}
        margin="normal"
        error={!!errors?.fieldErrors.ano}
        helperText={errors?.fieldErrors.ano ?? " "}
      />
      <TextField
        label="Cor"
        name="cor"
        value={car.cor}
        onChange={handleChange}
        margin="normal"
        error={!!errors?.fieldErrors.cor}
        helperText={errors?.fieldErrors.cor ?? " "}
      />
      <TextField
        label="Cavalos de Potência"
        name="cavalosDePotencia"
        type="number"
        value={car.cavalosDePotencia}
        onChange={handleChange}
        margin="normal"
        error={!!errors?.fieldErrors.cavalosDePotencia}
        helperText={errors?.fieldErrors.cavalosDePotencia ?? " "}
      />
      <TextField
        label="Fabricante"
        name="fabricante"
        value={car.fabricante}
        onChange={handleChange}
        margin="normal"
        error={!!errors?.fieldErrors.fabricante}
        helperText={errors?.fieldErrors.fabricante ?? " "}
      />
      <TextField
        label="País"
        name="pais"
        value={car.pais}
        onChange={handleChange}
        margin="normal"
        error={!!errors?.fieldErrors.pais}
        helperText={errors?.fieldErrors.pais ?? " "}
      />
      <Button type="submit" variant="contained" color="primary">
        <Save />
      </Button>
    </Box>
  );
}
