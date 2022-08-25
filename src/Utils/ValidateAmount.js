export default function (amount) {
  if (!amount) return ({ invalid: true, error: "An amount was not provided" });
  if (typeof amount !== "number") return ({ invalid: true, error: "Amount is not a number" });
  if (amount < 1) return ({ invalid: true, error: "The amount must be greater than 0" });
  
  return ({ invalid: false, error: null });
}
