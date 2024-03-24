import { useEffect, useState, React } from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilPowerStandby,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import universal from './../../assets/images/avatars/universal.jpg'
import { useCookies } from 'react-cookie'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const AppHeaderDropdown = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['auth'])
  const [cookiesState, setCookiesState] = useState(null)

  useEffect(() => {
    const getCookies = () => {
      if (cookies.id != undefined) {
        setCookiesState({ id: cookies.id, name: cookies.name, email: cookies.email })
      }
    }
    getCookies()
  }, [])

  const logout = () => {
    withReactContent(Swal)
      .fire({
        title: 'Are you sure?',
        text: 'You will logout from the system',
        confirmButtonColor: 'red',
        confirmButtonText: 'Log Out',
        showCancelButton: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          removeCookie('email')
          removeCookie('id')
          removeCookie('name')
          setCookiesState(null)
        }
      })
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={universal} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
        {cookiesState != null ? (
          <>
            <CDropdownItem>{cookiesState.name}</CDropdownItem>
            <CDropdownItem
              onClick={() => {
                logout()
              }}
              style={{ cursor: 'pointer' }}
            >
              <CIcon icon={cilPowerStandby} className="me-2" />
              Logout
            </CDropdownItem>
          </>
        ) : (
          <CDropdownItem href="/#/login">Login Now!</CDropdownItem>
        )}
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
