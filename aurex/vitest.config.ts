import { defineConfig } from "vitest/config";
import path from "path";

const root = path.resolve(import.meta.dirname);

// Tests run against a real MySQL/MariaDB database, never the development one.
export default defineConfig({
  root,
  resolve: {
    alias: {
      "@": path.resolve(root, "src"),
      "@contracts": path.resolve(root, "contracts"),
      "@db": path.resolve(root, "db"),
    },
  },
  test: {
    environment: "node",
    include: ["api/**/*.test.ts"],
    fileParallelism: false,
    testTimeout: 20000,
    env: {
      NODE_ENV: "test",
      DATABASE_URL: process.env.TEST_DATABASE_URL ?? "mysql://aurex:aurexdev@127.0.0.1:3306/aurex_test",
      APP_SECRET: "test-secret-test-secret-test-secret-123456",
      UPLOAD_DIR: path.resolve(root, "storage/test-uploads"),
      ADMIN_EMAIL: "",
      ADMIN_PASSWORD: "",
    },
  },
});
