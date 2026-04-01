# Photo Gallery Project Summary

This is an Angular 19 application for a photo gallery. It allows users to browse images by category, view individual images, add new images, and delete existing ones.

## Tech Stack
- **Framework:** Angular 19
- **Styling:** Bootstrap 5.3.6
- **Data Management:** `angular-in-memory-web-api` for simulating a backend.
- **Languages:** TypeScript, HTML, CSS.

## Key Components
- `GalleryDashboardComponent`: Main landing page showing categories and the image grid.
- `ImageGridComponent`: Displays a grid of images, filtered by category.
- `ImageViewComponent`: Detailed view of a single image.
- `NavbarComponent`: Navigation bar.
- `FooterComponent`: Footer.
- `AboutComponent`: About page.
- `CategoriesComponent`: List of image categories.
- `AddImageComponent`: Form to add a new image.
- `NotfoundComponent`: 404 page.

## Services
- `ImageService`: Handles all CRUD operations for images using `HttpClient`.
- `InMemoryDataService`: Provides mock data for the in-memory web API.

## Data Models
- `Image`: Interface defining the structure of an image object (`id`, `title`, `url`, `category`, `description`).
- `NavigationOption`: Interface for navigation links.

## Routing
- `/`: `GalleryDashboardComponent`
- `/images/:id`: `ImageViewComponent`
- `/About`: `AboutComponent`
- `**`: `NotfoundComponent`

## Development Scripts
- `npm start`: Runs `ng serve`
- `npm run build`: Runs `ng build`
- `npm test`: Runs `ng test`
