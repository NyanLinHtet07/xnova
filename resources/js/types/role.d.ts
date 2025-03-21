export interface RoleType {
    id: number;
    name: string;
    permissions: PermissionType[];
    guard_name: string;
}

export interface PermissionType{
    id: number;
    name: string;
    guard_name:string;
    group_name:string
}