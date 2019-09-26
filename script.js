// VIEW CONTROLLER 

let ViewController = (function() {

    let DOMStrings = {
        heightButton: ".height-switch",
        weightButton: ".weight-switch",
        waistButton: ".waist-switch",
        heightUnits1: ".input-label-height-1",
        heightUnits2: ".input-label-height-2",
        weightUnits1: ".input-label-weight-1",
        weightUnits2: ".input-label-weight-2",
        waistUnits: ".input-label-waist",
        heightInput1: ".height-input-1-box",
        heightInput2: ".height-input-2-box",
        weightInput1: ".weight-input-1-box",
        weightInput2: ".weight-input-2-box",
        waistInput: ".waist-input-box",
        resultBMI: ".result-bmi",
        resultBMICat: ".result-bmi-cat",
        resultWaist: ".result-waist",
        calc: ".calc",
        arrow: ".arrow-down",
        msg: ".message"
    }

    let unitsSet = [
        imperial = [
            height = ["Feet", "Inches"],
            weight = ["Stone", "Pounds"],
            waist = ["Inches"]
        ],
        metric = [
            height = ["Metres", "Centimeters"],
            weight = ["Kilograms", "Grams"],
            waist = ["Centimeters"]
        ]
    ];

    return {

        getEl: function(str){
            return document.querySelector(str);
        },

        getDOMStrings: function() {
            return DOMStrings;
        },

        updateResults(results) {
            let position;
            let cat;
            if(isNaN(results.bmi)){
                this.getEl(DOMStrings.resultBMI).innerText = `---`;
                this.getEl(DOMStrings.arrow).style.cssText = `left: calc(50% - 10px)`;
            } else {
                this.getEl(DOMStrings.resultBMI).innerText = results.bmi;
            }
            if(isNaN(results.ratio)){
                this.getEl(DOMStrings.resultWaist).innerText = `---`
            } else {
                this.getEl(DOMStrings.resultWaist).innerText = results.ratio;
            }

            position = (results.bmi - 15) * 5;
            this.getEl(DOMStrings.arrow).style.cssText = `left: calc(${position}% - 10px)`;
            console.log(position);

            if(results.bmi <= 18.5){
                cat = "Underweight";
            } else if(results.bmi > 18.5 && results.bmi < 25) {
                cat = "Healthy"
            } else if(results.bmi >= 25 && results.bmi <= 29.9) {
                cat = "Overweight"
            } else if(results.bmi >= 30) {
                cat = "Obese"
            }
            this.getEl(DOMStrings.resultBMICat).innerText = cat;
        },

        updateMessage: function(warning) {
            if(!warning){
                this.getEl(DOMStrings.msg).innerText = "Please enter numbers.";
            } else {
                this.getEl(DOMStrings.msg).innerText = "";
            }
        },

        updateMetric: function(unitType, metricSetting){
            switch(unitType){
                case 0:
                    if(metricSetting){
                        this.getEl(DOMStrings.heightUnits1).innerText = unitsSet[1][0][0];
                        this.getEl(DOMStrings.heightInput1).placeholder = "1";
                        this.getEl(DOMStrings.heightInput1).min = "0";
                        this.getEl(DOMStrings.heightInput1).max = "2";
                        this.getEl(DOMStrings.heightUnits2).innerText = unitsSet[1][0][1];
                        this.getEl(DOMStrings.heightInput2).placeholder = "52";
                        this.getEl(DOMStrings.heightInput2).min = "0";
                        this.getEl(DOMStrings.heightInput2).max = "99";
                    } else {
                        this.getEl(DOMStrings.heightUnits1).innerText = unitsSet[0][0][0];
                        this.getEl(DOMStrings.heightInput1).placeholder = "5";
                        this.getEl(DOMStrings.heightInput1).min = "0";
                        this.getEl(DOMStrings.heightInput1).max = "8";
                        this.getEl(DOMStrings.heightUnits2).innerText = unitsSet[0][0][1];
                        this.getEl(DOMStrings.heightInput2).placeholder = "8";
                        this.getEl(DOMStrings.heightInput2).min = "0";
                        this.getEl(DOMStrings.heightInput2).max = "11";
                    }
                    break;
                case 1:
                    if(metricSetting){
                        this.getEl(DOMStrings.weightUnits1).innerText = unitsSet[1][1][0];
                        this.getEl(DOMStrings.weightUnits2).innerText = unitsSet[1][1][1];
                        this.getEl(DOMStrings.weightInput1).placeholder = "75";
                        this.getEl(DOMStrings.weightInput2).placeholder = "500";
                    } else {
                        this.getEl(DOMStrings.weightUnits1).innerText = unitsSet[0][1][0];
                        this.getEl(DOMStrings.weightUnits2).innerText = unitsSet[0][1][1];
                        this.getEl(DOMStrings.weightInput1).placeholder = "11";
                        this.getEl(DOMStrings.weightInput2).placeholder = "5";
                    }
                    break;
                case 2:
                    if(metricSetting){
                        this.getEl(DOMStrings.waistUnits).innerText = unitsSet[1][2][0];
                        this.getEl(DOMStrings.waistInput).placeholder = "50";
                    } else {
                        this.getEl(DOMStrings.waistUnits).innerText = unitsSet[0][2][0];
                        this.getEl(DOMStrings.waistInput).placeholder = "20";
                    }
                    break;
            }            
        },
    }
})();

