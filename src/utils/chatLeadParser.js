const normalizeText = (value = '') => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const trimValue = (value) => String(value || '').trim();

const buildRegexPatterns = () => ({
  name: /(?:tên|name)\s*(?:của|là|mi?nh|em|chị|anh|chịu|đăng ký)?\s*[:\-]?\s*([\p{L}\p{M}\s.'-]{2,})/iu,
  phone: /(\+?\d[\d\s().-]{7,}\d)/,
  email: /([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})/i,
  address: /(?:địa chỉ|address|ở|tại)\s*(?:là|[:\-])?\s*([^\n.]{3,120})/iu,
  requirement: /(?:muốn|mong muốn|cần|nhu cầu|yêu cầu|đăng ký|đặt hàng|mua|làm|xây dựng|tư vấn|liên hệ)([^\n.]{3,200})/iu
});

export function extractWebsiteContactLead(message, context = {}) {
  const text = trimValue(message);
  const patterns = buildRegexPatterns();
  const normalized = normalizeText(text);

  const nameMatch = text.match(patterns.name);
  const phoneMatch = text.match(patterns.phone);
  const emailMatch = text.match(patterns.email);
  const addressMatch = text.match(patterns.address);
  const requirementMatch = text.match(patterns.requirement);

  const customerName = nameMatch?.[1]?.trim() || '';
  const phoneNumber = phoneMatch?.[1]?.trim() || '';
  const email = emailMatch?.[1]?.trim() || '';
  const address = addressMatch?.[1]?.trim() || '';
  const customerRequirement = requirementMatch?.[0]?.trim() || text;

  const details = {
    source: 'website',
    sessionId: context.sessionId || '',
    customerName,
    phoneNumber,
    email,
    address,
    customerRequirement,
    shouldSubmit: Boolean(customerName || phoneNumber || email || address || customerRequirement)
  };

  if (!customerName && !phoneNumber && !email && !address) {
    details.shouldSubmit = false;
  }

  return details;
}
