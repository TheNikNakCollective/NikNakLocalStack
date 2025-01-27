export function excludeHostFiles(path: string) {
  return (
    path.includes("node_modules") ||
    path.includes(".git") ||
    path.includes(".nx") ||
    path.includes(".yarn") ||
    path.includes("dist") ||
    path.includes("pgdata")
  );
}
