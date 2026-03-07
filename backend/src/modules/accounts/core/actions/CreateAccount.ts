import { accountService, AccountService } from '../domain/AccountService';
import { NewProps, Account } from '../domain/Account';
import { CreateAccountDto as CreateAccountDTO } from '../../../../delivery/dtos/accountDTO';

class CreateAccount {
  constructor(private accountService: AccountService) { }

  async invoke(props: CreateAccountDTO): Promise<Account> {
    return this.accountService.create(props);
  }
}

export const createAccount = new CreateAccount(accountService);





