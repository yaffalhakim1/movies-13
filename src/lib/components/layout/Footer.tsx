const Footer = () => {
  return (
    <footer className="wrapper">
      <div className="flex">
        <p className="text-xs">
          {new Date().getFullYear()} -{' '}
          <a
            href="https://yafialhakim.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            yafialhakim - built with this
            <span>
              <a
                href="https://nextarter-tailwind.sznm.dev/"
                className="text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}
                template
              </a>
            </span>
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
