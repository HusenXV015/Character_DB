export default function Footer() {
    return (
      <>
        <footer className="bg-slate-700text-secondary-foreground py-6">
          <div className="container mx-auto flex flex-col items-center space-y-6 md:flex-row md:justify-between md:space-y-0">
            <div className="flex space-x-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity duration-200"
              >
                <img
                  aria-hidden="true"
                  alt="facebook-logo"
                  src="https://openui.fly.dev/openui/24x24.svg?text=📘"
                  className="w-8 h-8"
                />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity duration-200"
              >
                <img
                  aria-hidden="true"
                  alt="github-logo"
                  src="https://openui.fly.dev/openui/24x24.svg?text=🐱"
                  className="w-8 h-8"
                />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity duration-200"
              >
                <img
                  aria-hidden="true"
                  alt="x-logo"
                  src="https://openui.fly.dev/openui/24x24.svg?text=✖️"
                  className="w-8 h-8"
                />
              </a>
            </div>
            <p className="text-muted-foreground text-sm text-center md:text-left mr-7">
              &copy; 2024 Character Game . All rights reserved.
            </p>
          </div>
        </footer>
      </>
    );
  }
  