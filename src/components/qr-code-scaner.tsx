import {Scanner as QrScanner} from '@yudiel/react-qr-scanner'
import {useState} from 'react'
import {isMobile} from 'react-device-detect'

interface ScannerProps {
  qrCodeSuccessCallback: (decodedText: string) => void
  qrCodeErrorCallback?: (error: string) => void
}

const Html5QrcodePlugin: React.FC<ScannerProps> = (props) => {
  const [error, setError] = useState<string | null>(null)

  const handleScan = (result: any) => {
    if (result && result[0]?.rawValue) {
      props.qrCodeSuccessCallback(result[0].rawValue)
    }
  }

  const handleError = (error: any) => {
    let errorMessage = 'Failed to access camera'

    if (error?.message) {
      errorMessage = error.message
    } else if (error?.name === 'NotAllowedError') {
      errorMessage = 'Camera access denied. Please allow camera permissions and try again.'
    } else if (error?.name === 'NotFoundError') {
      errorMessage = 'No camera found on this device.'
    } else if (error?.name === 'NotSupportedError') {
      errorMessage = 'Camera not supported on this device.'
    } else if (error?.name === 'NotReadableError') {
      errorMessage = 'Camera is already in use by another application.'
    }

    setError(errorMessage)
    props.qrCodeErrorCallback?.(errorMessage)
  }

  const handleRetry = () => {
    setError(null)
  }

  return (
    <div className="mx-auto flex h-full min-h-[calc(100vh-150px)] w-full max-w-sm items-center justify-center align-middle">
      <div className="min-h-[300px] bg-gray-200 min-w-[300px] rounded-lg align-middle text-card-foreground shadow-sm">
        <h2 className='text-lg text-center mt-2 font-semibold'>
          Scan QR Code
        </h2>

        {error && (
          <div className="p-4 text-center">
            <p className="text-red-600 text-sm mb-2">{error}</p>
            {isMobile && (
              <p className="text-gray-600 text-xs mb-2">
                Make sure you're using HTTPS and have granted camera permissions
              </p>
            )}
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        )}

        {!error && (
          <QrScanner
            onScan={handleScan}
            onError={handleError}
            constraints={{
              facingMode: 'environment',
              width: {ideal: isMobile ? 640 : 1280},
              height: {ideal: isMobile ? 480 : 720}
            }}
            classNames={{
              container: "w-full h-full",
              video: "w-full h-full object-cover"
            }}
            sound={false}
          />
        )}
      </div>
    </div>
  )
}

export default Html5QrcodePlugin
