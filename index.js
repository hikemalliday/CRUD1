
   
//Classes
class Food 
{
    constructor(cals, protein ,carbs, fat, name)
    {
        this.cals = cals;
        this.protein = protein;
        this.carbs = carbs;
        this.fat = fat;
        this.name = name;
    }
    getMacrosPerGrams(grams)
    {
        return [this.cals * grams, this.protein * grams, this.carbs * grams, this.fat * grams]
    }
}

class DailyTotals
{
    constructor()
    {
        this.totalCals = 0;
        this.totalProtein = 0;
        this.totalCarbs = 0;
        this.totalFat = 0;
    }
    updateMacros(cal, p, c, f)
    {
        this.totalCals = this.totalCals + cal;
        this.totalProtein = this.totalProtein + p;
        this.totalCarbs = this.totalCarbs + c;
        this.totalFat = this.totalFat + f;
    }
    getTotalCals()
    {
        return this.totalCals;
    }
    getTotalProtein()
    {
        return this.totalProtein;
    }
    getTotalCarbs()
    {
        return this.totalCarbs;
    }
    getTotalFat()
    {
        return this.totalFat;
    }
    
}


//Daily Total / Cals Remaining displays
function totalCals(formData)
{
    console.log(dailyTotal)
    dailyTotal = dailyTotal + parseInt(formData['calories'])
    //dailyTotal = parseInt(dailyTotal) + parseInt(document.getElementById('calories').value)
    document.getElementById('dailyTotal').innerHTML = `Daily Total: ${dailyTotal}`
    document.getElementById('calsRemaining').innerHTML = `Remaining: ${calsRemaining - dailyTotal}`
}

function getBudgetCals()
{
    calsRemaining = remaining.value;
    document.getElementById('calsRemaining').innerHTML = `Remaining: ${calsRemaining - dailyTotal}`
   
}

//Functions copied from the CRUD video
function onFormSubmit()
{
    
    event.preventDefault();
    let formData = readFormData();
    if (selectedRow === null)
    {
        insertNewRecord(formData);
    }
    else
    {
        updateRecord(formData);
    }
    totalCals(formData);
    resetForm();

}

//Retrieve the Data (I added 'let array' to have something to dump the 'getMacrosPerGrams' output into)
function readFormData()
{
    
    let formData = {};
    let foodInput = getFoodInput(document.getElementById('food').value)
    
    let cals;
    let protein;
    let carb;
    let fat;

    [cals, protein, carb, fat] = foodInput.getMacrosPerGrams(document.getElementById('grams').value);
    formData['food'] = document.getElementById('food').value;
    formData['grams'] = document.getElementById('grams').value;
    formData['calories'] = cals;
    formData['protein'] = protein;
    formData['carb'] = carb;
    formData['fat'] = fat;
    
   

    return formData;
    //Take this OUT
    //Convert Food dropdown input into Object
    
}

function getFoodInput(input)
    {
        switch(input)
        {
            case 'Broccoli':
                input = Broccoli
                break;
            case 'Carrot':
                input = Carrot
                break;
            case 'Pbfit':
                input = Pbfit
                break;
            case 'ChickenBreast':
                input = ChickenBreast
                break;
            case 'Spinach':
                input = Spinach
                break;
        }
        return input;
    }   

//Insert the data
function insertNewRecord(data)
{
    let table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow(table.length);
    let cell1 = newRow.insertCell(0);
        cell1.innerHTML = data.food;
    let cell2 = newRow.insertCell(1);
        cell2.innerHTML = data.grams;
    let cell3 = newRow.insertCell(2);
        cell3.innerHTML = data.calories;
    let cell4 = newRow.insertCell(3);
        cell4.innerHTML = data.protein;
    let cell5 = newRow.insertCell(4);
        cell5.innerHTML = data.carb;
    let cell6 = newRow.insertCell(5);
        cell6.innerHTML = data.fat;
    let cell7 = newRow.insertCell(6);
        cell7.innerHTML = `<button onClick='onEdit(this)'> Edit </button> <button onClick='onDelete()'> Delete </button>` 
        
}

//Edit the data
function onEdit(td)
{
    selectedRow = td.parentElement.parentElement;
    document.getElementById('food').value = selectedRow.cells[0].innerHTML;
    document.getElementById('grams').value = selectedRow.cells[1].innerHTML;
    document.getElementById('calories').value = selectedRow.cells[2].innerHTML;
    
}

function updateRecord(formData)
{
    selectedRow.cells[0].innerHTML = formData.food;
    selectedRow.cells[1].innerHTML = formData.grams;
    selectedRow.cells[2].innerHTML = formData.calories;
}

//Delete the data
function onDelete(td)
{
    if(confirm('Do you want to delete?'))
    {
        row = td.parentElement.parentElement;
        document.getElementById('storeList').deleteRow(row.rowIndex);
    }
    resetForm();
}

//Reset the data
function resetForm()
{
    document.getElementById('food').value = '';
    document.getElementById('grams').value = '';
    document.getElementById('calories').value = '';
}

//Food types
const Broccoli = new Food(.35, .028, .066, .0037, 'Broccoli');
const Carrot = new Food(.41, .01, 0.0958, 0.0024, 'Carrot');
const Pbfit = new Food(5.38461, .5, .3125, 0.125, 'Pbfit');
const ChickenBreast = new Food(1.51, .3, 0, 0.0317, 'ChickenBreast');
const Spinach = new Food(.19, .005, .006, .026, 'Spinach');

//Vars
let selectedRow = null;
let dailyTotal = 0;
let calsRemaining;
let grams = parseInt(document.getElementById('calories').value);
let remaining = document.getElementById("calsRemaining")
let formData = {};

///Testing iterators for pulldown menu

let foodTypes =
[
    Broccoli, Carrot, Pbfit, ChickenBreast, Spinach
]

function populateDropdownList(input)
{
    let select = document.getElementById("food");
    for (let i = 0; i < input.length; i++)
    {
        let foods = input[i].name;
        let option = document.createElement("option");
        option.textContent = foods;
        option.value = foods;
        select.appendChild(option)
    }
}

populateDropdownList(foodTypes)


