import { ColumnDef } from '@tanstack/react-table';
import { Rol } from '@/types';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type RolesColumnsProps = {
  onEdit: (rol: Rol) => void;
  onDelete: (rol: Rol) => void;
};

export const rolesColumns = ({
  onEdit,
  onDelete,
}: RolesColumnsProps): ColumnDef<Rol>[] => [
  {
    accessorKey: 'rol',
    header: 'Identificador',
  },
  {
    accessorKey: 'title',
    header: 'Nombre',
  },
  {
    id: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const role = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="cursor-pointer" variant="ghost" size="sm">
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
