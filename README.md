# Renovation Cost Calculator

A lightweight, step-by-step home renovation cost estimator with a visual no-code admin panel for managing pricing rates, multipliers, room-specific upgrades, and captured leads.

**Live Demo:** [https://oakridge-reno-qoute-estimator.netlify.app/](https://oakridge-reno-qoute-estimator.netlify.app/)

## Overview

Built as a fast, zero-dependency frontend module ready to run standalone or inside a custom WordPress shortcode (`[renovation_calculator]`). Homeowners step through space selection, dimensions, scope, finish quality, and add-ons while seeing a real-time estimated budget range.

## Key Features

- **6-Step Guided Flow:** Room Type, Dimensions (preset cards + square-foot slider), Renovation Scope, Materials Tier, Room-Specific Extras, and Estimate Summary.
- **Dynamic Price Range Engine:** Updates live as selections change using configurable base mobilization fees, per-sq-ft rates, scope/material multipliers, and range buffer percentages.
- **No-Code Admin Panel:** Edit room rates, multipliers, add/remove upgrade options, switch currency (`$`, `£`, `€`), and review submitted leads without editing source files.
- **Lead Capture & Dual Email Templates:** Previews both the itemized customer estimate email and the contractor lead notification alert.
- **Responsive Layout:** Built for desktop, tablet, and mobile screens.

## Project Structure

- `index.html` - Calculator shell, admin layout, and modal markup
- `styles.css` - Responsive UI styles and WordPress admin panel layout
- `app.js` - State management, pricing calculation logic, and configurable settings store

## Running Locally

Open `index.html` directly in any modern browser, or serve the directory with any static web server.
