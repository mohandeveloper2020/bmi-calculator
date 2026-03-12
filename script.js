const calculateBMI = () => {
    const heightInput = prompt("Enter your height in meters:");
    const weightInput = prompt("Enter your weight in kilograms:");

    const heightNum = parseFloat(heightInput);
    const weightNum = parseFloat(weightInput);

    const height = heightNum / 100; // Convert height from centimeters to meters if needed

    const bmi = weightNum / (height ** 2);
    const resultElement = document.getElementById("result");
    resultElement.textContent = `Your BMI is: ${bmi.toFixed(2)}`;
}