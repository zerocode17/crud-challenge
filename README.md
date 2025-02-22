## Overview

This is a solution for a NextJS challenge to make a website where authenticated users can create posts and comments with texts or images. The app has no routes, it handles everything in the home page, revalidating only necessary data, e.g. when adding post it revalidates the path but for comments the approach is to use optimistic UI and update the UI locally, that way when adding a comment it doesn't fetch all posts again.

## Architecture

The application is built using the NextJS framework, which provides server-side rendering and static site generation. The project structure is organized into several main directories:

- `app/`: Contains the main application components, including authentication, layout, and pages.
- `components/`: Contains reusable UI components such as headers, icons, and posts.
- `lib/`: Contains utility functions and libraries used throughout the application.
- `public/`: Contains static assets like images and icons.

## Approach and Methodology

- **Component-Based Architecture**: The application is divided into reusable components to promote code reusability and maintainability.
- **Server-Side Rendering (SSR)**: Utilized to improve performance and SEO by rendering pages on the server.
- **Authentication**: Implemented to ensure that only authenticated users can create posts and comments.
- **Responsive Design**: Ensures the application is accessible and usable on various devices and screen sizes.
- **Supabase**: Used as the backend service for authentication and database management.
- **TailwindCSS**: Used for styling the application.
- **Shadcn**: Utilized for building accessible and customizable UI components, used in conjuctin with Tailwindcss to quickly make a clean looking page.
- **Server Actions**: Used to interact with the database, ensuring efficient data handling. I opted for server actions over route handlers because they provided the most straightforward and efficient approach for this challenge’s requirements.
- **Optimistic UI**: Implemented to enhance responsiveness by updating the UI instantly before server confirmation. This was applied specifically to comment creation, not posts. In a real-world scenario, users typically post comments more frequently than full posts, making a smoother experience more valuable for comments. Additionally, since posts are generally considered more "important," ensuring their accuracy by waiting for database confirmation is a better approach in my opinion.

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
   SUPABASE_URL=yourupabaseurl
   SUPABASE_ANON_KEY=yoursupabaseanonkey
   SITE_URL=http://localhost:3000
   ```

4. **Run the development server**:

   ```sh
   pnpm dev
   ```

5. **Open the application**:
   Open your browser and navigate to `http://localhost:3000`.
