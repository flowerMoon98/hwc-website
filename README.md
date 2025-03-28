# HWC Website

A modern hybrid website built with Payload CMS and Next.js for HWC (Hybrid Wealth Consultants).

## Architecture

This project uses a hybrid architecture combining:
- **Payload CMS**: Headless CMS for content management
- **Next.js 15**: React framework with App Router
- **MongoDB**: Database for content storage
- **TypeScript**: For type-safe development

## Key Features

- Modular block-based content system
- Dynamic service pages
- Responsive design with TailwindCSS
- Type-safe CMS integration

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- MongoDB (local or Atlas)

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
pnpm dev
```

### Build for Production

```bash
pnpm build
pnpm start
```

## Project Structure

- `/src/app/(frontend)`: Client-facing pages and components
- `/src/app/(payload)`: Payload CMS routes and admin
- `/src/payload`: Payload CMS configuration
  - `/collections`: Content models
  - `/blocks`: Reusable content blocks
  - `/globals`: Global content (header, footer)

## Content Blocks

The site uses a modular block system including:
- Hero sections
- Intro sections
- Content blocks
- Contact forms
- Testimonials
- Our Niche sections

## Attributes

- **Database**: mongodb
- **Storage Adapter**: localDisk
