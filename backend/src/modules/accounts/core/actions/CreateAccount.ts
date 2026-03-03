import { accountService, AccountService } from '../domain/AccountService';
import { NewProps, Account } from '../domain/Account';

class CreateAccount {
  constructor(private accountService: AccountService) { }

  async invoke(props: NewProps): Promise<Account> {
    return this.accountService.create(props);
  }
}

export const createAccount = new CreateAccount(accountService);





