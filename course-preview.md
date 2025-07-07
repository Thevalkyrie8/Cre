---
layout: default
title: Course Preview
---

# GitHub Pages Course - Step by Step Preview

This page helps you navigate through the course content locally. In the actual course on GitHub, these steps are automated through GitHub Actions.

## 📚 Course Steps

### [Step 0: Welcome](.github/steps/0-welcome.md)
- Introduction to the course
- Sets up initial repository structure

### [Step 1: Enable GitHub Pages](.github/steps/1-enable-github-pages.md)
- Learn how to enable GitHub Pages
- Understand the basics of GitHub Pages deployment

### [Step 2: Configure Your Site](.github/steps/2-configure-your-site.md)
- Set up Jekyll theme (minima)
- Configure `_config.yml`
- Create a pull request workflow

### [Step 3: Customize Your Homepage](.github/steps/3-customize-your-homepage.md)
- Edit the `index.md` file
- Add personalized content
- Learn Markdown basics

### [Step 4: Create a Blog Post](.github/steps/4-create-a-blog-post.md)
- Understand Jekyll's `_posts` directory
- Learn about YAML frontmatter
- Create properly formatted blog posts

### [Step 5: Merge Your Pull Request](.github/steps/5-merge-your-pull-request.md)
- Complete the course
- Merge changes to main branch

### [Finish](.github/steps/X-finish.md)
- Congratulations and next steps
- Additional resources

## 🛠️ Local Development Workflow

1. **View Course Content**: Browse the step files in `.github/steps/`
2. **Test Jekyll Features**: Create sample files and test locally
3. **Preview Changes**: Use `bundle exec jekyll serve` to see changes
4. **Simulate Course Flow**: Follow the steps manually

## 📝 Example Files to Create

Try creating these files to simulate the course:

```
# Create a Jekyll config (already exists)
_config.yml

# Create a homepage (already exists)
index.md

# Create a blog post
_posts/2025-01-07-my-first-post.md

# Create additional pages
about.md
contact.md
```

## 🎯 Understanding the GitHub Actions

The `.github/workflows/` directory contains automated workflows that:
- Track user progress through steps
- Validate user actions
- Update course content dynamically
- Provide feedback and guidance

These workflows are designed to run on GitHub's platform and won't function the same way locally. 