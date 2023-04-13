declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User {
      id: string
      name?: string
      email?: string
      role?: string
    }
  }
}

export interface User {
  email: string
  name: string
}
