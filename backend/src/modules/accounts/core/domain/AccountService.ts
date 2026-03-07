import { accountRepository, AccountRepository } from "./AccountRepository";
import { NewProps, Account, AccountId } from "./Account";
import { CreateAccountDto } from "../../../../delivery/dtos/accountDTO";

export class AccountService {
    constructor(private accountRepository: AccountRepository) { }

    async create(props: CreateAccountDto) {
        const nextAccountNumber = await this.accountRepository.getNextAccountNumberForBusiness(props.business.id);
        
        return this.accountRepository.save(Account.new({ ...props, accountNumber: String(nextAccountNumber) }));
    }

    async update(account: Account) {
        return this.accountRepository.save(account);
    }

    async delete(id: AccountId): Promise<Account> {
        return this.accountRepository.delete(id);
    }
}

export const accountService = new AccountService(accountRepository);
