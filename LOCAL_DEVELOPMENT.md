# Local Development Guide

This guide helps you run and develop the GitHub Pages course locally.

## 🚀 Quick Start

### Prerequisites
- Ruby (2.7 or higher)
- Bundler gem
- Git

### Setup
```bash
# 1. Navigate to the project directory
cd Cre-main

# 2. Install dependencies
bundle install

# 3. Start the Jekyll server
bundle exec jekyll serve

# 4. Open your browser
open http://localhost:4000
```

## 📁 Project Structure

```
Cre-main/
├── _config.yml                 # Jekyll configuration
├── _posts/                     # Blog posts (Jekyll format)
│   └── 2025-01-07-welcome-to-my-blog.md
├── .github/
│   ├── workflows/              # GitHub Actions (course automation)
│   │   ├── 0-welcome.yml
│   │   ├── 1-enable-github-pages.yml
│   │   ├── 2-configure-your-site.yml
│   │   ├── 3-customize-your-homepage.yml
│   │   ├── 4-create-a-blog-post.yml
│   │   ├── 5-merge-your-pull-request.yml
│   │   └── static.yml
│   └── steps/                  # Course content
│       ├── 0-welcome.md
│       ├── 1-enable-github-pages.md
│       ├── 2-configure-your-site.md
│       ├── 3-customize-your-homepage.md
│       ├── 4-create-a-blog-post.md
│       ├── 5-merge-your-pull-request.md
│       └── X-finish.md
├── index.md                    # Homepage
├── course-preview.md           # Course navigation (local only)
├── README.md                   # Course instructions
├── Gemfile                     # Ruby dependencies
└── CNAME                       # Domain configuration
```

## 🛠️ Development Workflow

### 1. View Course Content
- Browse the course steps in `.github/steps/`
- Read the course instructions in `README.md`
- Use the course preview at http://localhost:4000/course-preview

### 2. Test Jekyll Features
```bash
# Create a new blog post
touch _posts/$(date +%Y-%m-%d)-my-new-post.md

# Edit the post with proper frontmatter:
# ---
# title: "My New Post"
# date: 2025-01-07
# layout: post
# ---

# Create new pages
touch about.md
touch contact.md
```

### 3. Live Reload
Jekyll watches for changes and automatically rebuilds the site. Just refresh your browser to see updates.

### 4. Simulate Course Steps
Follow the course steps manually:
1. Read each step file in `.github/steps/`
2. Create the required files
3. Test the changes locally
4. Move to the next step

## 📝 Common Commands

```bash
# Start development server
bundle exec jekyll serve

# Start with live reload (automatic refresh)
bundle exec jekyll serve --livereload

# Build the site (generates _site/ directory)
bundle exec jekyll build

# Serve on a different port
bundle exec jekyll serve --port 4001

# Show detailed output
bundle exec jekyll serve --verbose
```

## 🌐 Production Deployment

### For GitHub Pages:
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select source branch (usually `main`)
4. GitHub will automatically build and deploy

### For Custom Domain:
1. Update `CNAME` file with your domain
2. Configure DNS settings
3. Enable HTTPS in repository settings

## 🔧 Troubleshooting

### Common Issues:

**Port already in use:**
```bash
# Kill process using port 4000
lsof -ti:4000 | xargs kill -9

# Or use a different port
bundle exec jekyll serve --port 4001
```

**Bundle errors:**
```bash
# Clean and reinstall
bundle clean --force
bundle install
```

**Jekyll build errors:**
```bash
# Check detailed logs
bundle exec jekyll serve --verbose
```

## 🎯 Understanding the Course Logic

### GitHub Actions Workflows
The `.github/workflows/` files contain the course automation:

- **0-welcome.yml**: Creates initial structure when course starts
- **1-enable-github-pages.yml**: Triggered when GitHub Pages is enabled
- **2-configure-your-site.yml**: Triggered when `_config.yml` is updated
- **3-customize-your-homepage.yml**: Triggered when `index.md` is updated
- **4-create-a-blog-post.yml**: Triggered when files are added to `_posts/`
- **5-merge-your-pull-request.yml**: Triggered when PR is merged
- **static.yml**: Deploys the site to GitHub Pages

### Step Tracking
- Current step is stored in `.github/steps/-step.txt`
- Each workflow checks the current step before running
- Steps are updated automatically as users complete tasks

## 📚 Additional Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Liquid Template Language](https://shopify.github.io/liquid/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## 🤝 Contributing

To contribute to the course:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details. 