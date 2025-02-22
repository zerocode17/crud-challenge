## Overview

This is a solution for a NextJS challenge to make a website where authenticated users can create posts and comments with texts or images.

## Architecture

The application is built using the NextJS framework, which provides server-side rendering and static site generation. The project structure is organized into several main directories:

- `app/`: Contains the main application components, including authentication, layout, and pages.
- `components/`: Contains reusable UI components such as headers, icons, and posts.
- `lib/`: Contains utility functions and libraries used throughout the application.
- `public/`: Contains static assets like images and icons.
- `.next/`: Contains the build output and compiled files generated by NextJS.

## Approach and Methodology

The development approach follows best practices for building scalable and maintainable web applications. Key methodologies include:

- **Component-Based Architecture**: The application is divided into reusable components to promote code reusability and maintainability.
- **Server-Side Rendering (SSR)**: Utilized to improve performance and SEO by rendering pages on the server.
- **Authentication**: Implemented to ensure that only authenticated users can create posts and comments.
- **Responsive Design**: Ensures the application is accessible and usable on various devices and screen sizes.

## Running the Application Locally

To run the application locally, follow these steps:

1. **Clone the repository**:

   ```sh
   git clone https://github.com/zerocode17/crud-challenge.git
   cd crud-challenge
   ```

2. **Install dependencies**:

   ```sh
   pnpm install
   ```

3. **Set up environment variables**:
   Create a file in the root directory and add the necessary environment variables. For example:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```

4. **Run the development server**:

   ```sh
   pnpm dev
   ```

5. **Open the application**:
   Open your browser and navigate to `http://localhost:3000`.
