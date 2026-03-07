/** Props needed to calculate risk */
export type RiskCalculationProps = {
    country: string;
    industry: string;
    documentsComplete: boolean; // TODO: provision for incomplete documents
};

/** Countries without tax treaties or high risk */
const HIGH_RISK_COUNTRIES = new Set([
    'panama', 'cayman islands', 'bahamas', 'british virgin islands', 'bermuda',
    'monaco', 'liechtenstein', 'andorra', 'vanuatu', 'marshall islands',
    'samoa', 'nauru', 'turks and caicos', 'anguilla', 'montserrat',
]);

/** High-risk industries */
const HIGH_RISK_INDUSTRIES = new Set([
    'construction', 'security', 'currency exchange',
    'exchange', 'casinos', 'casino', 'gambling',
]);

const COUNTRY_RISK_POINTS = 40;
const INDUSTRY_RISK_POINTS = 35;
const INCOMPLETE_DOCS_POINTS = 25;

export const RISK_THRESHOLD_MANUAL_REVIEW = 70;

export class RiskCalculator {
    calculate(props: RiskCalculationProps): number {
        const { country, industry, documentsComplete } = props;
        let score = 0;

        const countryNormalized = country.toLowerCase().trim();
        if (HIGH_RISK_COUNTRIES.has(countryNormalized)) {
            score += COUNTRY_RISK_POINTS;
        }

        const industryNormalized = industry.toLowerCase().trim();
        const isHighRiskIndustry = [...HIGH_RISK_INDUSTRIES].some(
            (ind) => industryNormalized.includes(ind) || ind.includes(industryNormalized)
        );
        if (isHighRiskIndustry) {
            score += INDUSTRY_RISK_POINTS;
        }

        if (!documentsComplete) {
            score += INCOMPLETE_DOCS_POINTS;
        }

        return Math.min(score, 100);
    }
}

export const riskCalculator = new RiskCalculator();
