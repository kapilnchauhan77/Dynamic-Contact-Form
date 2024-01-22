import { Footer } from 'flowbite-react';

function Footbar() {
  return (
    <>
      <Footer className="grow fixed bottom-0 p-3">
        <Footer.Copyright href="/" by="Brand XP" year={2024} />
      </Footer>
    </>
  )
}

export default Footbar;
