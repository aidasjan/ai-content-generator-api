import RoleModel from '../../domain/role/role.model'

export const seeds = [
  {
    code: 'createRoles',
    seed: async () => {
      console.log('Inserting roles...')
      await RoleModel.insertMany([
        { code: 'admin', name: 'Admin' },
        { code: 'user', name: 'User' }
      ])
    }
  }
]
