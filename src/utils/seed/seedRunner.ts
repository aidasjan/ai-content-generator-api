import SeedModel from './seed.model'
import { seeds } from './seeds'

const checkSeed = (code: string) => {
  return SeedModel.exists({ code })
}

const addSeed = async (code: string) => {
  return await new SeedModel({ code }).save()
}

export const seedDb = async () => {
  console.log('Seeding database...')
  await Promise.all(
    seeds.map(async (seed) => {
      const exists = await checkSeed(seed.code)
      if (!exists) {
        await seed.seed()
        await addSeed(seed.code)
      }
    })
  )
  console.log('Seeding completed.')
}
