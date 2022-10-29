import { Collection } from "mongodb"
import { MongoHelper } from "../helpers/mongodb-helper"
import { LogMongoRepository } from "./log-repository"

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository()
}

describe('Log Error Mongo', () => {
  let errorCollection: Collection
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  test('should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError('any_error')
    const count = await errorCollection.countDocuments()

    expect(count).toBe(1)
  })
})
