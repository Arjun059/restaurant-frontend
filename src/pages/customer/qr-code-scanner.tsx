"use client";

import QRScanner from '#/components/qr-code-scaner'
import {useCallback} from 'react'
const ScanQrPage = () => {
  const onScanSuccess = useCallback((decodedText: string) => {
    console.log(decodedText, "decodedText")
    // TODO: remove location.href add custome logic to navigate retaurant owner page
    // window.location.href = decodedText

  }, [])

  const onScanError = useCallback((error: string) => {
    console.log(error)
  }, [])

  return (
    <div className='w-full p-4'>
      <QRScanner qrCodeSuccessCallback={onScanSuccess} qrCodeErrorCallback={onScanError} />
    </div>
  )
}

export default ScanQrPage
