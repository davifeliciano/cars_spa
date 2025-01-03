import { Delete, DirectionsCar, Edit } from "@mui/icons-material";
import {
  Button,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Car } from "../models/Car";

interface CarTableProps {
  cars: Car[] | null;
}

function TableBodySkeleton() {
  const rows = Array.from(new Array(5)); // Create an array with 5 elements to represent 5 rows

  return (
    <TableBody>
      {rows.map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <DirectionsCar />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" />
          </TableCell>
          <TableCell>
            <Button
              variant="text"
              color="primary"
              disabled
              sx={{ marginRight: 1 }}
            >
              <Edit />
            </Button>
            <Button variant="text" color="error" disabled>
              <Delete />
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default function CarTable({ cars }: CarTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Modelo</TableCell>
            <TableCell>Ano</TableCell>
            <TableCell>Cor</TableCell>
            <TableCell>Cavalos de Potência</TableCell>
            <TableCell>Fabricante</TableCell>
            <TableCell>País</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        {cars ? (
          <TableBody>
            {cars.map((car) => (
              <TableRow key={car.id}>
                <TableCell>
                  <DirectionsCar />
                </TableCell>
                <TableCell>{car.modelo}</TableCell>
                <TableCell>{car.ano}</TableCell>
                <TableCell>{car.cor}</TableCell>
                <TableCell>{car.cavalosDePotencia}</TableCell>
                <TableCell>{car.fabricante}</TableCell>
                <TableCell>{car.pais}</TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    color="primary"
                    href={`/cars/${car.id}/edit`}
                    sx={{ marginRight: 1 }}
                  >
                    <Edit />
                  </Button>
                  <Button
                    variant="text"
                    color="error"
                    href={`/cars/${car.id}/delete`}
                  >
                    <Delete />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBodySkeleton />
        )}
      </Table>
    </TableContainer>
  );
}
