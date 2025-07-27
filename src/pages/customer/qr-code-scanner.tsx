"use client";

import QRScanner from '#/components/qr-code-scaner'
import {useCallback} from 'react'
import {toast} from 'sonner';

const ScanQrPage = () => {
  const onScanSuccess = useCallback((decodedText: string) => {
    console.log(decodedText, "decodedText")
    // TODO: remove location.href add customer logic to navigate restaurant owner page
    window.location.href = decodedText
  }, [])

  const onScanError = useCallback((error: string) => {
    console.log(error)
    toast.success("Something went wrong while reading the qr code!")
  }, [])

  return (
    <div className='w-full p-4'>
      <QRScanner qrCodeSuccessCallback={onScanSuccess} qrCodeErrorCallback={onScanError} />
    </div >
  )
}

export default ScanQrPage
