import { Account, AccountId } from "../domain/Account";
import { accountService, AccountService } from "../domain/AccountService";

class DeleteAccount {
    constructor(private accountService: AccountService) { }

    async invoke(id: AccountId): Promise<Account> {
        return this.accountService.delete(id);
    }
}

export const deleteAccount = new DeleteAccount(accountService);
