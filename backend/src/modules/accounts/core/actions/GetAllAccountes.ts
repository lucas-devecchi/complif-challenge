import { EntriesResult } from "../../../shared/domain/EntriesResult";
import { Account } from "../domain/Account";
import { accountRepository, AccountRepository, GetAllParams } from "../domain/AccountRepository";

class GetAllAccounts {
  constructor(private accountRepository: AccountRepository) {}

  invoke(params: GetAllParams): Promise<EntriesResult<Account>> {
    return this.accountRepository.getAll(params);
  }
}

export const getAllAccounts = new GetAllAccounts(accountRepository);

