const calculateBMI = () => {
    // get the height and weight input values
    const heightInput = document.getElementById("height").value;
    const weightInput = document.getElementById("weight").value;

    // convert the input values to numbers
    const heightNum = parseFloat(heightInput);
    const weightNum = parseFloat(weightInput);

    const resultElement = document.getElementById("result");

    if (Number.isNaN(heightNum) || Number.isNaN(weightNum) || heightNum <= 0 || weightNum <= 0) {
        resultElement.textContent = "Please enter valid height and weight values.";
        return;
    }

    // Convert height from feet to centimeters
    const height = heightNum * 30.48;

    // Formula to calculate bmi
    const bmi = weightNum / height / height * 10000;

    // Determine the body mass category based on the BMI value
    const bodyMass = bmi < 18.5 ? "Underweight" :
                     bmi < 24.9 ? "Normal weight" :
                     bmi < 29.9 ? "Class I Obesity" : 
                     bmi < 39.9 ? "Class II Obesity" :
                     "Class III Obesity";

    // Display the BMI result and body mass category
    resultElement.textContent = `Your BMI is: ${bmi.toFixed(2)} - ${bodyMass}`;
}