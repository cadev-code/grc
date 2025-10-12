import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Rol } from '@/types';
import { Search } from 'lucide-react';

type Props = {
  filter: { search: string; rol: string };
  setFilter: (f: { search: string; rol: string }) => void;
  roles: Rol[];
  isLoading: boolean;
};

export const FilterBar = ({ filter, setFilter, roles, isLoading }: Props) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nombre o usuario"
          className="pl-10"
          value={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
        />
      </div>

      <Select
        value={filter.rol}
        onValueChange={(v: string) => setFilter({ ...filter, rol: v })}
        disabled={isLoading}
      >
        <SelectTrigger className="w-full sm:w-[220px]">
          <SelectValue placeholder="Rol" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los roles</SelectItem>
          {roles.map((r) => (
            <SelectItem key={r.id} value={r.rol}>
              {r.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
