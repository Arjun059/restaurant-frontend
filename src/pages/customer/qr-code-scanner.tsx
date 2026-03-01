"use client";

import QRScanner from '#/components/qr-code-scanner'
import {useCallback, useState} from 'react'
import {toast} from 'sonner';
import {useNavigate} from 'react-router-dom';
import {
  Alert,
  AlertTitle,
} from "#/components/ui/alert"
import {CameraOff} from "lucide-react"


const cameraNotFound = 'Requested device not found'

const ScanQrPage = () => {
  const navigate = useNavigate();
  const [isCamEnable, setIsCamEnable] = useState(true)

  const onScanSuccess = useCallback((decodedText: string) => {
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
    if (error === cameraNotFound) {
      setIsCamEnable(false)
      return
    }
    setIsCamEnable(true)
    toast.error("Oops! Something went wrong while reading the QR code!")
  }, [])

  return (
    <div className='w-full p-4'>
      <QRScanner qrCodeSuccessCallback={onScanSuccess} qrCodeErrorCallback={onScanError} />
      {!isCamEnable && <CameraNotFound />}
    </div >
  )
}

export default ScanQrPage

function CameraNotFound() {

  return (
    <div className='flex justify-center -mt-4'>
      <Alert variant={"destructive"} className='max-w-[300px] text-center'>
        <CameraOff />
        <AlertTitle>
          !Enable your device camera to scan qr code.
        </AlertTitle>
      </Alert>
    </div>

  )
}
