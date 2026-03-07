1- One account per business?
resp: I think a validated business can handle multiple accounts, with shared groups since those belong to the business, not to individual accounts.

2- What's the best way to retrieve industry risk options?
resp: It depends on the architecture, but I would usually call an API and populate the select/dropdown with the response. A free text input shouldn't be allowed in any way. The only way to make it "a little bit safer" would be to create an Agent that validates whether the text input indicates risk, but that would be an avoidable cost.

3- Is the riskCalculator usually a microservice?
resp: If the answer is yes, I'll call it in the businessService, else I would call it inside the Business class and therefore make it less anemic. I assume that the answer is yes, so it isn't correct to create a business object if it depends on an API call inside

4- A business that is Rejected can be Approved, and a business approved can be rejected?
resp:I think that a rejected business can be approved later in the future, but can't reject an approved business.