import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AUTH_ACTIONS } from '../store/actions'

function useOtp() {
	const { retryOtp, sendOTP } = useSelector((state) => state.auth)
	const digitLimit = 6
	const dispatch = useDispatch()
	const [verify_otp, setVerify_otp] = useState('')
	useEffect(() => {
		if (verify_otp.length === digitLimit) {
			submitOTP(window.event)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [verify_otp])

	useEffect(() => {
		if (retryOtp) {
			setVerify_otp('')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [retryOtp])

	const submitOTP = (e) => {
		e.preventDefault()
		e.stopPropagation()
		e.target.blur()
		if (verify_otp.length === digitLimit && !sendOTP) {
			dispatch(AUTH_ACTIONS.VERIFY_PHONE_OTP(verify_otp))
		}
	}

	return {
		verify_otp,
		setVerify_otp,
		submitOTP,
		sendOTP,
		digitLimit,
	}
}
export default useOtp