// MODEL CONTROLLER

let ModelController = (function() {

    let values = {
        weight: 0,
        height: 0,
        waist: 0,
    };

    let results = {
        bmi: 0,
        ratio: 0
    }

    // 0 height 1 weight 2 waist
    let metric = [false, false, false];

    return {
        initValues: function(){
            values.weight = 0;
            values.height = 0;
            values.waist = 0;
            results.bmi = 0;
            results.ratio = 0;
            metric = [false, false, false];
        },

        calcResults(){
            results.bmi = (values.weight / (values.height * values.height)).toFixed(2);
            results.ratio = (values.waist / values.height).toFixed(2);
        },

        getResults(){
            return results;
        },

        getValues: function(){
            return values;
        },

        getMetric: function(){
            return metric;
        },

        setMetric: function(updatedMetric){
            metric = updatedMetric;
        },

        setValues: function(newValues){
            values = newValues;
        }
    }
})();

// APP CONTROLLER

let AppController = (function(ViewCtrl, ModelCtrl){

    let DOM = ViewCtrl.getDOMStrings();

    let addMetricSwitch = function(){
        ViewCtrl.getEl(DOM.heightButton).selector = 0; // IDs Height
        ViewCtrl.getEl(DOM.weightButton).selector = 1; // IDs Weight
        ViewCtrl.getEl(DOM.waistButton).selector = 2; // IDs Waist
    };

    let setupEventListeners = function(){
        ViewCtrl.getEl(DOM.heightButton).addEventListener("click", switchMetric);
        ViewCtrl.getEl(DOM.weightButton).addEventListener("click", switchMetric);
        ViewCtrl.getEl(DOM.waistButton).addEventListener("click", switchMetric);
        ViewCtrl.getEl(DOM.calc).addEventListener("click", collectInputs)
    };

    let switchMetric = function(e) {
        //get metric state info
        let metric = ModelCtrl.getMetric();
        let unitType = e.target.selector;
        let metricSetting = metric[unitType];

        //flip metric state for relevant unit
        metricSetting =!metricSetting;
        metric[unitType] = metricSetting;

        //update model with new state
        ModelCtrl.setMetric(metric);

        //update UI
        ViewCtrl.updateMetric(unitType, metricSetting)
    };
    
    let collectInputs = function() {
        let height1, height2, weight1, weight2, waist, fullHeight, fullWeight, fullWaist;
        let metricSetting = ModelCtrl.getMetric();
        let values = ModelCtrl.getValues();

        height1 = parseInt(ViewCtrl.getEl(DOM.heightInput1).value);
        height2 = parseInt(ViewCtrl.getEl(DOM.heightInput2).value);
        weight1 = parseInt(ViewCtrl.getEl(DOM.weightInput1).value);
        weight2 = parseInt(ViewCtrl.getEl(DOM.weightInput2).value);
        waist = parseInt(ViewCtrl.getEl(DOM.waistInput).value);

        if(metricSetting[0] === false){
            height1 = height1 / 3.281;
            height2 = height2 * 2.54; 
        }

        fullHeight = height1 + (height2/100);

        if(metricSetting[1] === false){
            weight1 = weight1 * 6.35;
            weight2 = weight2 * 453.592; 
        }

        fullWeight = weight1 + (weight2/1000);

        if(metricSetting[2] === false){
            waist = (waist * 2.54) / 100;
        }

        fullWaist = waist;
        
        values.height = fullHeight;
        values.weight = fullWeight;
        values.waist = fullWaist;

        if(isNaN(values.height) || isNaN(values.weight)){
            ViewCtrl.updateMessage(false);
        } else {
            ViewCtrl.updateMessage(true);
        }
        
        ModelCtrl.setValues(values);
        ModelCtrl.calcResults();

        results = ModelCtrl.getResults();
        ViewCtrl.updateResults(results);


    }

    return {
        init: function(){
            console.log('Application Started');

            // add metric switch to objects
            addMetricSwitch();

            // add event listenets
            setupEventListeners();
        }
    }

})(ViewController, ModelController);

AppController.init();