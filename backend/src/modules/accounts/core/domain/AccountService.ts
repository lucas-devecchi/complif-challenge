import { accountRepository, AccountRepository } from "./AccountRepository";
import { NewProps, Account, AccountId } from "./Account";

export class AccountService {
    constructor(private accountRepository: AccountRepository) { }

    async create(props: NewProps) {
        return this.accountRepository.save(Account.new(props));
    }

    async update(account: Account) {
        return this.accountRepository.save(account);
    }

    async delete(id: AccountId): Promise<Account> {
        return this.accountRepository.delete(id);
    }
}

export const accountService = new AccountService(accountRepository);
