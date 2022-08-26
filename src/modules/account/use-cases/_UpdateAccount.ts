import {BadRequestError, NotFoundError} from "../../../lib/errors";
import {IAccountRepository} from "../domain/interfaces/IAccountRepository";

interface Props {
    AccountRepository: IAccountRepository
}

export interface UpdateAccountProps {
    id: string
    vatNumber?: string
    name?: string
    addressLine1?: string
    addressLine2?: string
    postCode?: string
    city?: string
    state?: string
    country?: string
    phone?: string
    email?: string
}

export function _UpdateAccount({AccountRepository}: Props) {

    async function Execute({
                               id,
                                vatNumber,
                               name,
                               addressLine1,
                               addressLine2,
                               postCode,
                               city,
                               state,
                               country,
                               phone,
                               email,
                           }: UpdateAccountProps) {

        if (!id) throw new BadRequestError('ID is required')
        const account = await AccountRepository.getOneById(id)
        if (!account) throw new NotFoundError('Account not found')
        if(vatNumber) account.vatNumber = vatNumber
        if (name) account.name = name
        if (addressLine1) account.addressLine1 = addressLine1
        if (addressLine2) account.addressLine2 = addressLine2
        if (postCode) account.postCode = postCode
        if (city) account.city = city
        if (state) account.state = state
        if (country) account.country = country
        if (phone) account.phone = phone
        if (email) account.email = email

        return await AccountRepository.update(account)
    }

    return {
        Execute
    };
};