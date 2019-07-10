export default {
    alias: "master-card",
    name: "MasterCard",
    codeName: "CVC",
    codeLength: 3,
    gaps: [4, 8, 12],
    lengths: [16],
    pattern: /^(5[1-5]|222[1-9]|2[3-6]|27[0-1]|2720)\d*$/
};
