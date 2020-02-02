let mainObj = {
    bdate0: "15-01-2003",
    bdate1: "03-02-2002",
    bdate2: "15-04-1970",
    bdate3: "15-04-1999"
}

let needYearsOldData = ["0-17", "18-21", "22-24", "25-27", "28-30", "31-35", "36-45", "46+"]

const barChartDrawer = (main, yearOld, needId) => {
    let countYearOld = [];
    let countOfEachYear = {
        yearLess18: 0,
        yearLess22: 0,
        yearLess25: 0,
        yearLess28: 0,
        yearLess31: 0,
        yearLess36: 0,
        yearLess46: 0,
        yearMore46: 0
    }
    objYearsMinMax = {
        "0": 18,
        "18": 22,
        "22": 25,
        "25": 28,
        "28": 31,
        "31": 36,
        "36": 46
    }
    for (let [key, value] of Object.entries(main)) {
        let yearOld = new Date().getFullYear() - Number(value.slice(value.length - 4, value.length))
        let monthCount = new Date().getMonth() - Number(value.slice(3, 5)) + 1
        let day = new Date().getDate() - Number(value.slice(0, 2))

        forMinify = (obj) => {
            for (let [key, val] of Object.entries(obj)) {
                if (+key <= yearOld && yearOld <= val) {
                    if (yearOld === +key && monthCount > 0) {
                        countOfEachYear[`yearLess${val}`] += 1
                        console.log(val)
                    }
                    else if (yearOld === +key && monthCount === 0) {
                        if (day >= 0) {
                            countOfEachYear[`yearLess${val}`] += 1
                        }
                    }
                    else if (yearOld === val && monthCount < 0) {
                        countOfEachYear[`yearLess${val}`] += 1
                    }
                    else if (yearOld === val && monthCount === 0) {
                        if (day <= 0) {
                            countOfEachYear[`yearLess${val}`] += 1
                        }
                    }
                    else if (yearOld >= +key + 1 && yearOld <= val - 1) {
                        countOfEachYear[`yearLess${val}`] += 1
                    }
                }
            }

        }

        if (yearOld >= 46) {
            if (yearOld === 46 && monthCount > 0) {
                countOfEachYear.yearMore46 += 1
            }
            else if (yearOld === 46 && monthCount === 0) {
                if (day > 0) {
                    countOfEachYear.yearMore46 += 1
                }
            }
            else if (yearOld >= 47) {
                countOfEachYear.yearMore46 += 1
            }
        }
        forMinify(objYearsMinMax)
    }

    let colors = [];

    for (let [key, val] of Object.entries(countOfEachYear)) {
        colors.push("#EA924A")
        countYearOld.push(val)
    }

    const canvas = document.getElementById(needId);
    const ctx = canvas.getContext('2d');

    const data = {
        labels: yearOld,
        datasets: [{
            backgroundColor: colors,
            hoverBackgroundColor: colors,
            data: countYearOld
        }]
    }

    const options = {
        legend: false
    }

    new Chart(ctx, {
        type: 'bar',
        data: data,
        options
    });
    Chart.defaults.global.defaultFontSize = 15;
    Chart.defaults.global.defaultFontColor = 'black';

}

BarChart(mainObj, needYearsOldData, "pieChart")