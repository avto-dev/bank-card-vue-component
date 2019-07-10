export default {
    alias: "unionpay",
    name: "UnionPay",
    codeName: "CVN",
    codeLength: 3,
    gaps: [4, 8, 12],
    lengths: [16, 17, 18, 19],
    pattern: /^62[0-5]\d*$/
};
