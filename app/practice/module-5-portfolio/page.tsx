'use client'

import React, { useEffect, useState } from 'react'
import summaristImg from '../../assets/Summarist.png';
import RecipesWebsite from '../../assets/RecipesWebsite.png'
import ShelbyInternship from '../../assets/ShelbyInternshipNFT.png'
import ShelbyImg from '../../assets/ShelbyImg.jpeg'

interface Project {
  title: string
  description: string
  tags: string[]
  href: string
  imageSrc?: string
  imageAlt?: string
}

const projects: Project[] = [
  {
    title: 'Summarist Audiobook Website',
    description: 'A polished audiobook site with responsive design, and backend integration for login and subscription.',
    tags: ['Next.js', 'Stripe', 'UI'],
    href: 'https://advanced-virtual-intern.vercel.app/',
    imageSrc: summaristImg.src,
    imageAlt: 'Screenshot of audiobook website'
  },
  {
    title: 'Recipes from Around the World',
    description: 'A website for searching recipes by category from backend APIs with accessible navigation and clean typography.',
    tags: ['React', 'API Integration'],
    href: 'https://recipes-react-tau.vercel.app/',
    imageSrc: RecipesWebsite.src,
    imageAlt: 'Screenshot recipes site'
  },
  {
    title: 'Ultraverse NFT World Internship',
    description: 'Content-driven site with organized NFT cards, clean layouts, and animations.',
    tags: ['Next.js', 'Accessibility'],
    href: 'https://shelby-internship.vercel.app/',
    imageSrc: ShelbyInternship.src,
    imageAlt: 'Screenshot of internship'
  }
]

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl">
    {project.imageSrc && (
      <img src={project.imageSrc} alt={project.imageAlt} className="h-48 w-full object-cover" loading="lazy" />
    )}
    <div className="p-6">
      <h3 className="text-xl font-semibold text-slate-900">{project.title}</h3>
      <p className="mt-4 text-sm leading-6 text-slate-600">{project.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map(tag => (
          <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
            {tag}
          </span>
        ))}
      </div>
      <a
        href={project.href}
        className="mt-6 inline-flex items-center rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:shadow-lg transition hover:bg-teal-700"
        aria-label={`View ${project.title}`}
      >
        View project
      </a>
    </div>
  </article>
)

