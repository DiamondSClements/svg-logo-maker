class SVG {
    constructor() {
        this.text = '';
        this.textColor = '';
        this.shape = null;
    }

    setText(text, color) {
        if (text.length > 3) {
            throw new Error('Text must not exceed 3 characters.');
        }
        this.text = text;
        this.textColor = color;
    }

    setShape(shape) {
        this.shape = shape;
    }

    render() {
        if (!this.text || !this.textColor || !this.shape) {
            throw new Error('Text, text color, and shape must be set before rendering SVG.');
        }

        const shapeSVG = this.shape.render();
        const textSVG = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${this.textColor}">${this.text}</text>`;

        return `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">${shapeSVG}${textSVG}</svg>`;
    }
}

module.exports = SVG;