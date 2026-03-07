import { Account, AccountId } from '../domain/Account';
import { accountRepository, AccountRepository } from '../domain/AccountRepository';
import { AccountNotFound } from '../domain/errors/AccountNotFound';

class GetAccountById {
  constructor(private accountRepository: AccountRepository) { }

  async invoke(id: AccountId): Promise<Account> {
    const account = await this.accountRepository.getById(id);
    if (!account)
      throw new AccountNotFound(id);
    return account;
  }
}

export const getAccountById = new GetAccountById(accountRepository);
