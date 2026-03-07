import { businessService, BusinessService } from '../domain/services/BusinessService';
import { statusHistoryService, StatusHistoryService } from '../domain/services/StatusHistoryService';
import { Business, BusinessStatus } from '../domain/entities/Business';
import { CreateBusinessDto } from '../../../../delivery/dtos/businessDTO';
import { accountService, AccountService } from '../../../accounts/core/domain/AccountService';
import { signatureSchemaService, SignatureSchemaService } from '../../../signatureSchemas/core/domain/services/SignatureSchemaService';

class CreateBusiness {
  constructor(
    private businessService: BusinessService,
    private statusHistoryService: StatusHistoryService,
    private accountService: AccountService,
    private signatureSchemaService: SignatureSchemaService,
  ) { }

  async invoke(props: CreateBusinessDto): Promise<Business> {
    const { userId, ...businessDTO } = props;

    const business = await this.businessService.create(businessDTO);

    await this.statusHistoryService.create({
      business: { id: business.id },
      previousStatus: undefined,
      newStatus: business.status,
      user: { id: userId },
    });

    const evaluatedBusiness = await this.businessService.updateStatusBasedOnRiskScore(business);

    if (evaluatedBusiness.status !== BusinessStatus.PENDING) {
      await this.statusHistoryService.create({
        business: { id: business.id },
        previousStatus: BusinessStatus.PENDING,
        newStatus: evaluatedBusiness.status,
        user: { id: userId },
      });
    }

    if (evaluatedBusiness.status === BusinessStatus.APPROVED) {
      const account = await this.accountService.create({ business: { id: business.id } });
      await this.signatureSchemaService.create({ account: { id: account.id } });
  }

    return evaluatedBusiness;
  }
}

export const createBusiness = new CreateBusiness(businessService, statusHistoryService, accountService, signatureSchemaService);




