// Services pour lesquels les tarifs NE sont PAS obligatoires (chantiers sur devis).
// Doit rester aligné avec PRICING_NOT_REQUIRED_SERVICES dans backend/utils/profileCompleteness.js.
export const PRICING_NOT_REQUIRED_SERVICES = ['contractor', 'waterproofing', 'aluminum', 'glass_works', 'metalwork', 'carpentry'];

export const isPricingRequired = (serviceType) => !PRICING_NOT_REQUIRED_SERVICES.includes(serviceType);
