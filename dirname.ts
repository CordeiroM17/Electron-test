// dirname.ts
import { fileURLToPath } from "url";
import path from "path";

// Definir globalmente __dirname y __filename para usar en TS
(global as any).__filename = fileURLToPath(import.meta.url);
(global as any).__dirname = path.dirname((global as any).__filename);
