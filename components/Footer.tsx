const Footer = () => (
  <footer className="w-full border-t mt-12 py-6 bg-background">
    <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
      &copy; {new Date().getFullYear()}
      <a
        href="https://github.com/naufalalief"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-primary transition-colors ml-1"
      >
        Naufal Alief
      </a>
    </div>
  </footer>
);

export default Footer;
