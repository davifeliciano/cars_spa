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
  TablePagination,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Car } from "../models/Car";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

interface CarTableProps {
  cars: Car[] | null;
  page: number;
  rowsPerPage: number;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  handleChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
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

export default function CarTable({
  cars,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}: CarTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();
  const [idOfCarToDelete, setIdOfCarToDelete] = useState<number>(-1);

  return (
    <TableContainer component={Paper} sx={{ mb: 16 }}>
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
                <TableCell sx={{ minWidth: 170 }}>
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
                    onClick={() => {
                      setDeleteDialogOpen(true);
                      setIdOfCarToDelete(car.id);
                    }}
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
      <TablePagination
        component="div"
        count={-1}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        labelDisplayedRows={({ from, to }) => `${from} - ${to}`}
        slotProps={{
          actions: {
            nextButton: { disabled: (cars?.length ?? 0) < rowsPerPage },
          },
        }}
      />
      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        title="Confirm Delete"
        description="Are you sure you want to delete this car?"
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => navigate(`/cars/${idOfCarToDelete}/delete`)}
      />
    </TableContainer>
  );
}
