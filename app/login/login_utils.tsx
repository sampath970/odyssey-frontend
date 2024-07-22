// Based on user role, decide where to send them.
export function getNextPath(data: any): string {
    if (data && data.user) {
        if (data.user.role === "property_manager" || data.user.role === "ShadowManager") {
            return '/dashboard/my-properties';
        }
    }
    else {
        // Note: a new user will not have a record in the user table yet. This is normal.                   
        console.log("No user role found with this email");
    }
    // Give the lowest access level. 
    return '/users-dashboard/user-dashboard';
}