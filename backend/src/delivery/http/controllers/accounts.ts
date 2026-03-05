import { createAccount } from "../../../modules/accounts/core/actions/CreateAccount";
import { getAllAccounts } from "../../../modules/accounts/core/actions/GetAllAccounts";
import { getAccountById } from "../../../modules/accounts/core/actions/GetAccountById";
import { updateAccount } from "../../../modules/accounts/core/actions/UpdateAccount";
import { getAccountId, getPagination } from "../../utils/Functions";
import Controller from "./controller";
import { deleteAccount } from "../../../modules/accounts/core/actions/DeleteAccount";

export const getAllAccountsController: Controller = async (req, res) => {
    const accounts = await getAllAccounts.invoke({
        pagination: getPagination(req),
    });

    res.status(200).json(accounts);
};

export const getAccountByIdController: Controller = async (req, res) => {
    const account = await getAccountById.invoke(getAccountId(req));
    res.status(200).json(account);
};

export const createAccountController: Controller = async (req, res) => {
    const { accountNumber, businessId } = req.body;

    const account = await createAccount.invoke({
        accountNumber,
        business: { id: businessId },
    });
    res.status(201).json(account);
};

export const updateAccountController: Controller = async (req, res) => {
    const { accountNumber, businessId, signatureSchemaId } = req.body;

    const account = await updateAccount.invoke(getAccountId(req), {
        accountNumber,
        business: { id: businessId },
    });

    res.status(200).json(account);
};

export const deleteAccountController: Controller = async (req, res) => {
    const account = await deleteAccount.invoke(getAccountId(req));
    res.status(200).json(account);
};
