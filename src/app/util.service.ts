import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }
  //roundoff the number
  roundOff(num) {
    try {
      return isNaN(Math.round(num)) == true ? 0 : Math.round(num);
    } catch (error) {
      return 0;
    }

  }

  ConvertToHours(value) {
    try {
      return value / 3600;
    } catch (error) {
      return 0;
    }
  }

  //get digits after decimal for 2 digit use digit as 1e2, for 3 digit use 1e3
  GetDigitDecimalNum(Number,digit) {
    return Math.round(Number * digit) / digit;
  }

  //dynamically accessing object property
  filterMyArr(myArr, condition) {
    return myArr.map(element => element[condition])
  }


  fromEntries<T>(entries: [keyof T, T[keyof T]][]): T {
    return entries.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), <T>{});
  }

  groupAndSum(arr, groupKeys, sumKeys) {
    return Object.values(
      arr.reduce((acc, curr) => {
        const group = groupKeys.map(k => curr[k]).join('-');
        acc[group] = acc[group] || this.fromEntries<Object>(groupKeys.map(k => [k, curr[k]]).concat(sumKeys.map(k => [k, 0])));
        sumKeys.forEach(k => acc[group][k] += curr[k]);
        return acc;
      }, {})
    );
  }

  GenerateRunningTotals(data) {
    let temp = 0;
    let final = data.map(v => ({
      executing: temp += v.executing,
      date: v.date
    }));
    console.log(final)
    return final;
  }
  SumOfArrayByProperty(data, prop) {
    return data.reduce(function (a, b) {
      return a + b[prop];
    }, 0);
  }

  ConvertArrayDataToHour(data) {
    try {
      data.forEach(function (sa, index) {
        data[index] = sa.map(function (each_element) {
          if (typeof each_element === "number") { return Number((each_element / 3600).toFixed(1)); } else { return each_element }
        });
      });
      return data;
    } catch (error) {
      return data;
    }
  }

  removeDuplicates(data) {
    return [...new Set(data)]

  }


  dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      /* next line works with strings and numbers, 
       * and you may want to customize it to your needs
       */
      var result = (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }
}
