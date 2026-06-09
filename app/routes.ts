import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("privacy", "routes/privacy.tsx"),
  route("terms", "routes/terms.tsx"),
  route("data-deletion", "routes/data-deletion.tsx"),
  route("api/data-deletion-request", "routes/api.data-deletion-request.ts"),
] satisfies RouteConfig;
