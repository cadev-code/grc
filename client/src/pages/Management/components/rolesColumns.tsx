import { Column, ColumnDef } from '@tanstack/react-table';
import { Rol } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type RolesColumnsProps = {
  onEdit: (rol: Rol) => void;
  onDelete: (rol: Rol) => void;
  isLoading: boolean;
};

const handleSort = (column: Column<Rol, unknown>) => {
  const currentSort = column.getIsSorted();

  if (currentSort === false) {
    // No está ordenado
    column.toggleSorting(false); // false para ascendente
  } else if (currentSort === 'asc') {
    // Está ascendente
    column.toggleSorting(true); // true para descendente
  } else {
    // Está descendente
    column.clearSorting(); // limpiar ordenamiento
  }
};

export const rolesColumns = ({
  onEdit,
  onDelete,
  isLoading,
}: RolesColumnsProps): ColumnDef<Rol>[] => [
  {
    accessorKey: 'rol',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => handleSort(column)}>
          Identificador
          <ArrowUpDown />
        </Button>
      );
    },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => handleSort(column)}>
          Nombre
          <ArrowUpDown />
        </Button>
      );
    },
  },
  {
    id: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const role = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="cursor-pointer"
              variant="ghost"
              size="sm"
              disabled={isLoading}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(role)}>
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(role)}
              className="text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
