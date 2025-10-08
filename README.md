# Cow Catalog App

A simple React Native (CLI) mobile application to manage and browse cows.
## Features

- List all cows with ear tag, sex, pen, status, and last event.
- Search cows by ear tag.
- Filter cows by status or pen (filters persist across screens).
- Add new cows with validation (ear tag must be unique, weight positive).
- Cow detail screen with timeline and basic information.
- Fully responsive design for all device sizes and orientations.

## Tech Stack

- React Native CLI (No Expo) - Core app development framework
- React redux for global state management
- local state for data persistence
- React Navigation for navigation
- @react-native-community/netinfo - Network detection for offline behavior
- React Native Vector Icons - Icons and UI visuals
- Responsive layouts using flex and scaling utilities

## Architecture & Design Approach

- src/
-  ├── components/         # Reusable UI components
-  ├── screens/            # Individual app screens (CowListScreen, CowFormScreen, CowDetailsScreen)
-  ├── store/              # Redux slices and configuration
-  ├── navigation/         # Stack + Tab navigators
-  └── utils/              # Helper functions and constants


## Design Choices

- Redux Toolkit: Simplifies state management with clear action and reducer structure.

- Persisted Store: Redux state is persisted locally, ensuring data isn’t lost after app restarts.

- Reusable Components: Input fields, buttons, and cards use consistent styles.

- ScrollView & FlatList: Efficiently render dynamic data and ensure smooth scrolling

## Trade-offs & Design Decisions

- Local State -	Used local state to keep app lightweight.
- Redux Toolkit vs Context API -	Chose Redux Toolkit for predictable global state, middleware support, and scalability.
- FlatList vs SectionList -	Used FlatList for performance with large datasets.

## Installation

1. Clone the repo:

```bash
git https://github.com/msadhikari/cow-catalog-app.git
cd CowCatalogApp
npm install
npx react-native run-android