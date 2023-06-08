export const regExp = {
  onlyNumber: /^[0-9]*$/,
  mobileNumber:
    // eslint-disable-next-line no-useless-escape
    /((\+66|0)(\d{1,2}\-?\d{3}\-?\d{3,4}))|((\+๖๖|๐)([๐-๙]{1,2}\-?[๐-๙]{3}\-?[๐-๙]{3,4}))/gm,
};
