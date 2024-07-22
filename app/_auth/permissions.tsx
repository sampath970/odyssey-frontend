// From odyssey-backend - permissions.tsx
export enum AccessPermission {
    Read = 1,
    Write = 2,
    Update = 4,
    Delete = 8,
    Create = 16,
    Execute = 32,
    Admin = 64,
    CrossCompany = 128,
}

export function validate(required_permission: [AccessPermission], permissions: { permissions: number }){
    let permissions_bitmap = permissions ? permissions.permissions : 0;
    let valid = validate_permissions(required_permission, permissions_bitmap);
    return valid;
}

// From odyssey-backend - permissions_validator.tsx
export function validate_permissions(required_permission: [AccessPermission], current_permissions: number): boolean {
    let bitmap = 0;
  
    required_permission.forEach((permission) => {
      bitmap = bitmap | permission;
    });
  
    // Return true if every required permission is currently satisfied.
    let result = (bitmap & current_permissions) === bitmap;
    return result;
  }

module.exports = {
    AccessPermission,
    validate,
}