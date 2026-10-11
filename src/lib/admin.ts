import { NextRequest } from "next/server";

export function hasAdminToken() {
  return Boolean(process.env.ADMIN_API_TOKEN);
}

export function isAuthorizedAdmin(request: NextRequest) {
  const token = process.env.ADMIN_API_TOKEN;
  if (!token) return false;
  const auth = request.headers.get("authorization");
  return auth === `Bearer ${token}`;
}
