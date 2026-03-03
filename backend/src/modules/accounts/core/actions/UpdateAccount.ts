import { Account, AccountId, AccountProps } from "../domain/Account";
import { accountRepository, AccountRepository } from "../domain/AccountRepository";
import { accountService, AccountService } from "../domain/AccountService";
import { AccountNotFound } from "../domain/errors/AccountNotFound";

class UpdateAccount {
    constructor(private accountService: AccountService, private repository: AccountRepository) { }

    async invoke(id: AccountId, params: Partial<Omit<AccountProps, "id">>): Promise<Account> {
        const account = await this.repository.getById(id);
        if (!account)
            throw new AccountNotFound(id);

        const updatedAccount = new Account({ ...account, ...params });
        return this.accountService.update(updatedAccount);
    }
}

export const updateAccount = new UpdateAccount(accountService, accountRepository);

