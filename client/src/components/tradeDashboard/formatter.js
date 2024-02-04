
const formater = (name, price, dateList, date, type) => {
        let formatedName;
        const trimedDate = date.split("T")[0];
        console.log(date)
        console.log(trimedDate)
        const trimedDateList = dateList.map((item) => item.value && item.value);
        trimedDateList.map((date, index) => {
          if (date == trimedDate) {
            console.log(trimedDateList[index + 1]);
    
            function getShortMonth(monthNumber, isLastWeek) {
              const month = {
                "01": "JAN",
                "02": "FEB",
                "03": "MAR",
                "04": "APR",
                "05": "MAY",
                "06": "JUN",
                "07": "JUL",
                "08": "AUG",
                "09": "SEP",
                "10": "OCT",
                "11": "NOV",
                "12": "DEC",
              };
              return isLastWeek ? month[monthNumber] : month[monthNumber].charAt(0);
            }
    
            const monthNumber = trimedDate.substring(5, 7);
            const isLastWeek =
              trimedDateList[index + 1] &&
              trimedDateList[index + 1].substring(5, 7) !== monthNumber;
    
            formatedName =
              name +
              trimedDate.substring(2, 4) +
              getShortMonth(monthNumber, isLastWeek) +
              (isLastWeek ? "" : trimedDate.substring(8)) +
              price +
              type;
          }
        });
    
        return formatedName;
}

export default formater