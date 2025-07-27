"use client";

import QRScanner from '#/components/qr-code-scaner'
import {useCallback} from 'react'
import {toast} from 'sonner';
import {useNavigate} from 'react-router-dom';

const ScanQrPage = () => {
  const navigate = useNavigate();

  const onScanSuccess = useCallback((decodedText: string) => {
    console.log(decodedText, "decodedText")
    // Use React Router navigation instead of window.location.href
    try {
      // Extract the restaurant URL from the decoded text
      // Assuming the QR code contains a URL like: http://localhost:3000/c/restaurant-id/home
      const url = new URL(decodedText);
      const pathParts = url.pathname.split('/');
      const restaurantUrl = pathParts[2]; // Get the restaurant ID from the path

      if (restaurantUrl) {
        navigate(`/c/${restaurantUrl}/home`);
      } else {
        toast.error("Invalid QR code format");
      }
    } catch (error) {
      console.error('Error parsing QR code URL:', error);
      toast.error("Invalid QR code format");
    }
  }, [navigate])

  const onScanError = useCallback((error: string) => {
    console.log(error)
    toast.error("Oops! Something went wrong while reading the QR code!")
  }, [])

  return (
    <div className='w-full p-4'>
      <QRScanner qrCodeSuccessCallback={onScanSuccess} qrCodeErrorCallback={onScanError} />
    </div >
  )
}

export default ScanQrPage
