const inquirer = require('inquirer');
const fs = require('fs');
const SVG = require('./lib/SVG');
const { Circle, Triangle, Square } = require('./lib/shapes');

async function run() {
    console.log("Welcome to the Logo Generator!");

    
    const { text } = await inquirer.prompt([
        {
            type: 'input',
            name: 'text',
            message: 'Enter text for the logo (up to three characters):',
            validate: function(input) {
                return input.length <= 3 ? true : "Text must not exceed 3 characters.";
            }
        }
    ]);

    
    const { textColor } = await inquirer.prompt([
        {
            type: 'input',
            name: 'textColor',
            message: 'Enter text color (keyword or hexadecimal):',
            default: 'black'
        }
    ]);

    
    const { shape } = await inquirer.prompt([
        {
            type: 'list',
            name: 'shape',
            message: 'Choose a shape for the logo:',
            choices: ['Circle', 'Triangle', 'Square']
        }
    ]);

    
    const { shapeColor } = await inquirer.prompt([
        {
            type: 'input',
            name: 'shapeColor',
            message: `Enter ${shape.toLowerCase()} color (keyword or hexadecimal):`,
            default: 'white'
        }
    ]);


    const svg = new SVG();
    svg.setText(text, textColor);

    let logoShape;
    switch (shape.toLowerCase()) {
        case 'circle':
            logoShape = new Circle();
            break;
        case 'triangle':
            logoShape = new Triangle();
            break;
        case 'square':
            logoShape = new Square();
            break;
        default:
            console.log("Invalid shape.");
            return;
    }

    logoShape.setColor(shapeColor);
    svg.setShape(logoShape);

    
    const svgString = svg.render();
    fs.writeFile('logo.svg', svgString, (err) => {
        if (err) {
            console.error('Error saving SVG:', err);
            return;
        }
        console.log('Generated logo.svg');
    });
}

run();