import moment from "moment";
moment.locale("zh-cn");
const timeFormat = {
  getTime: (time) => {
    return moment(time).format("YYYY/MM/DD");
  },
};

export default timeFormat;
