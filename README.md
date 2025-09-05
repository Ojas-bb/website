# 3D Spaceship Assembly Animation

This project features a scroll-triggered 3D animation of a futuristic spaceship assembling itself, built with Three.js and GSAP.

---

## Features

- **Modular 3D Models:** The spaceship is composed of several distinct parts, each provided as a separate `.glb` file for maximum animation flexibility.
- **Procedural Generation:** The 3D models are generated programmatically using a Python script with the `trimesh` library.
- **Scroll-Triggered Animation:** As the user scrolls down the page, the spaceship parts fly in and assemble seamlessly. The animation is powered by GSAP and ScrollTrigger.
- **Cinematic Camera:** The camera angle changes smoothly during the assembly for a cinematic effect.
- **Automated Build Process:** A build script automates the entire setup.

---

## Technology Stack

-   **3D Model Generation:** Python, Trimesh
-   **Frontend & Animation:** HTML, CSS, JavaScript, Three.js, GSAP
-   **Backend:** Node.js, Express.js

---

## Getting Started

To get this project up and running on your local machine, follow these steps.

### Prerequisites

-   Python (3.6+)
-   Node.js (which includes npm)

### Installation & Build

1.  **Clone the repository.**

2.  **Run the build script.** Open your terminal, navigate to the project directory, and run:

    ```bash
    ./build.sh
    ```

    This script will automatically:
    - Install Python packages.
    - Generate the 3D models into the `assets/models` directory.
    - Install Node.js packages.

### Running the Application

1.  **Start the server.** After the build is complete, run:

    ```bash
    npm start
    ```

2.  **View the website.** Open your web browser and navigate to:

    [http://localhost:3000](http://localhost:3000)

Scroll down to see the animation.