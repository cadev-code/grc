import { ChevronUp, LogOut, ShieldCheck, User2 } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';
import { Link } from 'react-router';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useCurrentUser, useLogout } from '@/hooks';

const items = [
  {
    title: 'Gestión de Incidentes',
    url: '/incidentes',
    icon: ShieldCheck,
  },
];
export const AppSidebar = () => {
  const { data: user } = useCurrentUser();
  const logout = useLogout();

  return (
    <Sidebar className="select-none">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Gestión de Análisis y Riesgos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center gap-1">
                      <item.icon size={20} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="cursor-pointer py-4">
                  <User2 />
                  <span className="truncate">{user?.fullname}</span>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="end">
                <DropdownMenuItem
                  className="cursor-pointer transition-colors hover:!bg-red-50"
                  onClick={() => logout.mutate()}
                >
                  <span>Cerrar Sesión</span>
                  <LogOut className="text-red-600" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
