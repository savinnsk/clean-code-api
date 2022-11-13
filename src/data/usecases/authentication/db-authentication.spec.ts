import { LoadAccountByEmailRepository } from "../../protocols/load-account-email-repository"
import { AccountModel } from "../add-account/db-add-account-protocols"
import { DbAuthentication } from "./db-authentication"

const makeLoadAccountByEmailRepositoryStub = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel> {
      const account: AccountModel = {
        id: "any_id",
        name: "any_name",
        email: "any_mail@mail.com",
        password: "any_password"
      }
      return new Promise(resolve => resolve(account))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepositoryStub()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub
  }
}

describe("DbAuthentication useCase", () => {
  test("should call loadAccountByEmailRepository with correct email", async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, "load")
    await sut.auth({
      email: "any_mail@mail.com",
      password: "any_password"
    })

    expect(loadSpy).toHaveBeenCalledWith("any_mail@mail.com")
  })
})
