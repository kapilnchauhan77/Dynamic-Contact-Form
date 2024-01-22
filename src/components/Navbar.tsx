import { Disclosure } from '@headlessui/react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
        <Disclosure as="nav" className="bg-white z-40 shadow-md border-b">
            <>
              <div className="mx-auto px-2 sm:px-4 lg:px-6 bg-white z-40 shadown-sm">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link to='/'>
                      <img
                        className="h-16"
                        src={"./XPBrand.svg"}
                        alt="XPBrand.ai"
                      />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

            </>
        </Disclosure>
    </>
  )
}

export default Navbar;