const AboutSection: React.FC = () => {
  const skills: string[] = ['React', 'TypeScript', 'Tailwind CSS', 'Accessibility', 'UI/UX']

  return (
    <section id="about" className="mt-16 bg-white rounded-lg shadow-sm">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 items-center md:grid-cols-3">
          <figure className="flex justify-center md:justify-start">
            <img
              src={ShelbyImg.src}
              alt="Shelby portrait"
              className="h-40 w-40 rounded-full object-cover ring-4 ring-slate-50"
              loading="lazy"
            />
          </figure>

          <div className="md:col-span-2">
            <div className="max-w-xl mx-auto md:mx-0">
              <h2 className="text-2xl font-bold text-slate-900 text-center md:text-left">About Me</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 text-center md:text-left">
                I’m Shelby, a frontend developer who builds accessible, responsive interfaces with a focus on
                performance and clean design. I enjoy creating reusable component systems and delightful user
                experiences.
              </p>

              <div className="mt-6 text-center md:text-left">
                <h3 className="text-sm font-medium text-slate-700">Skills</h3>
                <ul className="mt-3 flex flex-wrap justify-center md:justify-start gap-2">
                  {skills.map(skill => (
                    <li key={skill}>
                      <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

type ContactFormValues = {
  name: string
  email: string
  message: string
}

const initialContactFormValues: ContactFormValues = {
  name: '',
  email: '',
  message: '',
}

const ContactForm: React.FC = () => {
  const [formValues, setFormValues] = useState<ContactFormValues>(initialContactFormValues)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const isNameValid = formValues.name.trim().length >= 2
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email.trim())
  const isMessageValid = formValues.message.trim().length >= 10

  const isFormValid = isNameValid && isEmailValid && isMessageValid

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target
    setFormValues(previous => ({ ...previous, [name]: value }))

    if (isSubmitted) {
      setIsSubmitted(false)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    if (!isFormValid) return
    console.log('Contact form submitted:', formValues)
    setIsSubmitted(true)
    setFormValues(initialContactFormValues)
  }

  return (
    <section id="contact" className="mt-16">
      <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white px-4 py-10 shadow-sm sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-600">Contact</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900">Let’s build something together</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">Send me a message and I’ll get back to you as soon as possible.</p>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-2xl space-y-6" noValidate>
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formValues.name}
              onChange={handleChange}
              aria-invalid={formValues.name.length > 0 && !isNameValid}
              aria-label="Your name"
              placeholder="Your name"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
            />
            {formValues.name.length > 0 && !isNameValid && (
              <p className="mt-2 text-sm text-red-600">Please enter at least 2 characters.</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formValues.email}
              onChange={handleChange}
              aria-invalid={formValues.email.length > 0 && !isEmailValid}
              aria-label="Your email address"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
            />
            {formValues.email.length > 0 && !isEmailValid && (
              <p className="mt-2 text-sm text-red-600">Please enter a valid email address.</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formValues.message}
              onChange={handleChange}
              aria-invalid={formValues.message.length > 0 && !isMessageValid}
              aria-label="Your message"
              placeholder="Tell me about your project..."
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
            />
            {formValues.message.length > 0 && !isMessageValid && (
              <p className="mt-2 text-sm text-red-600">Message must be at least 10 characters long.</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            aria-disabled={!isFormValid}
            className="inline-flex w-full items-center justify-center rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:hover:bg-slate-300"
          >
            Send Message
          </button>

          {isSubmitted && <p className="text-center text-sm font-medium text-green-600">Thanks for your message! I’ll be in touch soon.</p>}
        </form>
      </div>
    </section>
  )
}

const Module5Portfolio: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [heroVisible, setHeroVisible] = useState(false)

  useEffect(() => {
    // trigger fade-in on mount
    const t = setTimeout(() => setHeroVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={darkMode ? 'min-h-screen bg-slate-950 text-slate-100' : 'min-h-screen bg-slate-50 text-slate-900'}>
      <header className={darkMode ? 'border-b border-slate-800 bg-slate-900/90 backdrop-blur-sm' : 'border-b border-slate-200 bg-white/90 backdrop-blur-sm'}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <a href="#" className={darkMode ? 'text-lg font-bold tracking-tight text-white' : 'text-lg font-bold tracking-tight text-slate-900'}>
            Shelby Wilson
          </a>

          <div className="flex items-center gap-4">
            <nav className="hidden items-center gap-8 md:flex">
              <a href="#projects" className={darkMode ? 'text-sm font-medium text-slate-300 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2' : 'text-sm font-medium text-slate-600 transition hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'}>
                Projects
              </a>
              <a href="#about" className={darkMode ? 'text-sm font-medium text-slate-300 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2' : 'text-sm font-medium text-slate-600 transition hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'}>
                About
              </a>
              <a href="#contact" className={darkMode ? 'text-sm font-medium text-slate-300 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2' : 'text-sm font-medium text-slate-600 transition hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'}>
                Contact
              </a>
            </nav>

            <button
              type="button"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={() => setDarkMode(!darkMode)}
              className={darkMode
                ? 'inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-100 transition hover:border-slate-600 hover:bg-slate-700'
                : 'inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:border-slate-400 hover:bg-slate-50'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className={`grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center transform transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-600">Frontend Developer</p>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Hi, I’m Shelby!</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600">
              I build responsive, accessible frontends with React and Tailwind CSS. I focus on clear layouts, fast interactions, and reusable components.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg transition hover:bg-teal-700">
                Contact Me
              </a>
              <a href="#projects" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-md hover:shadow-lg transition hover:border-slate-400 hover:bg-slate-50">
                View Projects
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4">
              <div className="rounded-3xl bg-slate-50 p-6">
                <p className="text-sm font-medium text-slate-500">Experience</p>
                <p className="mt-3 text-3xl font-bold text-slate-900">1+ years</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-6">
                <p className="text-sm font-medium text-slate-500">Projects</p>
                <p className="mt-3 text-3xl font-bold text-slate-900">12+</p>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="mt-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Featured Work</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">Selected projects</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-600">Clean layouts, strong typography, and focused interactions for practical web experiences.</p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map(project => <ProjectCard key={project.title} project={project} />)}
          </div>
        </section>

        <AboutSection />

        <ContactForm />
      </main>

      <footer id="footer" className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-base font-semibold text-slate-900">Shelby Portfolio</p>
              <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">A modern portfolio built with Tailwind CSS, React, and accessible design principles.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="#" aria-label="GitHub" className="text-slate-600 transition hover:text-slate-900">GitHub</a>
              <a href="#" aria-label="LinkedIn" className="text-slate-600 transition hover:text-slate-900">LinkedIn</a>
              <a href="#" aria-label="Twitter" className="text-slate-600 transition hover:text-slate-900">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Module5Portfolio


      {/* <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-yellow-50 border-2 border-yellow-500 rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold mb-4">🚀 Ready to Build Your Portfolio?</h1>
          <p className="mb-4 text-gray-700">
            This is where your portfolio will live. Follow the steps below to build it with Copilot
            as your coding partner!
          </p>
          <div className="bg-white rounded p-4 border border-yellow-300">
            <h2 className="font-semibold mb-2">Quick Start Guide:</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Read STEP 1 instructions above</li>
              <li>Open Copilot Chat (Ctrl/Cmd + Shift + I)</li>
              <li>Switch to Agent Mode with Claude/Auto model</li>
              <li>Ask Copilot to create the base layout</li>
              <li>Replace this placeholder with your new layout</li>
              <li>Continue with STEP 2, 3, 4, etc.</li>
            </ol>
          </div>
        </div> */}

        {/* Placeholder sections to guide structure */}
        {/* <section className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-500">📍 Header Section</h2>
          <p className="text-gray-400">Your navigation will go here</p>
        </section>

        <section className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-500">📍 Hero Section</h2>
          <p className="text-gray-400">Your introduction and tagline will go here</p>
        </section>

        <section className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-500">📍 Projects Grid</h2>
          <p className="text-gray-400">Your project cards will go here</p>
        </section>

        <section className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-500">📍 Footer</h2>
          <p className="text-gray-400">Your social links will go here</p>
        </section>
      </div> */}

      {/* ==========================================
       * 🎯 STEP 2: FILL IN THE HERO SECTION
       * ==========================================
       *
       * ✅ TODO: ADD CONTENT TO HERO SECTION
       *
       * Once you have the base layout, enhance the hero:
       *
       * Instructions:
       * 1. Highlight the hero section in your new layout
       * 2. Use Inline Chat (Ctrl/Cmd + I)
       * 3. Ask: "Hero with my name, tagline, and a 'Contact Me' button"
       * 4. Customize with your actual name and tagline
       * 5. Refine: "Make the button a mailto: link to [your-email]"
       *
       * ========================================== */}

      {/* ==========================================
       * 🎯 STEP 3: BUILD THE PROJECTS GRID
       * ==========================================
       *
       * ✅ TODO: ADD PROJECT CARDS
       *
       * Instructions:
       * 1. Highlight the projects section
       * 2. Use Agent Mode
       * 3. Ask: "Projects section with cards: title, description,
       *         image placeholder, and link"
       * 4. Add 3-4 sample projects
       * 5. Refine with Inline Chat: "Add a hover animation for each card"
       *
       * ========================================== */}

      {/* ==========================================
       * 🎯 STEP 4: CREATE THE FOOTER
       * ==========================================
       *
       * ✅ TODO: ADD FOOTER WITH SOCIAL LINKS
       *
       * Instructions:
       * 1. Highlight the footer section
       * 2. Use Inline Chat
       * 3. Ask: "Footer with copyright and links to GitHub,
       *         LinkedIn, Twitter"
       * 4. Refine: "Add aria-labels for social links"
       * 5. Update with your actual social media URLs
       *
       * ========================================== */}

      {/* ==========================================
       * 🎯 STEP 5: ADD AN ABOUT SECTION
       * ==========================================
       *
       * ✅ TODO: INSERT ABOUT SECTION
       *
       * Instructions:
       * 1. Place cursor between Projects and Footer
       * 2. Use Agent Mode
       * 3. Ask: "About section with my photo placeholder,
       *         short bio, and list of skills"
       * 4. Refine: "Use Tailwind spacing consistent with Hero section"
       * 5. Refine: "Keep the About text in a centered column"
       *
       * ========================================== */}

      {/* ==========================================
       * 🎯 STEP 6: ADD CONTACT FORM
       * ==========================================
       *
       * ✅ TODO: CREATE CONTACT FORM
       *
       * Instructions:
       * 1. Add a new section before the footer
       * 2. Use Agent Mode
       * 3. Ask: "Add a contact form with name, email,
       *         message and basic validation"
       * 4. Use Edit Mode: "Disable submit until all fields are valid"
       * 5. Add: "Show success message after submission"
       *
       * ========================================== */}

      {/* ==========================================
       * 🎯 STEP 7: ADD DARK MODE (OPTIONAL)
       * ==========================================
       *
       * ✅ TODO: IMPLEMENT DARK MODE TOGGLE
       *
       * Instructions:
       * 1. Highlight the header
       * 2. Use Agent Mode
       * 3. Ask: "Add dark mode toggle in the header"
       * 4. Test the toggle works across all sections
       * 5. Refine colors if needed
       *
       * ========================================== */}

      {/* ==========================================
       * 🎯 STEP 8: POLISH & ANIMATIONS
       * ==========================================
       *
       * ✅ TODO: ADD FINISHING TOUCHES
       *
       * Use Edit Mode for these refinements:
       * 1. "Fade in hero section on page load"
       * 2. "Add smooth scroll behavior for navigation links"
       * 3. "Improve spacing and typography hierarchy"
       * 4. "Ensure all sections are responsive on mobile"
       * 5. "Add loading states where appropriate"
       *
       * ========================================== */}

      {/* ==========================================
       * 🎯 FINAL REVIEW CHECKLIST
       * ==========================================
       *
       * Before you're done, verify:
       *
       * ✓ Responsive Design
       *   - Test on mobile, tablet, desktop viewports
       *   - Check text is readable at all sizes
       *
       * ✓ Accessibility
       *   - All interactive elements have aria-labels
       *   - Images have alt text
       *   - Keyboard navigation works
       *   - Color contrast is sufficient
       *
       * ✓ Consistency
       *   - Follows your .github/copilot-instructions.md rules
       *   - Uses Tailwind classes consistently
       *   - Arrow functions throughout
       *   - TypeScript types defined
       *
       * ✓ Functionality
       *   - All links work
       *   - Contact form validates input
       *   - Animations are smooth
       *   - No console errors
       *
       * ========================================== */}
  
  


/* ==========================================
 * 💡 TIPS FOR SUCCESS
 * ==========================================
 *
 * 1. START BIG, THEN REFINE
 *    - Use Agent Mode to scaffold entire sections quickly
 *    - Then use Edit Mode (Inline Chat) for small improvements
 *    - Don't try to get everything perfect in one prompt
 *
 * 2. ITERATE IN STEPS
 *    - Build one section at a time
 *    - Test each section before moving to the next
 *    - It's easier to debug small changes
 *
 * 3. USE ASK MODE FOR GUIDANCE
 *    - "What's the best way to structure this component?"
 *    - "How can I improve the performance here?"
 *    - "What accessibility features am I missing?"
 *
 * 4. CUSTOMIZE IT
 *    - Replace placeholder text with your real information
 *    - Add your own projects and achievements
 *    - Make it reflect your personality and style
 *
 * 5. LEARN BY REVIEWING
 *    - Don't just accept code blindly
 *    - Read what Copilot generates
 *    - Ask it to explain anything unclear
 *    - Understand the patterns so you can use them later
 *
 * 6. COMMON ISSUES & FIXES
 *    - Spacing looks off? → "Improve spacing using Tailwind"
 *    - Not responsive? → "Make this section responsive on mobile"
 *    - Missing types? → "Add TypeScript types for props"
 *    - Need animation? → "Add smooth transition animations"
 *
 * ========================================== */

/* ==========================================
 * 🎉 CONGRATULATIONS!
 * ==========================================
 *
 * When you complete this portfolio, you will have:
 *
 * ✓ Built a real, production-ready website with Copilot
 * ✓ Mastered Agent Mode for large scaffolding tasks
 * ✓ Used Edit Mode for precise refinements
 * ✓ Applied Ask Mode for strategic guidance
 * ✓ Leveraged rules for consistent code style
 * ✓ Created something you can actually deploy and share!
 *
 * NEXT STEPS:
 * - Deploy your portfolio to Vercel or Netlify
 * - Share it on LinkedIn and Twitter
 * - Keep practicing with Copilot on real projects
 * - Teach others what you've learned
 *
 * Remember: Copilot is a tool to amplify your skills,
 * not replace them. The more you understand code, the
 * better you'll be at directing Copilot to build
 * exactly what you envision.
 *
 * Happy coding! 🚀
 *
 * ========================================== */
