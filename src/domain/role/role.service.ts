import RoleModel from './role.model'

export const getRoleByCode = (code: string) => {
  return RoleModel.findOne({ code })
}
