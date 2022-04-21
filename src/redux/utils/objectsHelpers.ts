import { usersType } from "../../types/types"

export const updateObjectInArray = (items: Array<usersType>, itemId: number, objPropName: string, newObjProps: { followed: boolean }) => {
  return items.map(u => {
    if (u[objPropName as keyof usersType] === itemId) {
      return { ...u, ...newObjProps }
    }
    return u
  })
}