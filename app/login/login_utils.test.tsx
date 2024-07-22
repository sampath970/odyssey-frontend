import "@testing-library/jest-dom";
import { getNextPath } from "./login_utils";

describe("Login Page", () => {
    var user_data = {
      isAlreadyExists: true,
      permissions: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImFkYXNkZmFzZGYifQ.eyJ1c2VyX2lkIjoiNGEwMTQ4NjAtZmYxMi00NDA2LWE0ZWYtNTdlYjU4YmNmMTUzIiwicGVybWlzc2lvbnMiOjU1LCJpYXQiOjE3MDkzMjI5NzUsImlzcyI6Im9keXNzZXktZGV2LTIiLCJhdWQiOiJvZHlzc2V5LWRldi0yLWNsaWVudHMiLCJleHAiOjE3MDkzMjY1NzV9.Nr0y5smV7F8VRuo4Vjy04iNIhbNY9vbjhuZ1yjcuLBZ-GbqAE4EmjxPL7UsjRkZ3l7BU0EGde5XK4sRir1DiIVLtMfppOC97DCSR_q_7V8Co4eaiJNriiS7bDwf1bO6JYwcxKfmhDyORcsFl6KYCKEfEewcL8rGf5Pi4u4INKRZoq2zUSTu8f4zDwO47MfnZd7syjQPZCgWtqVT3gJIXqSHg5NrVCKPWfwXhtQOWaVH8oYJY_hRmTMzqP9VBMHOcsTuze4SF_ChBrPbf61-ztV7KZ5XWqd6Kl12jkMAMhtLkEZeOb6GGqne8TW176bkNRwKJemEwF5iuXMmdZ7fOfA',
      permissions_public_key: {
        alg: 'RS256', 
        pem: '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0…vy50t9W/hdDv\ndQIDAQAB\n-----END PUBLIC KEY-----'
      },
      user: {
        id: '4a014860-ff12-4406-a4ef-57eb58bcf153', resident_id: 'asdfadfag', first_name: 'Stephen', middle_name: '', 
        last_name: 'Wheeler',
        role:     'property_manager',
        ssn_number:'asdfadsf'
      }
    }

  it("Get next path for logged in tenant", () => {
    user_data.user.role = "tenant";
    var result = getNextPath(user_data);
    expect(result).toBe("/users-dashboard/user-dashboard");
  });

  it("Get next path for logged in property manager", () => {
    user_data.user.role = "property_manager";
    var result = getNextPath(user_data);
    expect(result).toBe("/dashboard/my-properties");
  });

  it("Get next path for logged in user with no role", () => {
    user_data.user.role = "";
    var result = getNextPath(user_data);
    expect(result).toBe("/users-dashboard/user-dashboard");
  });


});