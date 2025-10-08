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

- React Native CLI (No Expo)
- React redux for global state management
- local state for data persistence
- React Navigation for navigation
- Picker for dropdown selection
- Responsive layouts using flex and scaling utilities

## Installation

1. Clone the repo:

```bash
git https://github.com/msadhikari/cow-catalog-app.git
cd cow-catalog-app
