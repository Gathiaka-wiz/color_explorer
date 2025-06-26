# Color Explorer

Color Explorer is a vibrant web application that allows users to generate, explore, and copy beautiful color palettes. Each palette consists of six complementary colors, making it perfect for designers, developers, and anyone who loves color!

## Features

- **Palette Generation:** Instantly generate a palette of six complementary colors.
- **Copy to Clipboard:** Click the copy icon to copy any color's hex code.
- **Responsive Design:** Works great on desktop and mobile.
- **Accessible UI:** Easy to use and visually appealing.

## How It Works

1. **Palette Generation:**  
   On page load or when you click the "Generate" button (or press the spacebar), a new palette of six complementary colors is created and displayed.
2. **Copying Colors:**  
   Click the copy icon below any color to copy its hex code to your clipboard. A toast notification confirms the action.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Gathiaka-wiz/color_explorer.git
cd color_explorer
```

### 2. Install Dependencies

Make sure you have [Node.js](https://nodejs.org/) installed.

```bash
npm install
```

### 3. Build Tailwind CSS

To generate the CSS with Tailwind, run:

```bash
npm run dev
```

This will watch for changes and update `output.css` automatically.

### 4. Open the App

Open `index.html` in your browser to use Color Explorer.

---

## Usage

- **Generate Palette:** Click the "Generate" button or press the spacebar.
- **Copy Color:** Click the copy icon under any color swatch.

## Customization

You can modify the palette generation logic in `app.js` to create different color schemes or adjust the UI in `index.html` and `input.css`.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)

---

**Created by [Gathiaka](https://gathiaka.vercel.app)**
```
