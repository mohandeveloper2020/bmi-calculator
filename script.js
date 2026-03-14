const calculateBMI = () => {
    // get the height and weight input values
    const heightInput = document.getElementById("height").value;
    const weightInput = document.getElementById("weight").value;

    // convert the input values to numbers
    const heightNum = parseFloat(heightInput);
    const weightNum = parseFloat(weightInput);

    const resultElement = document.getElementById("result");
    const bmiClasses = ["underweight", "normal-weight", "class-i-obesity", "class-ii-obesity", "class-iii-obesity"];

    // Reset old category styles before applying the new one.
    resultElement.classList.remove(...bmiClasses);

    if (Number.isNaN(heightNum) || Number.isNaN(weightNum) || heightNum <= 0 || weightNum <= 0) {
        resultElement.textContent = "Please enter valid height and weight values.";
        return;
    }

    // Convert height from feet to centimeters
    const height = heightNum * 30.48;

    // Formula to calculate bmi
    const bmi = weightNum / height / height * 10000;

    let bodyMass;

    switch (true) {
    case bmi < 18.5:
        bodyMass = "Underweight";
        resultElement.classList.add("underweight");
        break;
    case bmi < 25:
        bodyMass = "Normal weight";
        resultElement.classList.add("normal-weight");
        break;
    case bmi < 30:
        bodyMass = "Class I Obesity";
        resultElement.classList.add("class-i-obesity");
        break;
    case bmi < 40:
        bodyMass = "Class II Obesity";
        resultElement.classList.add("class-ii-obesity");
        break;
    case bmi >= 40:
        bodyMass = "Class III Obesity";
        resultElement.classList.add("class-iii-obesity");
        break;
    default:
        bodyMass = "Unknown category";
    }

    // Display the BMI result and body mass category
    resultElement.textContent = `Your BMI is: ${bmi.toFixed(2)} - ${bodyMass}`;
}