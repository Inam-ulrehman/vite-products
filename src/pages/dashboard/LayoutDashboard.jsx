import { Outlet } from 'react-router-dom'
import { styled } from 'styled-components'
import DesktopNavbar from './components/desktopNavbar/desktopNavbar'
import MobileNavbar from './components/mobileNavbar/mobileNavbar'

const LayoutDashboard = () => {
  return (
    <Wrapper>
      <div className='navbar'>
        <div className='desktop'>
          <DesktopNavbar />
        </div>
        <div className='mobile'>
          <MobileNavbar />
        </div>
      </div>
      <div className='layout'>
        <Outlet />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  a {
    margin-right: 10px;
  }
  .layout {
    min-height: 100vh;
    width: 100%;
  }

  /* Mobile  */
  @media (max-width: 767px) {
    .navbar {
      // how to make it sticky on mobile
      position: sticky;
      top: 0;
      z-index: 1;
      background-color: #fff;
      border-bottom: 1px solid #ccc;
    }
    .desktop {
      display: none;
    }
  }

  /* Desktop & ipad & laptop */
  @media (min-width: 768px) {
    display: flex;

    .desktop {
      min-height: 100%;
      border-right: 1px solid #ccc;
    }

    .mobile {
      display: none;
    }
  }
`
export default LayoutDashboard
