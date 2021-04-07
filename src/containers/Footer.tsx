import { CFooter } from '@coreui/react';

const Footer = () => {
  return (
    <CFooter fixed={false}>
      <div className="mfs-auto">
        <a href="https://bolscraper.surge.sh" target="_blank" rel="noopener noreferrer">
          bolscraper.surge.sh
        </a>
      </div>
    </CFooter>
  );
};

export default Footer;
