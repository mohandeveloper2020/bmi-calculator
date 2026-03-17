const bmiClasses = ["underweight", "normal-weight", "class-i-obesity", "class-ii-obesity", "class-iii-obesity"];
const heightUnitConfig = {
    cm: { min: 100, max: 250, placeholder: "e.g. 170" },
    inch: { min: 40, max: 100, placeholder: "e.g. 67" },
    feet: { min: 3, max: 8, placeholder: "e.g. 5.8" }
};

const convertHeightToCm = (heightValue, unit) => {
    switch (unit) {
    case "cm":
        return heightValue;
    case "inch":
        return heightValue * 2.54;
    case "feet":
        return heightValue * 30.48;
    default:
        return NaN;
    }
};

const applyHeightUnitConfig = () => {
    const heightElement = document.getElementById("height");
    const heightUnitElement = document.getElementById("height-unit");
    const config = heightUnitConfig[heightUnitElement.value];

    heightElement.min = String(config.min);
    heightElement.max = String(config.max);
    heightElement.placeholder = config.placeholder;
};

const calculateBMI = () => {
    const heightElement = document.getElementById("height");
    const heightUnitElement = document.getElementById("height-unit");
    const weightElement = document.getElementById("weight");
    const resultElement = document.getElementById("result");

    // get the height and weight input values
    const heightInput = heightElement.value;
    const heightUnit = heightUnitElement.value;
    const weightInput = weightElement.value;

    // convert the input values to numbers
    const heightNum = parseFloat(heightInput);
    const weightNum = parseFloat(weightInput);

    // Reset old category styles before applying the new one.
    resultElement.classList.remove(...bmiClasses);

    if (heightInput.trim() === "" || weightInput.trim() === "") {
        resultElement.textContent = "Your BMI result will appear here.";
        return;
    }

    if (Number.isNaN(heightNum) || Number.isNaN(weightNum) || heightNum <= 0 || weightNum <= 0) {
        resultElement.textContent = "Please enter valid height and weight values.";
        return;
    }

    // Convert height to centimeters based on selected unit.
    const height = convertHeightToCm(heightNum, heightUnit);

    if (Number.isNaN(height)) {
        resultElement.textContent = "Please select a valid height unit.";
        return;
    }

    // Formula to calculate bmi
    const bmi = weightNum / height / height * 10000;

    let bodyMass;
    let advice;

    switch (true) {
    case bmi < 18.5:
        bodyMass = "Underweight";
        resultElement.classList.add("underweight");
        advice = "Consider a balanced diet and consult a healthcare provider for personalized advice.";
        break;
    case bmi < 25:
        bodyMass = "Normal weight";
        resultElement.classList.add("normal-weight");
        advice = "Maintain your healthy lifestyle with regular exercise and a balanced diet.";
        break;
    case bmi < 30:
        bodyMass = "Class I Obesity";
        resultElement.classList.add("class-i-obesity");
        advice = "Consider a structured weight loss program and consult a healthcare provider for guidance.";
        break;
    case bmi < 40:
        bodyMass = "Class II Obesity";
        resultElement.classList.add("class-ii-obesity");
        advice = "Consider a more intensive weight loss program and consult a healthcare provider for guidance.";
        break;
    case bmi >= 40:
        bodyMass = "Class III Obesity";
        resultElement.classList.add("class-iii-obesity");
        advice = "Seek immediate medical attention and follow a comprehensive treatment plan.";
        break;
    default:
        bodyMass = "Unknown category";
        advice = "Please consult a healthcare provider for guidance.";
    }

    // Display the BMI result and body mass category
    resultElement.innerHTML = `Your BMI is: ${bmi.toFixed(2)} - ${bodyMass}
    <p class="advice">${advice}</p>`;
};

const setupLiveBMI = () => {
    const heightElement = document.getElementById("height");
    const heightUnitElement = document.getElementById("height-unit");
    const weightElement = document.getElementById("weight");

    const handleInput = () => {
        calculateBMI();
    };

    heightElement.addEventListener("input", handleInput);
    heightUnitElement.addEventListener("change", () => {
        applyHeightUnitConfig();
        handleInput();
    });
    weightElement.addEventListener("input", handleInput);

    applyHeightUnitConfig();
};

setupLiveBMI();