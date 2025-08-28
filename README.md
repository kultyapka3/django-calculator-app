# Django Calculator App

A modern, interactive web calculator built with **Django** (backend) and **vanilla JavaScript** (frontend). 
This app supports basic arithmetic, advanced operations (like square and square root), keyboard input, history 
tracking, and a toggleable dark/light theme — all without page reloads.

---

## Features

- **Responsive Design**: Works on desktop and mobile.
- **Dark/Light Theme Toggle**: User preference saved in `localStorage`.
- **Calculation History**: Automatically saves and displays recent calculations.
- **Keyboard Support**: Use your keyboard to input numbers and operators.
- **Error Handling**: Graceful error feedback for invalid expressions.
- **Mathematical Operations**:
  - Basic: `+`, `−`, `×`, `÷`
  - Advanced: `()`, `√`, `x²`, `%`
- **No Backend Computation**: Calculations are processed client-side using [math.js](https://mathjs.org/) for safety and speed.
- **Clean UI**: Built with semantic HTML, CSS Grid, and subtle animations.

---

## Technologies Used

- **Backend**: Django (Python)
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Libraries**:
  - [math.js](https://mathjs.org/) – Safe mathematical expression evaluation
  - jQuery – DOM manipulation
- **Styling**: Pure CSS (no framework except minimal Bootstrap for reset)

---

## Project Structure

```
calculatorapp/
    ├───calculatorapp/    # Project settings
    │   ├───__init__.py
    │   ├───asgi.py
    │   ├───settings.py
    │   ├───urls.py
    │   └───wsgi.py
    ├───calculator/       # Main app
    │   ├───migrations
    │   │   └───__init__.py
    │   ├───__init__.py
    │   ├───admin.py
    │   ├───apps.py
    │   ├───models.py
    │   ├───tests.py
    │   ├───urls.py
    │   └───views.py
    ├───static/          # Static files
    │   ├───js/          # Client-side logic
    │   │   └───calculations.js
    │   └───styles/
    │       └───main.css
    ├───templates/
    │   └───calculator.html
    ├───db.sqlite3       # SQLite database
    └───manage.py        # Django management script
```

---

## How It Works

- The Django backend serves a single page: `calculator.html`.
- All logic (input, calculation, history, theme) is handled in the browser.
- History and theme preferences are stored in `localStorage`.
- The `math.evaluate()` function safely computes expressions with support for parentheses, functions, and operators.

---

## How to Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git 
   cd your-repo-name
   
2. Create and activate a virtual environment:

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   
3. Install dependencies:

    ```bash
    pip install -r requirements.txt
   
4. Apply migrations:

    ```bash
    python manage.py makemigrations
    python manage.py migrate
   
5. Run the development server:

    ```bash
    python manage.py runserver
   
6. Open your browser and go to: http://127.0.0.1:8000/
