export type CategoryDef = {
  id: string
  name: string
  subtitle: string
  /** Folder name under `milynotes vault/` */
  vaultFolder: string
}

export const CATEGORIES: CategoryDef[] = [
  {
    id: 'sql-notes',
    name: 'SQL notes',
    subtitle: 'About SQL and databases',
    vaultFolder: 'INFO 330',
  },
  {
    id: 'database-systems-internals',
    name: 'Database Systems Internals',
    subtitle: 'CSE 444; About databases, more advanced',
    vaultFolder: 'CSE 444',
  },
  {
    id: 'dsa',
    name: 'DSA',
    subtitle: '',
    vaultFolder: 'DSA',
  },
  {
    id: 'server-side-development',
    name: 'Server-side Development',
    subtitle: 'Notes about server from INFO 441',
    vaultFolder: 'INFO 441',
  },
  {
    id: 'ios-development',
    name: 'iOS Development',
    subtitle: 'Notes about iOS from INFO 449',
    vaultFolder: 'INFO 449',
  },
]

export function getCategoryById(id: string): CategoryDef | undefined {
  return CATEGORIES.find((c) => c.id === id)
}
