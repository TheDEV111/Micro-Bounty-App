import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">TaskBounty</h3>
            <p className="text-sm text-gray-400">
              Decentralized micro-task marketplace built on Stacks blockchain. Create tasks, complete work, and earn STX.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <div className="flex flex-col gap-2">
              <Link href="/tasks" className="text-sm hover:text-brand-500 transition-colors">
                Browse Tasks
              </Link>
              <Link href="/tasks/create" className="text-sm hover:text-brand-500 transition-colors">
                Create Task
              </Link>
              <Link href="/how-it-works" className="text-sm hover:text-brand-500 transition-colors">
                How It Works
              </Link>
              <Link href="/pricing" className="text-sm hover:text-brand-500 transition-colors">
                Pricing
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <div className="flex flex-col gap-2">
              <Link href="/docs" className="text-sm hover:text-brand-500 transition-colors">
                Documentation
              </Link>
              <Link href="/blog" className="text-sm hover:text-brand-500 transition-colors">
                Blog
              </Link>
              <Link href="/support" className="text-sm hover:text-brand-500 transition-colors">
                Support
              </Link>
              <Link href="/faq" className="text-sm hover:text-brand-500 transition-colors">
                FAQ
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <div className="flex flex-col gap-2">
              <Link href="/privacy" className="text-sm hover:text-brand-500 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm hover:text-brand-500 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-sm hover:text-brand-500 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © 2025 TaskBounty. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-500 transition-colors">
              <Twitter size={20} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-500 transition-colors">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-500 transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="mailto:contact@taskbounty.com" className="hover:text-brand-500 transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
